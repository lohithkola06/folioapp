import { Button } from "@/components/ui/button"
import { DocumentList } from "@/components/document-list"
import { ActionRequired } from "@/components/action-required"
import { FileText, Upload, LayoutDashboard, Clock, CheckCircle, Settings } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-[220px_1fr]">
        {/* Simple Sidebar */}
        <aside className="border-r bg-slate-50">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold">Folio</span>
          </div>
          <nav className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Clock className="h-4 w-4" />
              Waiting for Signature
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your documents</p>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>

          {/* Documents Needing Signature */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Action Required</h2>
            <ActionRequired />
          </div>

          {/* All Documents */}
          <div>
            <h2 className="text-lg font-medium mb-4">Your Documents</h2>
            <DocumentList />
          </div>
        </main>
      </div>
    </div>
  )
}

