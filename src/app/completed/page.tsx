import { Button } from "@/components/ui/button"
import { LayoutDashboard, Clock, CheckCircle, Settings, FileText, MoreVertical, Search, Filter, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function CompletedPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="grid lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-slate-100 bg-white/80 backdrop-blur-xl">
          <div className="flex h-24 items-center border-b border-slate-100 px-8">
            <div className="flex items-center gap-0">
              <img src="/assets/logo.png" alt="Logo" className="h-16 w-auto" />
              <span className="text-2xl font-semibold">Folio</span>
            </div>
          </div>
          <nav className="p-6 space-y-1 font-apparat">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600">
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
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600 bg-slate-50">
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
          <div className="mb-8">
            <h1 className="text-2xl font-quasimoda font-semibold text-slate-900">Completed Documents</h1>
            <p className="text-sm text-slate-500 mt-1">View and manage your signed documents</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Document List */}
          <div className="space-y-4">
            {/* Document Card 1 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Employment Contract</h3>
                    <p className="text-sm text-slate-500">From: HR Department</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Completed</span>
                      <span className="text-sm text-slate-500">Signed on Jan 15, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document Card 2 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Non-Disclosure Agreement</h3>
                    <p className="text-sm text-slate-500">From: Legal Team</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Completed</span>
                      <span className="text-sm text-slate-500">Signed on Jan 10, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document Card 3 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Project Agreement</h3>
                    <p className="text-sm text-slate-500">From: Project Manager</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Completed</span>
                      <span className="text-sm text-slate-500">Signed on Jan 5, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 