"use client"

import { useState, useEffect } from "react"
import { ContactsSidebar } from "./contacts_sidebar"
import { VideoCallArea } from "./video_call_area"
import { ChatArea } from "./chat_area"
import { ScreenShareArea } from "./screen_share_area"
import { CallControls } from "./call_controls"
import { NotificationToast } from "./notification_toast"
import { ErrorAlert } from "./error_alert"

type ViewMode = "video-call" | "chat" | "screen-share" | "screen-select"

interface CallState {
  isInCall: boolean
  isMuted: boolean
  isCameraOff: boolean
  isRecording: boolean
  isScreenSharing: boolean
  currentContact: string
  callDuration: number
}

export default function VideoCallInterface() {
  const [viewMode, setViewMode] = useState<ViewMode>("video-call")
  const [callState, setCallState] = useState<CallState>({
    isInCall: true,
    isMuted: false,
    isCameraOff: false,
    isRecording: false,
    isScreenSharing: false,
    currentContact: "Eduardo Manuel",
    callDuration: 1596, // 26:36 in seconds
  })
  const [notification, setNotification] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (callState.isInCall) {
      const timer = setInterval(() => {
        setCallState((prev) => ({ ...prev, callDuration: prev.callDuration + 1 }))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [callState.isInCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCallAction = (action: string) => {
    switch (action) {
      case "mute":
        setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
        setNotification(callState.isMuted ? "Micrófono activado" : "Micrófono silenciado")
        break
      case "camera":
        setCallState((prev) => ({ ...prev, isCameraOff: !prev.isCameraOff }))
        setNotification(callState.isCameraOff ? "Cámara activada" : "Cámara desactivada")
        break
      case "record":
        setCallState((prev) => ({ ...prev, isRecording: !prev.isRecording }))
        setNotification(callState.isRecording ? "Grabación detenida" : "Grabación iniciada")
        break
      case "screen-share":
        if (callState.isScreenSharing) {
          setCallState((prev) => ({ ...prev, isScreenSharing: false }))
          setViewMode("video-call")
          setNotification("Compartir pantalla detenido")
        } else {
          setViewMode("screen-select")
        }
        break
      case "hang-up":
        setCallState((prev) => ({ ...prev, isInCall: false }))
        setNotification("Llamada finalizada")
        break
      case "start-screen-share":
        setCallState((prev) => ({ ...prev, isScreenSharing: true }))
        setViewMode("screen-share")
        setNotification("Compartiendo pantalla")
        break
    }

    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="flex h-screen bg-[#141414] text-white">
      {/* Left Sidebar - Always visible */}
      <ContactsSidebar
        currentContact={callState.currentContact}
        onContactSelect={(contact) => setCallState((prev) => ({ ...prev, currentContact: contact }))}
        onViewChange={setViewMode}
        currentView={viewMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">EM</span>
            </div>
            <div>
              <span className="font-medium">{callState.currentContact}</span>
              {callState.isInCall && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>En llamada - {formatDuration(callState.callDuration)}</span>
                </div>
              )}
            </div>
          </div>

          {viewMode === "screen-share" && (
            <div className="text-sm text-gray-400">Estas compartiendo: "Canva - Google Chrome"</div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative">
          {viewMode === "video-call" && (
            <VideoCallArea
              isInCall={callState.isInCall}
              isCameraOff={callState.isCameraOff}
              currentContact={callState.currentContact}
            />
          )}

          {viewMode === "chat" && <ChatArea currentContact={callState.currentContact} />}

          {viewMode === "screen-share" && <ScreenShareArea />}

          {viewMode === "screen-select" && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Seleccionar pantalla para compartir</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Screen options */}
                <div
                  className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => handleCallAction("start-screen-share")}
                >
                  <div className="aspect-video bg-gray-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-sm">Pantalla completa</span>
                  </div>
                  <p className="text-sm">Pantalla completa</p>
                </div>

                <div
                  className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => handleCallAction("start-screen-share")}
                >
                  <div className="aspect-video bg-blue-600 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs">Canva</span>
                  </div>
                  <p className="text-sm">Canva - Google Chrome</p>
                </div>

                <div
                  className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => handleCallAction("start-screen-share")}
                >
                  <div className="aspect-video bg-gray-600 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs">Gmail</span>
                  </div>
                  <p className="text-sm">Gmail - Aplicaciones</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-yellow-500 mt-0.5">⚠️</div>
                  <div>
                    <p className="font-medium text-yellow-200">Advertencia:</p>
                    <p className="text-sm text-yellow-300">
                      Solo comparte contenido si confías en el interlocutor. Puedes dejar de compartir en cualquier
                      momento.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewMode("video-call")}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Call Controls - Always visible when in call */}
        {callState.isInCall && <CallControls callState={callState} onAction={handleCallAction} />}
      </div>

      {/* Notifications */}
      {notification && <NotificationToast message={notification} onClose={() => setNotification(null)} />}

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
    </div>
  )
}
