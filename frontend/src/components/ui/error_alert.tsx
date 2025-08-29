"use client"

import { AlertTriangle, X } from "lucide-react"

interface ErrorAlertProps {
  message: string
  onClose: () => void
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className="bg-red-600 border border-red-500 rounded-lg p-4 shadow-lg max-w-md">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Error de conexión</p>
            <p className="text-red-100 text-xs mt-1">{message}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
