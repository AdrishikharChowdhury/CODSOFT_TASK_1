"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import SUPForm from "./SUPForm";
import SINForm from "./SINForm";
import { ArrowLeft, Backpack, SendToBack, SkipBack } from "lucide-react";

type RoleOption = "Employee" | "Employer";
type AuthType = "SIGN_IN" | "SIGN_UP";

const ROLE_OPTIONS: RoleOption[] = ["Employee", "Employer"];

interface AuthFormProps {
  type: AuthType;
}

export function AuthForm({ type }: AuthFormProps) {
  const [schemaType, setSchemaType] = useState<RoleOption>("Employee");

  return (
    <Card className="w-full rounded-cards-elevated border border-carbon bg-paper-white sm:max-w-lg">
      <span className="bg-ember w-fit p-2 ml-5 rounded-full">
        <Link href="/">
          <ArrowLeft className="text-white" />
        </Link>
      </span>
      <CardHeader className="items-center text-center">
        <CardTitle className="flex w-full items-center justify-center gap-3">
          <Image
            src="/logo.svg"
            alt="GigClip logo"
            width={48}
            height={45}
            priority
          />
          <span className="font-lateral text-3xl leading-none tracking-normal">
            GigClip
          </span>
        </CardTitle>
        <CardDescription className="text-center font-aeonik-pro text-[15px] font-medium tracking-[-0.01px] text-carbon/60">
          {type === "SIGN_UP"
            ? "Sign up to create a gig"
            : "Sign in to access your account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {type === "SIGN_UP" && (
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.032em] text-carbon/70">
              Are you an:
            </p>
            <div className="flex rounded-pills border border-carbon bg-paper-white p-1">
              {ROLE_OPTIONS.map((option) => {
                const active = schemaType === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSchemaType(option)}
                    className={`flex-1 rounded-pills py-2.5 text-[13px] font-bold tracking-[0.03em] transition-colors ${
                      active
                        ? "bg-sunburst text-carbon"
                        : "text-carbon/60 hover:bg-soft-mist"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {type === "SIGN_UP" ? (
          <SUPForm key={schemaType} role={schemaType} />
        ) : (
          <SINForm />
        )}
      </CardContent>

      <div className="pb-8 text-center text-[14px] font-medium tracking-[-0.01px] text-carbon/60">
        {type === "SIGN_UP" ? (
          <p>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-carbon underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Sign In
            </Link>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-carbon underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </Card>
  );
}
