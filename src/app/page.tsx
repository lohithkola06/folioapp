import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <Image src="/placeholder.svg?height=40&width=120" alt="Logo" width={120} height={40} className="h-10" />
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-[#F7931E] px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#F7931E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#e07e0e]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Our Platform</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A secure authentication system built with Next.js and Firebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-[#F7931E] text-white px-6 py-3 rounded-md text-base font-medium hover:bg-[#e07e0e]"
            >
              Login to Your Account
            </Link>
            <Link
              href="/signup"
              className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-50"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

