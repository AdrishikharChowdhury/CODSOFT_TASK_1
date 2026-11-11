"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signInSchema, type SignInValues } from "@/lib/schema";

const LABEL_CLASS = "text-[12px] font-bold uppercase tracking-[0.032em]";
const INPUT_CLASS =
  "rounded-cards border border-carbon bg-paper-white px-4 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

export default function SINForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  function onSubmit() {
    toast.success("Welcome back!", {
      description: "Signed in — backend hookup coming soon.",
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup className="gap-5">
        <Field data-invalid={Boolean(form.formState.errors.email)}>
          <FieldLabel htmlFor="signin-email" className={LABEL_CLASS}>
            Email
          </FieldLabel>
          <Input
            {...form.register("email")}
            id="signin-email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            className={INPUT_CLASS}
          />
          {form.formState.errors.email && (
            <p className="text-[13px] font-medium leading-[1.39] text-ember">
              {form.formState.errors.email.message}
            </p>
          )}
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.password)}>
          <FieldLabel htmlFor="signin-password" className={LABEL_CLASS}>
            Password
          </FieldLabel>
          <div className="relative">
            <Input
              {...form.register("password")}
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              autoComplete="current-password"
              aria-invalid={Boolean(form.formState.errors.password)}
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
          {form.formState.errors.password && (
            <p className="text-[13px] font-medium leading-[1.39] text-ember">
              {form.formState.errors.password.message}
            </p>
          )}
        </Field>
      </FieldGroup>

      <p className="rounded-cards border border-dashed border-carbon/40 bg-sky-wash px-4 py-3 text-center text-[12px] font-medium leading-[1.56] tracking-[-0.01px] text-carbon/70">
        Demo logins: employer@demo.com / candidate@demo.com · demo1234
      </p>

      <Button
        type="submit"
        className="w-full rounded-pills bg-carbon py-3.5 text-[15px] font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80"
      >
        Sign In
      </Button>
    </form>
  );
}
