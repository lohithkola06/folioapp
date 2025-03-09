"use client"

import { Button } from "@/components/ui/button"
import { DocumentList } from "@/components/document-list"
import { ActionRequired } from "@/components/action-required"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import { FileText, Upload, LayoutDashboard, Clock, CheckCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="grid lg:grid-cols-[240px_1fr]">
        {/* Simple Sidebar */}
        <aside className="border-r border-slate-100 bg-white/80 backdrop-blur-xl">
          <div className="flex h-24 items-center border-b border-slate-100 px-8">
            <div className="flex items-center gap-0">
              <img src="/assets/logo.png" alt="Logo" className="h-16 w-auto" />
              <span className="text-2xl font-semibold">Folio</span>
            </div>
          </div>
          <nav className="p-6 space-y-1 font-apparat">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600 bg-slate-50">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/waiting-for-signature">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600">
                <Clock className="h-5 w-5" />
                Waiting for Signature
              </Button>
            </Link>
            <Link href="/completed">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600">
                <CheckCircle className="h-5 w-5" />
                Completed
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-8 py-8 font-apparat">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-quasimoda font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Manage your documents</p>
            </div>
            <Button 
              className="gap-2 bg-orange-600 hover:bg-orange-700 h-10 px-6 rounded-lg shadow-sm"
              onClick={() => setShowUploadDialog(true)}
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>

          {/* Documents Needing Signature */}
          <div className="mb-12">
            <h2 className="text-lg font-quasimoda font-medium mb-6 text-slate-900">Action Required</h2>
            <ActionRequired />
          </div>

          {/* All Documents */}
          <div>
            <h2 className="text-lg font-quasimoda font-medium mb-6 text-slate-900">Your Documents</h2>
            <DocumentList />
          </div>
        </main>
      </div>

      <UploadDocumentDialog 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog} 
      />
    </div>
  )
}

