"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { storage, auth, addDocument } from "@/app/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useToast } from "@/components/ui/use-toast"

interface UploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentDialog({ 
  open, 
  onOpenChange,
}: UploadDocumentDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    if (validFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid files detected",
        description: "Some files were skipped. Only PDF, DOC, DOCX files up to 10MB are allowed.",
        variant: "destructive"
      })
    }

    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0 || !auth.currentUser) return

    setUploading(true)

    try {
      for (const file of files) {
        // Create a reference to the file in Firebase Storage
        const fileRef = ref(storage, `documents/${auth.currentUser.uid}/${Date.now()}-${file.name}`)
        
        // Upload the file
        await uploadBytes(fileRef, file)
        
        // Get the download URL
        const downloadURL = await getDownloadURL(fileRef)
        
        // Add document to Firestore
        await addDocument({
          name: file.name,
          url: downloadURL,
          type: file.type,
          size: file.size,
          status: 'pending',
          userId: auth.currentUser.uid,
          createdAt: new Date()
        })

        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 100
        }))
      }

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}.`
      })
      
      onOpenChange(false)
      setFiles([])
      setUploadProgress({})
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <Upload className="mx-auto h-8 w-8 text-slate-400 mb-4" />
            <p className="text-sm text-slate-600 mb-1">
              Click to select files
            </p>
            <p className="text-xs text-slate-500">
              PDF, DOC, DOCX up to 10MB
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 text-sm"
                >
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(1)}MB
                  </span>
                  {uploadProgress[file.name] ? (
                    <span className="text-xs text-green-500">
                      {uploadProgress[file.name]}%
                    </span>
                  ) : (
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading || !auth.currentUser}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 