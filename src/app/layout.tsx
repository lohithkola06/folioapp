import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/toaster"

export const metadata: Metadata = {
  title: "Folio - Document Management",
  description: "Securely manage and sign your documents",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/[YOUR-KIT-CODE].css" />
      </head>
      <body className="font-apparat antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}

