"use client"

import { useEffect } from "react"
import { X, CheckCircle } from "lucide-react"

interface NotificationToastProps {
  message: string
  onClose: () => void
  type?: "success" | "info" | "warning"
}

export function NotificationToast({ message, onClose, type = "info" }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600 border-green-500"
      case "warning":
        return "bg-yellow-600 border-yellow-500"
      default:
        return "bg-blue-600 border-blue-500"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`${getTypeStyles()} border rounded-lg p-4 shadow-lg max-w-sm`}>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
          <p className="text-white text-sm font-medium flex-1">{message}</p>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
