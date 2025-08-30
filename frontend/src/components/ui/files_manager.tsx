"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Files,
  Clock,
  Share2,
  BookOpen,
  Trash2,
  Plus,
  Search,
  MoreHorizontal,
  Upload,
  FolderOpen,
  Download,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  X,
  FileText,
  ImageIcon,
  Video,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size: string
  shared: boolean
  lastModified: string
  category: string
  fileType: "document" | "image" | "video" | "audio" | "other"
}

export default function FileManager() {
  const [activeCategory, setActiveCategory] = useState("mis-archivos")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showUploadSuccess, setShowUploadSuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Presentación Final.pptx",
      type: "file",
      size: "2.5 MB",
      shared: true,
      lastModified: "2024-01-15",
      category: "mis-archivos",
      fileType: "document",
    },
    {
      id: "2",
      name: "Video Tutorial React.mp4",
      type: "file",
      size: "45.2 MB",
      shared: false,
      lastModified: "2024-01-14",
      category: "mis-cursos",
      fileType: "video",
    },
    {
      id: "3",
      name: "Documento Compartido.pdf",
      type: "file",
      size: "1.8 MB",
      shared: true,
      lastModified: "2024-01-13",
      category: "compartidos",
      fileType: "document",
    },
    {
      id: "4",
      name: "Imagen Perfil.jpg",
      type: "file",
      size: "856 KB",
      shared: false,
      lastModified: "2024-01-16",
      category: "recientes",
      fileType: "image",
    },
    {
      id: "5",
      name: "Archivo Eliminado.docx",
      type: "file",
      size: "1.2 MB",
      shared: false,
      lastModified: "2024-01-10",
      category: "papelera",
      fileType: "document",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFilteredFiles = () => {
    let categoryFiles = files.filter((file) => file.category === activeCategory)

    if (searchQuery) {
      categoryFiles = categoryFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return categoryFiles
  }

  const getFileCount = (categoryId: string) => {
    return files.filter((file) => file.category === categoryId).length
  }

  const categories = [
    { id: "mis-archivos", label: "Mis archivos", icon: Files, count: getFileCount("mis-archivos") },
    { id: "recientes", label: "Recientes", icon: Clock, count: getFileCount("recientes") },
    { id: "compartidos", label: "Compartidos", icon: Share2, count: getFileCount("compartidos") },
    { id: "mis-cursos", label: "Mis Cursos", icon: BookOpen, count: getFileCount("mis-cursos") },
    { id: "papelera", label: "Papelera de AR", icon: Trash2, count: getFileCount("papelera") },
  ]

  const getCategoryTitle = () => {
    const category = categories.find((cat) => cat.id === activeCategory)
    return category ? category.label : "Archivos"
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "document":
        return FileText
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "audio":
        return Music
      default:
        return Files
    }
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleDelete = () => {
    setShowDeleteAlert(true)
  }

  const confirmDelete = () => {
    if (activeCategory === "papelera") {
      setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)))
    } else {
      setFiles((prev) =>
        prev.map((file) => (selectedFiles.includes(file.id) ? { ...file, category: "papelera" } : file)),
      )
    }
    setSelectedFiles([])
    setShowDeleteAlert(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileUploadProcess(droppedFiles)
  }

  const handleFileUploadProcess = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: "file" as const,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      shared: false,
      lastModified: new Date().toISOString().split("T")[0],
      category: activeCategory,
      fileType: getFileTypeFromName(file.name),
    }))

    setFiles((prev) => [...prev, ...newFiles])
    setShowUploadSuccess(true)
    setTimeout(() => setShowUploadSuccess(false), 3000)
  }

  const getFileTypeFromName = (fileName: string): "document" | "image" | "video" | "audio" | "other" => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) return "image"
    if (["mp4", "avi", "mov", "wmv"].includes(extension || "")) return "video"
    if (["mp3", "wav", "flac", "aac"].includes(extension || "")) return "audio"
    if (["pdf", "doc", "docx", "txt", "pptx"].includes(extension || "")) return "document"
    return "other"
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      handleFileUploadProcess(selectedFiles)
    }
  }

  const filteredFiles = getFilteredFiles()

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)]">
      <input ref={fileInputRef} type="file" multiple onChange={handleFileInputChange} className="hidden" accept="*/*" />

      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm flex-1">{category.label}</span>
                {category.count > 0 && (
                  <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">{category.count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* File Upload Description */}
        <div className="mt-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 leading-relaxed">
            Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem ipsum ha sido el
            texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
            dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un
            libro de textos especimen.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#1a1a1a] rounded-lg border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Eduardo Manuel</h2>
            <div className="flex gap-2">
              <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-white" onClick={handleFileUpload}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                onClick={handleFileUpload}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Explorar
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="px-4 py-3 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">{getCategoryTitle()}</h3>
        </div>

        {/* Search and Actions */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar archivos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 w-64"
                />
              </div>
              {selectedFiles.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{selectedFiles.length} seleccionado(s)</span>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {activeCategory === "papelera" ? "Eliminar permanentemente" : "Eliminar"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File List Header */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
            <div className="col-span-6">Nombre</div>
            <div className="col-span-2">Tamaño de AR</div>
            <div className="col-span-2">Compartir</div>
            <div className="col-span-2">Acciones</div>
          </div>
        </div>

        {/* File List / Empty State */}
        <div
          className={`flex-1 p-8 ${dragOver ? "bg-blue-900/20 border-2 border-dashed border-blue-500" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Files className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No tienes archivos aquí</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Arrastra y suelta archivos aquí o haz clic en "Nuevo" para comenzar a subir contenido.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleFileUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Subir archivos
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.fileType)
                return (
                  <div
                    key={file.id}
                    className="grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleFileSelect(file.id)}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                      <FileIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{file.name}</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-400">{file.size}</div>
                    <div className="col-span-2">
                      {file.shared && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Compartido</span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Confirmar eliminación</h3>
            </div>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que quieres eliminar {selectedFiles.length} archivo(s)? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteAlert(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancelar
              </Button>
              <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showUploadSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <CheckCircle className="w-5 h-5" />
          <span>Archivos subidos exitosamente</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowUploadSuccess(false)}
            className="text-white hover:bg-green-700 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
