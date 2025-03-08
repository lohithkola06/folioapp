import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, User, Bell, Lock, CreditCard, Globe, Shield, HelpCircle, Settings, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
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
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600">
                <CheckCircle className="h-5 w-5" />
                Completed
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-lg text-slate-600 bg-slate-50">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-8 py-8 font-apparat">
          <div className="mb-8">
            <h1 className="text-2xl font-quasimoda font-semibold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="h-10 w-10 text-slate-400" />
                  </div>
                  <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Email Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Document Signing Requests</Label>
                      <p className="text-sm text-slate-500">Get notified when someone requests your signature</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Document Completion</Label>
                      <p className="text-sm text-slate-500">Receive notifications when documents are completed</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Security Alerts</Label>
                      <p className="text-sm text-slate-500">Get notified about important security updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Password</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">Update Password</Button>

                <div className="pt-6 border-t">
                  <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable 2FA</Label>
                      <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-6 w-6 text-slate-400" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-500">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="ghost">Remove</Button>
                  </div>
                  <Button variant="outline" className="w-full">Add New Card</Button>
                </div>

                <div className="pt-6 border-t">
                  <h2 className="text-lg font-semibold mb-4">Billing History</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Pro Plan</p>
                        <p className="text-sm text-slate-500">Monthly subscription</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$29.99</p>
                        <p className="text-sm text-slate-500">Jan 1, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Language Tab */}
            <TabsContent value="language" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Language Preferences</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Interface Language</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">Save Preferences</Button>
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Compliance Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">GDPR Compliance</Label>
                      <p className="text-sm text-slate-500">Enable GDPR-compliant data handling</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Data Retention</Label>
                      <p className="text-sm text-slate-500">Automatically delete documents after 30 days</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label>Audit Log Retention</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                      <option>Indefinite</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">Save Compliance Settings</Button>
              </div>
            </TabsContent>

            {/* Help Tab */}
            <TabsContent value="help" className="space-y-6">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Help & Support</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Contact Support</h3>
                    <p className="text-sm text-slate-500 mb-4">Need help? Our support team is available 24/7</p>
                    <Button variant="outline" className="w-full">Contact Support</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Documentation</h3>
                    <p className="text-sm text-slate-500 mb-4">Browse our comprehensive documentation</p>
                    <Button variant="outline" className="w-full">View Documentation</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">API Access</h3>
                    <p className="text-sm text-slate-500 mb-4">Manage your API keys and access</p>
                    <Button variant="outline" className="w-full">Manage API Keys</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
} 