"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/lib/firebase"
import GoogleAuth from "./GoogleAuth"

type FormData = {
  email: string
  password: string
  confirmPassword?: string
  rememberMe?: boolean
}

type AuthFormProps = {
  type: "login" | "signup"
}

export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)

      if (type === "signup") {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password)
      }

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Authentication error:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, email)
      setResetEmailSent(true)
    } catch (error: any) {
      console.error("Password reset error:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (showForgotPassword) {
    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Reset Password</h2>

        {resetEmailSent ? (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
            Password reset email sent. Please check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit((data) => handleForgotPassword(data.email))}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#F7931E] focus:border-[#F7931E]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F7931E] text-white py-2 px-4 rounded-md hover:bg-[#e07e0e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7931E] mb-4"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <button type="button" onClick={() => setShowForgotPassword(false)} className="w-full text-gray-700 text-sm">
              Back to login
            </button>
          </form>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        {type === "login" ? "Login to Folio" : "Create Account"}
      </h1>
      <p className="text-gray-500 mb-8">
        {type === "login" ? "Securely access and manage your documents." : "Sign up to start managing your documents."}
      </p>

      <GoogleAuth />

      <div className="my-6 flex items-center">
        <div className="flex-grow h-px bg-gray-200"></div>
        <div className="mx-4 text-gray-400 text-sm">or</div>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-[#F7931E] focus:border-[#F7931E]"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-[#F7931E] focus:border-[#F7931E]"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {type === "signup" && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-[#F7931E] focus:border-[#F7931E]"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        )}

        {type === "login" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-[#F7931E] focus:ring-[#F7931E] border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm font-medium text-[#F7931E] hover:text-[#e07e0e]"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#F7931E] text-white py-3 px-4 rounded-md hover:bg-[#e07e0e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7931E]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              {type === "login" ? "Signing in..." : "Creating account..."}
            </div>
          ) : type === "login" ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        {type === "login" ? (
          <p className="text-gray-600">
            Not Registered Yet?{" "}
            <Link href="/signup" className="font-medium text-[#F7931E] hover:text-[#e07e0e]">
              Create an account
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#F7931E] hover:text-[#e07e0e]">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

