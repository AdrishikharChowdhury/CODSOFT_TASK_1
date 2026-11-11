"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type DefaultValues, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  EMPLOYEE_FORM_FIELDS,
  EMPLOYER_FORM_FIELDS,
  type FormField,
} from "@/constants";
import {
  employeeSchema,
  employerSchema,
  type EmployeeValues,
  type EmployerValues,
} from "@/lib/schema";

type SignupValues = EmployeeValues | EmployerValues;
type RoleOption = "Employee" | "Employer";

const LABEL_CLASS = "text-[12px] font-bold uppercase tracking-[0.032em]";
const INPUT_CLASS =
  "rounded-cards border border-carbon bg-paper-white px-5 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

const ROLE_CONFIG: Record<
  RoleOption,
  { schema: z.ZodTypeAny; fields: FormField[]; label: string }
> = {
  Employee: {
    schema: employeeSchema,
    fields: EMPLOYEE_FORM_FIELDS,
    label: "candidate",
  },
  Employer: {
    schema: employerSchema,
    fields: EMPLOYER_FORM_FIELDS,
    label: "employer",
  },
};

export default function SUPForm({ role }: { role: RoleOption }) {
  const [showPassword, setShowPassword] = useState(false);
  const config = ROLE_CONFIG[role];
  const isEmployee = role === "Employee";

  const form = useForm<SignupValues>({
    resolver: zodResolver(config.schema) as unknown as Resolver<SignupValues>,
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ...(isEmployee ? { jobTitle: "", skills: "" } : { company: "" }),
      bio: "",
      role: role.toLowerCase(),
    } as unknown as DefaultValues<SignupValues>,
  });

  type FieldPath = Parameters<typeof form.register>[0];

  const bioLength =
    (useWatch({ control: form.control, name: "bio" }) as string | undefined)
      ?.length ?? 0;

  function fieldError(name: string): string | undefined {
    const errors = form.formState.errors as Record<
      string,
      { message?: string } | undefined
    >;
    return errors[name]?.message;
  }

  function onSubmit(data: SignupValues) {
    toast.success("Account clipped!", {
      description: `Signed up as ${config.label}. Backend hookup coming soon.`,
    });
    return data;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup className="gap-5">
        {config.fields.map((field) => {
          const error = fieldError(field.name);
          return (
            <Field key={field.name} data-invalid={Boolean(error)}>
              <FieldLabel htmlFor={`signup-${field.name}`} className={LABEL_CLASS}>
                {field.label}
              </FieldLabel>

              {field.type === "password" ? (
                <div className="relative">
                  <Input
                    {...form.register(field.name as FieldPath)}
                    id={`signup-${field.name}`}
                    type={showPassword ? "text" : "password"}
                    placeholder={field.placeholder}
                    autoComplete="new-password"
                    aria-invalid={Boolean(error)}
                    className={`${INPUT_CLASS} pr-12`}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute inset-y-0 right-4 my-auto flex size-7 items-center justify-center text-carbon/50 transition-colors hover:text-carbon"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              ) : field.type === "textarea" ? (
                <div className="relative">
                  <Textarea
                    {...form.register(field.name as FieldPath)}
                    id={`signup-${field.name}`}
                    placeholder={field.placeholder}
                    rows={4}
                    aria-invalid={Boolean(error)}
                    className={`${INPUT_CLASS} min-h-24 resize-none pb-9`}
                  />
                  <span className="absolute bottom-3 right-4 text-[12px] font-medium tabular-nums tracking-[-0.01px] text-carbon/40">
                    {bioLength}/100 characters
                  </span>
                </div>
              ) : (
                <Input
                  {...form.register(field.name as FieldPath)}
                  id={`signup-${field.name}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.type === "email" ? "email" : "off"}
                  aria-invalid={Boolean(error)}
                  className={INPUT_CLASS}
                />
              )}

              {"hint" in field && field.hint && !error && (
                <p className="text-[12px] font-medium leading-[1.56] tracking-[-0.01px] text-carbon/50">
                  {field.hint}
                </p>
              )}
              {error && (
                <p className="text-[13px] font-medium leading-[1.39] text-ember">{error}</p>
              )}
            </Field>
          );
        })}
      </FieldGroup>

      <Button
        type="submit"
        className="w-full rounded-pills bg-carbon py-3.5 text-[15px] font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80"
      >
        Sign Up
      </Button>
    </form>
  );
}
