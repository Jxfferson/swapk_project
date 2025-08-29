"use client"

import { useState } from "react"
import { Settings } from "lucide-react"

interface VideoCallAreaProps {
  isInCall: boolean
  isCameraOff: boolean
  currentContact: string
}

export function VideoCallArea({ isInCall, isCameraOff, currentContact }: VideoCallAreaProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="flex-1 relative bg-[#141414]">
      {/* Main Video Area */}
      <div className="h-full flex items-center justify-center">
        {!isCameraOff ? (
          // Active video call
          <div className="relative w-full h-full">
            <img src="/professional-woman-with-glasses-smiling-in-video-c.png" alt="Video call participant" className="w-full h-full object-cover" />

            {/* Participant name overlay */}
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
              <span className="text-white font-medium">{currentContact}</span>
            </div>
          </div>
        ) : (
          // Camera off - show avatar
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">
                {currentContact
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <p className="text-gray-400">Cámara desactivada</p>
          </div>
        )}
      </div>

      {/* Your Camera Preview */}
      <div className="absolute top-4 right-4 w-48 h-36 bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-600">
        <div className="relative w-full h-full">
          <img src="/person-in-video-call-preview-window.png" alt="Your camera" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">Tu cámara</div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Camera Settings Dropdown */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-[#1a1a1a] border border-gray-600 rounded-lg p-3 min-w-48">
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">Cambiar cámara</button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">Configurar video</button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">Efectos de fondo</button>
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-white">Conexión estable</span>
      </div>
    </div>
  )
}
