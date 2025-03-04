import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthForm from "@/app/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left side - Minimalist text */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f5f5f7] relative p-16 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-5xl font-medium text-[#1d1d1f] mb-4 tracking-tight">
            Smart, <span className="text-[#f7882a]">Simple</span> Document Signing.
          </h2>
          <p className="text-[#86868b] text-lg font-light leading-relaxed">
            Handle contracts and paperwork with ease using AI-assisted automation.
          </p>
        </div>
      </div>

      {/* Right side - Apple-inspired signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-[360px]">
          {/* Signup Form */}
          <AuthForm type="signup" />
        </div>
      </div>
    </div>
  );
}
