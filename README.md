# GigClip — Job Builder

A pastel sticker-styled job board built with **Next.js (App Router)** and **MongoDB**. Candidates clip on a resume and apply in under a minute; employers post roles and move applicants through `submitted → reviewing → interview → offered`.

## Tech Stack

| Layer     | Tech                                    |
| --------- | --------------------------------------- |
| Framework | Next.js 16 (App Router, Server Actions) |
| Database  | MongoDB                                 |
| ODM       | Mongoose                                |
| Styling   | Tailwind CSS v4                         |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/gigclip
```

## NoSQL Project Structure

```
job-builder/
├── app/
│   ├── (auth)/                  # Auth pages (no navbar shell)
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── sign-out/
│   ├── (root)/                  # Public landing pages (navbar shell)
│   ├── api/                     # Route handlers (thin, delegate to lib/)
│   │   ├── jobs/
│   │   │   ├── route.ts             # GET list, POST create
│   │   │   └── [id]/route.ts        # GET one, PATCH update, DELETE
│   │   ├── applications/
│   │   │   ├── route.ts             # GET mine, POST apply
│   │   │   └── [id]/status/route.ts # PATCH status transitions
│   │   └── resumes/
│   │       └── route.ts             # POST upload, GET my resumes
│   ├── layout.tsx               # Root layout (fonts, globals.css)
│   └── globals.css              # Tailwind v4 theme tokens
├── components/                  # UI only — no DB access here
├── constants/                   # Shared constants & enums source of truth
├── lib/
│   ├── mongodb.ts               # Cached connection singleton
│   ├── db/                      # Data-access layer (queries live here)
│   │   ├── users.ts             #   findUserByEmail, createUser ...
│   │   ├── jobs.ts              #   listJobs, getJobById, createJob ...
│   │   ├── applications.ts      #   applyToJob, updateStatus ...
│   │   └── resumes.ts
│   ├── models/                  # One Mongoose model per collection
│   │   ├── user.model.ts
│   │   ├── job.model.ts
│   │   ├── application.model.ts
│   │   └── resume.model.ts
│   └── utils.ts                 # cn() class merger
└── types/                       # Inferred TS types (zod or mongoose infer)
```

### Layering Rules

1. **`lib/models`** — schema definitions only. No business logic.
2. **`lib/db`** — all queries/mutations. The only place allowed to touch models.
3. **`app/api`** / Server Actions — validate input, call `lib/db`, shape responses. Never query collections directly from routes or components.

### Connection Singleton (`lib/mongodb.ts`)

Serverless platforms create a new function instance per request; without caching each invocation opens a new socket. Use the classic global-cache pattern:

```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

interface ConnCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const global_ = globalThis as unknown as { _mongoose?: ConnCache };
const cache: ConnCache = global_._mongoose ?? { conn: null, promise: null };
global_._mongoose = cache;

export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { dbName: "gigclip" });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
```

Every entry point (`app/api/**`, actions) calls `await connectDB()` first.

## Collections & Schemas

### `users`

One collection for both roles — role-based fields instead of separate tables (document modeling favors fewer collections).

| Field         | Type                              | Notes                                  |
| ------------- | --------------------------------- | -------------------------------------- |
| `_id`         | ObjectId                          | auto                                   |
| `name`        | String                            | required                               |
| `email`       | String                            | required, unique index, lowercase      |
| `passwordHash`| String                            | bcrypt hash, select: false             |
| `role`        | Enum `candidate \| employer`      | required, indexed                      |
| `companyName` | String?                           | employers only                         |
| `headline`    | String?                           | candidates only                        |
| `timestamps`  | createdAt / updatedAt             | automatic                              |

### `jobs`

| Field          | Type                                                        | Notes                    |
| -------------- | ----------------------------------------------------------- | ------------------------ |
| `_id`          | ObjectId                                                    | auto                     |
| `employerId`   | ObjectId → `users._id`                                      | required, indexed        |
| `title`        | String                                                      | required, text-indexed   |
| `description`  | String                                                      | required                 |
| `type`         | Enum `full-time \| part-time \| contract \| internship \| remote` | indexed            |
| `location`     | String                                                      |                          |
| `salaryMin` / `salaryMax` | Number?                                          |                          |
| `openings`     | Number                                                      | default 1                |
| `tags`         | String[]                                                    | denormalized search aid  |
| `status`       | Enum `open \| closed \| draft`                              | default `draft`, indexed |

### `resumes`

Kept separate from `users`: a candidate may keep several versions, and applications reference the exact version used.

| Field        | Type                     | Notes             |
| ------------ | ------------------------ | ----------------- |
| `candidateId`| ObjectId → `users._id`   | indexed           |
| `fileName`   | String                   | original name     |
| `fileUrl`    | String                   | blob storage URL  |
| `mimeType`   | String                   | pdf/docx/etc.     |
| `sizeBytes`  | Number                   | enforce ≤ 5 MB    |

### `applications`

The join-heavy collection — designed around the employer's review workflow.

| Field         | Type                                                                  | Notes                             |
| ------------- | --------------------------------------------------------------------- | --------------------------------- |
| `jobId`       | ObjectId → `jobs._id`                                                 | required                          |
| `candidateId` | ObjectId → `users._id`                                                | required                          |
| `resumeId`    | ObjectId → `resumes._id`                                              | immutable snapshot of what was sent|
| `coverNote`   | String?                                                               | short note, ≤ 1000 chars          |
| `status`      | Enum `submitted \| reviewing \| interview \| offered \| rejected`     | default `submitted`, indexed      |
| `timeline`    | Embedded array `{ status, at }`                                       | append-only audit trail           |
| `timestamps`  | createdAt / updatedAt                                                 | automatic                         |

**Indexes**

```js
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true }); // one application per job per candidate
applicationSchema.index({ jobId: 1, status: 1 });                        // employer pipeline views
```

## NoSQL Modeling Decisions

- **Embed vs reference**: small read-together data is embedded (e.g., `timeline` inside an application); anything reused across documents is referenced by `ObjectId`.
- **Denormalization for reads**: hot display fields (e.g., job `title` on an application card) are copied at write time so listing queries need zero `$lookup`s. Accept the small staleness trade-off.
- **Enums everywhere**: statuses and job types live as Mongoose enums mirrored from `constants/index.ts`, so invalid states can't be persisted.
- **Status transitions** are validated in `lib/db/applications.ts` (e.g., `submitted → reviewing`, never `offered → submitted`) before hitting the DB.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```
