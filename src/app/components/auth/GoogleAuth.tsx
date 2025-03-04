"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/lib/firebase"

export default function GoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign-in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7931E]"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-t-2 border-b-2 border-[#F7931E] rounded-full animate-spin"></div>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.8055 10.2275C19.8055 9.51764 19.7516 8.83471 19.6361 8.17188H10.2002V11.8886H15.6016C15.3783 13.0907 14.6573 14.1179 13.5964 14.7548V17.1864H16.7841C18.6655 15.4621 19.8055 13.0676 19.8055 10.2275Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20C12.897 20 15.1714 19.1188 16.7879 17.1865L13.6002 14.7548C12.7032 15.3577 11.5556 15.7033 10.2041 15.7033C7.59795 15.7033 5.38065 13.9865 4.58795 11.6H1.30078V14.1115C2.9125 17.6033 6.30795 20 10.2002 20Z"
              fill="#34A853"
            />
            <path
              d="M4.58398 11.5999C4.38898 11.0199 4.28334 10.4017 4.28334 9.76988C4.28334 9.13804 4.38898 8.51988 4.58398 7.93988V5.42834H1.29681C0.472644 6.77834 0 8.32988 0 9.76988C0 11.2099 0.472644 12.7614 1.29681 14.1114L4.58398 11.5999Z"
              fill="#FBBC05"
            />
            <path
              d="M10.2002 3.84167C11.6829 3.84167 13.0041 4.34 14.0445 5.31833L16.8945 2.5925C15.1675 0.99 12.8984 0 10.2002 0C6.30795 0 2.9125 2.3925 1.30078 5.8925L4.58795 8.40417C5.38065 6.01333 7.59795 3.84167 10.2002 3.84167Z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </>
      )}
    </button>
  )
}

