"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/lib/firebase"

interface ForgotPasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  showLogo?: boolean
  showSideImage?: boolean
}

export function ForgotPasswordForm({
  className,
  showLogo = true,
  showSideImage = true,
  ...props
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address')
      } else {
        setError(err.message || "Failed to send reset email")
      }
    } finally {
      setLoading(false)
    }
  }

  const content = (
    <div className={cn("flex flex-col gap-4 p-6 md:p-10", className)} {...props}>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          <form onSubmit={handlePasswordReset}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                {showLogo && (
                  <Link
                    href="/"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <img
                      src="/assets/logo.png"
                      alt="Logo"
                      className="h-16 w-auto"
                    />
                    <span className="sr-only">Folio</span>
                  </Link>
                )}
                <h1 className="text-xl font-bold">Reset Your Password</h1>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link href="/userAuth/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500 text-center">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-sm text-green-500 text-center">
                    Password reset email sent! Check your inbox.
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[#ff6e26] text-white hover:bg-[#ff6e26]/90"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-6 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
            and <Link href="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  )

  if (!showSideImage) {
    return content
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {content}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/folio.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
