"use client"

import { cn } from "@/lib/utils" 
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/app/lib/firebase"

interface SignUpFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  showLogo?: boolean
  showSideImage?: boolean
}

export function SignUpForm({
  className,
  showLogo = true,
  showSideImage = true,
  ...props
}: SignUpFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address')
      } else {
        setError(err.message || "Failed to create account")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError("")
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign up was cancelled')
      } else {
        setError(err.message || "Failed to sign up with Google")
      }
    } finally {
      setLoading(false)
    }
  }

  const content = (
    <div className={cn("flex flex-col gap-4 p-6 md:p-10", className)} {...props}>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          <form onSubmit={handleEmailSignup}>
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
                <h1 className="text-xl font-bold">Welcome to Folio</h1>
                <div className="text-center text-sm">
                  Already have an account? {" "}
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
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500 text-center">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[#ff6e26] text-white hover:bg-[#ff6e26]/90"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
              <div className="flex justify-center">
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full max-w-xs flex items-center justify-center gap-2"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {loading ? "Creating Account..." : "Continue with Google"}
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