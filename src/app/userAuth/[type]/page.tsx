"use client";

import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/signup-form";
import { ForgotPasswordForm } from "@/components/auth/forgotpassword-form";
import { redirect } from "next/navigation";
import { use } from "react";

export default function AuthPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params); // Unwrap the promise

  switch (type) {
    case "login":
      return <LoginForm />;
    case "signup":
      return <SignUpForm />;
    case "forgot-password":
      return <ForgotPasswordForm />;
    default:
      redirect("/userAuth/login");
  }
}