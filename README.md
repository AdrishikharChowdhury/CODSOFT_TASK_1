# GigClip

A pastel sticker-styled job board where candidates apply in under a minute and employers move applicants through a visible hiring pipeline:

`submitted → reviewing → interview → offered` (or `rejected`).

GigClip runs on **two databases on purpose**: **Neon (Postgres)** owns identity — the `users → employee_profiles / employer_profiles` relationship — while **MongoDB** owns the flexible, fast-moving documents: jobs, applications, and resumes.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Data Model](#data-model)
  - [Neon / Postgres](#neon--postgres-drizzle-orm)
  - [MongoDB](#mongodb-mongoose)
  - [Rules Across Both Stores](#rules-across-both-stores)
- [Authentication](#authentication)
- [Validation](#validation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Design System](#design-system)
- [Implementation Status](#implementation-status)
- [Demo Accounts](#demo-accounts)
- [License](#license)

---

## Features

**Candidates (`employee`)**

- Sign up with name, email, password, job title, skills, and a short bio.
- Skills are typed as a comma-separated string and normalized to `string[]` before they ever reach the database.
- Apply to a role with one resume attachment (PDF/DOC/DOCX/TXT/ODT, ≤ 5 MB) and an optional cover note.
- Track every application's status in-app.

**Employers (`employer`)**

- Sign up with name, email, password, company, and a company bio.
- Post job listings with type, location, salary range, openings, and tags.
- Review applicants per job and advance them through the pipeline.
- Only the employer who owns a job can see the resumes submitted to it.

**Everyone**

- Landing page with hero, job categories, how-it-works, FAQ, testimonials, and contact.
- Split auth screens (form + animated Lottie poster).
- Inline, per-field validation with accessible labels and error messaging.

---

## Tech Stack

| Layer            | Choice                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Framework        | Next.js 16 (App Router, Turbopack, Server Actions)                 |
| Language         | TypeScript                                                         |
| UI               | React 19, Tailwind CSS v4, shadcn/ui (`base-vega`), lucide-react   |
| Auth             | Auth.js (NextAuth v5, beta) — Credentials provider, JWT sessions   |
| Relational DB    | Neon Postgres via `@neondatabase/serverless` (HTTP)                |
| ORM (SQL)        | Drizzle ORM + drizzle-kit                                          |
| Document DB      | MongoDB via Mongoose                                               |
| Validation       | Zod                                                                |
| Forms            | react-hook-form + `@hookform/resolvers`                            |
| Passwords        | bcrypt (12 salt rounds)                                            |
| File storage     | Cloudinary (resumes, company logos)                                |
| Motion / Visuals | `@lottiefiles/dotlottie-react`, `ogl` (WebGL background)           |
| Notifications    | Sonner                                                             |

---

## Architecture

```
┌──────────────────────────────┐
│      Next.js App Router      │
│  (RSC pages + client forms)  │
└───────────────┬──────────────┘
                │ validated input (Zod)
     ┌──────────┴──────────┐
     │                     │
┌────▼─────────────┐  ┌────▼──────────────┐
│ Neon / Postgres  │  │     MongoDB       │
│ Drizzle ORM      │  │   Mongoose ODM    │
│                  │  │                   │
│ users            │  │ jobs              │
│ employee_profiles│  │ applications      │
│ employer_profiles│  │ resumes           │
└──────────────────┘  └───────────────────┘
     identity &             content &
     role integrity         workflow data
```

**Why two databases instead of one?**

- **Postgres for identity.** Roles, unique emails, one-to-one profile rows, and cascade deletes are exactly what foreign keys and enums are for. Auth.js also wants a stable, relational user record.
- **MongoDB for the work.** A job posting is read as one document; an application carries an embedded, append-only `timeline`; resumes are metadata pointing at Cloudinary blobs. These are document-shaped, evolve per feature, and never need multi-table joins.
- **No cross-database foreign keys.** References between stores are stored as plain IDs (`userId` as a string in Mongo) and treated as logical references — see [Rules Across Both Stores](#rules-across-both-stores).

### Layering

| Layer                          | Responsibility                                                       |
| ------------------------------ | -------------------------------------------------------------------- |
| `app/**`                       | Pages, layouts, route handlers. Thin: validate, call `lib/db`, return. |
| `components/**`                | Presentation and form state only — never touches a database.         |
| `lib/schema.ts`                | Shared Zod contracts used by forms **and** server-side validation.   |
| `lib/db/*.ts`                  | Data access. The only place allowed to run Drizzle or Mongoose queries. |
| `lib/db/schema.ts`             | Drizzle table definitions (source of truth for Postgres).            |
| `lib/auth/password.ts`         | Password hashing/verification.                                       |
| `auth.ts`                      | Auth.js configuration, providers, and session callbacks.             |
| `drizzle/`                     | Generated SQL migrations and snapshots.                              |

---

## Data Model

### Neon / Postgres (`Drizzle ORM`)

Defined in `lib/db/schema.ts`.

```
users
 ├─ 1:1 ─ employee_profiles   (role = 'employee')
 └─ 1:1 ─ employer_profiles   (role = 'employer')
```

#### `users`

| Column         | Type                        | Notes                          |
| -------------- | --------------------------- | ------------------------------ |
| `id`           | `uuid`                      | PK, `defaultRandom()`          |
| `name`         | `text`                      | required                       |
| `email`        | `text`                      | required, unique, lowercased   |
| `password_hash`| `text`                      | bcrypt hash, never selected into UI |
| `role`         | `user_role` enum            | `employee` \| `employer`       |
| `created_at`   | `timestamptz`               | defaults to `now()`            |
| `updated_at`   | `timestamptz`               | defaults to `now()`            |

#### `employee_profiles`

| Column     | Type       | Notes                                   |
| ---------- | ---------- | --------------------------------------- |
| `id`       | `uuid`     | PK                                      |
| `user_id`  | `uuid`     | unique, FK → `users.id`, `ON DELETE CASCADE` |
| `job_title`| `text`     | required                                |
| `skills`   | `text[]`   | defaults to `'{}'`                      |
| `bio`      | `text`     | 20–100 characters enforced in Zod       |

#### `employer_profiles`

| Column    | Type   | Notes                                        |
| --------- | ------ | -------------------------------------------- |
| `id`      | `uuid` | PK                                           |
| `user_id` | `uuid` | unique, FK → `users.id`, `ON DELETE CASCADE` |
| `company` | `text` | required                                     |
| `bio`     | `text` | 20–100 characters enforced in Zod            |

**Why split the profiles out?**

The `users` table stays the single place Auth.js and the session can trust. Role-specific fields live behind a one-to-one row, so candidate data never pollutes employer rows (and vice versa), and a future third role is additive rather than a schema rewrite.

> **Migration note:** `lib/db/schema.ts` is the source of truth. The SQL currently checked into `drizzle/` was generated from an earlier draft (it uses `username` / `company_name` / `company_website`). Run `npx drizzle-kit generate` before `npx drizzle-kit migrate` so the migration matches the tables above.

### MongoDB (`Mongoose`)

Planned collections — the Mongoose models and `lib/db` queries are the next implementation step.

#### `jobs`

| Field            | Type                                                              | Notes                     |
| ---------------- | ----------------------------------------------------------------- | ------------------------- |
| `_id`            | `ObjectId`                                                        | auto                      |
| `employerId`     | `String`                                                          | Postgres `users.id`, indexed |
| `company`        | `String`                                                          | denormalized from the employer profile |
| `title`          | `String`                                                          | required, text index      |
| `description`    | `String`                                                          | required                  |
| `type`           | enum `full-time \| part-time \| contract \| internship \| remote` | indexed                   |
| `location`       | `String`                                                          |                           |
| `salaryMin` / `salaryMax` | `Number?`                                                |                           |
| `openings`       | `Number`                                                          | default `1`               |
| `tags`           | `String[]`                                                        | search/display aid        |
| `status`         | enum `open \| closed \| draft`                                    | default `draft`, indexed  |
| timestamps       | `createdAt` / `updatedAt`                                         | automatic                 |

#### `resumes`

Kept separate from the user record: a candidate can hold several versions, and each application snapshots the exact one it was sent with.

| Field         | Type     | Notes                             |
| ------------- | -------- | --------------------------------- |
| `candidateId` | `String` | Postgres `users.id`, indexed      |
| `fileName`    | `String` | original upload name              |
| `fileUrl`     | `String` | Cloudinary secure URL             |
| `mimeType`    | `String` | pdf, docx, txt, odt               |
| `sizeBytes`   | `Number` | reject > 5 MB at upload           |

#### `applications`

| Field         | Type                                                            | Notes                            |
| ------------- | --------------------------------------------------------------- | -------------------------------- |
| `jobId`       | `ObjectId` → `jobs._id`                                         | required                         |
| `candidateId` | `String`                                                        | Postgres `users.id`, required    |
| `resumeId`    | `ObjectId` → `resumes._id`                                      | immutable snapshot               |
| `coverNote`   | `String?`                                                       | ≤ 1000 characters                |
| `status`      | enum `submitted \| reviewing \| interview \| offered \| rejected` | default `submitted`, indexed   |
| `timeline`    | embedded `[{ status, at }]`                                     | append-only audit trail          |
| timestamps    | `createdAt` / `updatedAt`                                       | automatic                        |

**Indexes**

```js
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, status: 1 });
jobSchema.index({ employerId: 1, status: 1 });
jobSchema.index({ title: "text", description: "text" });
```

The unique compound index enforces "one application per job per candidate" at the database level, not just in UI logic.

**Modeling choices**

- **Embed what is read together.** An application's `timeline` is embedded, so a pipeline view is a single document read.
- **Reference what is shared.** Jobs, resumes, and users are referenced by ID rather than duplicated wholesale.
- **Denormalize display fields.** Application cards copy the job `title` and `company` at write time so listings need zero `$lookup`s. Small staleness risk, large read win.
- **Enums over free strings.** Statuses are mirrored in `constants/` so transitions can be validated against one list.
- **Server-side transitions only.** `lib/db/applications.ts` must reject backwards moves (e.g. `offered → submitted`) regardless of what the client sends.

### Rules Across Both Stores

1. **IDs are logical, not physical.** Mongo documents store `employerId` / `candidateId` as the Postgres UUID string. There is no referential integrity between engines — deleting a user requires an explicit cleanup step for their Mongo documents.
2. **Denormalize what crosses the boundary.** Because you can't join Postgres and Mongo, copy the fields you display (`company`, `jobTitle`) at write time.
3. **Never store Mongo ObjectIds in Postgres columns.** Postgres owns identity; Mongo owns content.
4. **One place for queries.** Pages, components, and route handlers never call Drizzle or Mongoose directly — everything goes through `lib/db`.

---

## Authentication

Auth.js is configured in `auth.ts` with a **Credentials** provider and **JWT** sessions:

1. `authorize()` validates credentials with `signInSchema`.
2. The user is looked up by lowercased email via `getUserByEmail()` (`lib/db/user.db.ts`).
3. The submitted password is compared against `password_hash` with bcrypt (12 rounds).
4. `role` and `id` are written into the JWT and re-exposed on `session.user`.

The session and JWT types are augmented in `types/next-auth.d.ts`, so `session.user.role` is typed as `"employee" | "employer"` everywhere.

Route handlers are mounted at `app/api/auth/[...nextauth]/route.ts`, and the sign-in page is set to `/sign-in`.

**Sign-up** additionally needs to create the `users` row plus the matching profile row in a single transaction, hash the password with `hashPassword()`, and decide the `role` from the form toggle (`employee` / `employer`). That endpoint is not written yet — the forms currently stop at a success toast.

---

## Validation

One set of Zod schemas in `lib/schema.ts` drives both client forms and (future) API validation:

| Schema            | Fields                                                                 | Rules                                                        |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| `employeeSchema`  | `name`, `email`, `password`, `jobTitle`, `skills`, `bio`, `role`        | name 5–32, bio 20–100, password ≥ 8, skills ≥ 1 after parsing |
| `employerSchema`  | `name`, `email`, `password`, `company`, `bio`, `role`                   | name 5–32, company ≥ 2, bio 20–100, password ≥ 8             |
| `signInSchema`    | `email`, `password`                                                    | valid email, non-empty password                              |

`skills` accepts `"Figma, Research, Prototyping"` from the UI and is preprocessed into `["Figma", "Research", "Prototyping"]` before validation, so the payload the backend receives is always a real array.

**Client component rule:** import schemas inside the client component. Passing a schema object as a prop from a server component fails, because functions are not serializable across the RSC boundary.

Exports: `EmployeeValues`, `EmployerValues`, `SignInValues`.

---

## Project Structure

```
job-builder/
├── app/
│   ├── (auth)/                       # Split auth screens (no navbar)
│   │   ├── layout.tsx                # WebGL background shell
│   │   ├── sign-in/page.tsx          # form + Lottie poster
│   │   └── sign-up/page.tsx          # poster + role-aware form
│   ├── (root)/                       # Public landing route group
│   │   ├── layout.tsx                # Navbar + full-bleed Footer
│   │   └── page.tsx                  # Banner → Jobs → HIW → FAQ → Contact
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   ├── globals.css                   # Tailwind v4 theme tokens + animations
│   └── layout.tsx                    # Fonts, metadata, Toaster
├── auth.ts                           # Auth.js config (Credentials + JWT)
├── components/
│   ├── auth/                         # AuthForm, SUPForm, SINForm, Poster
│   ├── landing/                      # Banner, Jobs, HIW, FAQ, Contact, Footer, Navbar...
│   ├── ui/                           # shadcn primitives
│   └── GradientWaves.tsx             # Decorative WebGL waves
├── constants/index.ts                # Nav links + typed form field configs
├── drizzle/                          # Generated SQL migrations
├── drizzle.config.ts                 # Drizzle-kit config (Postgres / Neon)
├── lib/
│   ├── auth/password.ts              # bcrypt hash + verify
│   ├── db/
│   │   ├── index.ts                  # Neon client + Drizzle instance
│   │   ├── schema.ts                 # users, employee_profiles, employer_profiles
│   │   └── user.db.ts                # getUserByEmail, getUserById
│   ├── schema.ts                     # Zod contracts + inferred types
│   └── utils.ts                      # cn()
├── types/
│   ├── next-auth.d.ts                # Session/JWT augmentation
│   └── type.d.ts                     # Shared UI types
├── DESIGN.md                         # The Slush design system
└── README.md
```

---

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Configure environment

Create `.env.local` in the project root:

| Variable                | Required | Purpose                                                        |
| ----------------------- | -------- | -------------------------------------------------------------- |
| `DATABASE_URL`          | yes      | Neon Postgres connection string (use the **pooled** host)       |
| `AUTH_SECRET`           | yes      | Auth.js JWT signing secret (`npx auth secret` or `openssl rand -base64 32`) |
| `MONGODB_URI`           | yes\*    | MongoDB connection string, e.g. `mongodb+srv://…/gigclip`       |
| `CLOUDINARY_URL`        | yes\*    | Cloudinary upload URL                                          |
| `CLOUDINARY_API_KEY`    | yes\*    | Cloudinary key                                                 |
| `CLOUDINARY_API_SECRET` | yes\*    | Cloudinary secret                                              |

\* Required by the feature that consumes it; the landing and auth screens run without them.

```env
DATABASE_URL=postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require
AUTH_SECRET=replace-me
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gigclip
CLOUDINARY_URL=cloudinary://key:secret@cloud-name
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

`.env.local` is git-ignored. Never commit real credentials.

### 3. Sync the Postgres schema

```bash
npx drizzle-kit generate   # regenerate SQL from lib/db/schema.ts
npx drizzle-kit migrate    # apply migrations to Neon
```

`npx drizzle-kit push` is available for quick prototyping, and `npx drizzle-kit studio` opens a table browser.

### 4. Run

```bash
npm run dev
```

- Landing page — <http://localhost:3000>
- Sign in — <http://localhost:3000/sign-in>
- Sign up — <http://localhost:3000/sign-up>

---

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack) |
| `npm run build` | Production build + type check  |
| `npm run start` | Serve the production build     |
| `npm run lint`  | Run ESLint                     |

---

## Design System

The UI follows **DESIGN.md** (the "Slush" sticker-book aesthetic), and it is not optional:

- **Palette only:** carbon `#000`, paper-white `#fff`, sky-wash `#dceeff`, concrete-gray `#ccc`, soft-mist `#e9e9e9`, electric-blue `#4da2ff`, mint-pop `#55db9c`, lavender `#e9ccff`, ember `#fb4903`, sunburst `#ffd731`, voltage-violet `#5c4ade`.
- **No gradients, no box-shadows.** Depth comes from flat color and 1px carbon borders.
- **Radii:** pills `rounded-pills` (1600px) for buttons/tags, `rounded-cards` (20px) for inputs and cards, `rounded-cards-elevated` (40px) and `rounded-4xl` for panels.
- **Type:** `font-lateral` for display headings (tight leading, crushed), `font-aeonik-pro` for body and UI.
- **CTAs** are carbon-filled or outlined pills. Electric blue is decorative, never a button fill.
- **Section rhythm:** sky-wash → carbon → white → mint-pop → lavender → carbon footer.

Forms reuse one border recipe (`rounded-cards border border-carbon`) with an ember focus outline, so every field — including the password field with its absolute eye toggle and the bio textarea with its character counter — matches exactly.

---

## Implementation Status

**Done**

- [x] Landing page: hero, jobs, how-it-works, FAQ, testimonials, contact, full-bleed footer.
- [x] Responsive split auth screens with an animated Lottie poster.
- [x] Role-aware sign-up and sign-in forms wired to react-hook-form + Zod (blur validation, inline errors, password toggles, bio counter, role toggle with clean remount).
- [x] Shared Zod schemas and typed field configs in `constants/`.
- [x] Auth.js Credentials provider, bcrypt hashing, JWT session with typed `role`.
- [x] Drizzle schema for `users`, `employee_profiles`, `employer_profiles` on Neon.
- [x] `lib/db/user.db.ts` lookups (`getUserByEmail`, `getUserById`).

**Next**

- [ ] `POST /api/auth/register` — hash password, insert `users` + profile in one transaction.
- [ ] Point `SUPForm` / `SINForm` `onSubmit` at the real endpoints (keep the toast UX).
- [ ] Mongo connection singleton (`lib/mongodb.ts`) and Mongoose models for `jobs`, `resumes`, `applications`.
- [ ] Job create/list APIs, Cloudinary resume upload with size/type limits.
- [ ] Application pipeline with server-validated status transitions.
- [ ] Route protection for employer-only pages and the candidate dashboard.
- [ ] Seed the demo accounts and a handful of sample jobs.

> `components/GradientWaves.tsx` carries pre-existing lint errors (`no-explicit-any` plus two unused expressions). They are unrelated to feature work.

---

## Demo Accounts

The UI advertises two demo logins (password `demo1234`):

| Role      | Email                 |
| --------- | --------------------- |
| Employer  | `employer@demo.com`   |
| Candidate | `candidate@demo.com`  |

They will exist once the seed script and registration flow are in place.

---

## License

MIT © 2026 GigClip — see [LICENSE](LICENSE).
