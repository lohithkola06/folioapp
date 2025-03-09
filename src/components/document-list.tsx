"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FileText, MoreVertical, Download, Share2, Trash2, Search, Filter } from "lucide-react"
import { auth, subscribeToUserDocuments, deleteDocument, type Document, onSnapshot, documentQueries } from "@/app/lib/firebase"
import { formatDistanceToNow } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { QuerySnapshot, DocumentData } from 'firebase/firestore'

interface DocumentListProps {
  status?: 'pending' | 'completed'
}

export function DocumentList({ status }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!auth.currentUser) return

    let unsubscribe: () => void;

    if (searchQuery) {
      // Use search query scope
      unsubscribe = onSnapshot(
        documentQueries.searchByName(auth.currentUser.uid, searchQuery),
        (snapshot: QuerySnapshot<DocumentData>) => {
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Document[];
          setDocuments(docs.filter(doc => !status || doc.status === status));
          setLoading(false);
        }
      );
    } else {
      // Use regular subscription with status
      unsubscribe = subscribeToUserDocuments(
        auth.currentUser.uid,
        status,
        (docs) => {
          setDocuments(docs);
          setLoading(false);
        }
      );
    }

    return () => unsubscribe();
  }, [status, searchQuery]);

  const handleDeleteClick = (document: Document) => {
    setDocumentToDelete(document)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!documentToDelete) return

    try {
      await deleteDocument(documentToDelete)
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
      })
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting the document. Please try again.",
        variant: "destructive"
      })
    }

    setShowDeleteDialog(false)
    setDocumentToDelete(null)
  }

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-slate-300 animate-pulse" />
          <h3 className="mt-4 text-sm font-medium text-slate-900">Loading documents...</h3>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-sm font-medium text-slate-900">
            {status === 'completed' 
              ? "No completed documents" 
              : status === 'pending'
              ? "No documents waiting for signature"
              : "No documents found"}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {status === 'completed'
              ? "Documents that have been signed will appear here."
              : status === 'pending'
              ? "Documents that need your signature will appear here."
              : "Upload some documents to get started."}
          </p>
        </div>
      ) : (
        <>
          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 ${doc.status === 'completed' ? 'bg-green-50' : 'bg-orange-50'} rounded-lg`}>
                      <FileText className={`h-6 w-6 ${doc.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{doc.name}</h3>
                      <p className="text-sm text-slate-500">
                        {(doc.size / (1024 * 1024)).toFixed(1)}MB • {doc.type.split('/')[1].toUpperCase()}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-1 ${
                          doc.status === 'completed' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-orange-50 text-orange-700'
                        } text-xs rounded-full`}>
                          {doc.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                        <span className="text-sm text-slate-500">
                          Uploaded {formatDistanceToNow(doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(doc)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => window.open(doc.url, '_blank')}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 