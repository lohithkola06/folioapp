import AuthForm from "@/app/components/auth/AuthForm"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Content */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-black mb-4">
            Smart, <span className="text-[#F7931E]">Simple</span>
            <br />
            Document Signing.
          </h1>
          <p className="text-gray-500 text-lg">
            Handle contracts and paperwork with ease using AI-assisted automation.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <AuthForm type="signup" />
        </div>
      </div>
    </div>
  )
}

