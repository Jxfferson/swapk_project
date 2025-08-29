"use client"

import { Mic, MicOff, Video, VideoOff, Phone, Monitor, MoreHorizontal, Square } from "lucide-react"

interface CallState {
  isInCall: boolean
  isMuted: boolean
  isCameraOff: boolean
  isRecording: boolean
  isScreenSharing: boolean
  currentContact: string
  callDuration: number
}

interface CallControlsProps {
  callState: CallState
  onAction: (action: string) => void
}

export function CallControls({ callState, onAction }: CallControlsProps) {
  return (
    <div className="bg-[#1a1a1a] border-t border-gray-700 p-4">
      <div className="flex items-center justify-center gap-4">
        {/* Record Button */}
        <button
          onClick={() => onAction("record")}
          className={`p-3 rounded-full transition-colors ${
            callState.isRecording ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
          title={callState.isRecording ? "Detener grabación" : "Grabar"}
        >
          <Square className="w-5 h-5" />
        </button>

        {/* Camera Button */}
        <button
          onClick={() => onAction("camera")}
          className={`p-3 rounded-full transition-colors ${
            callState.isCameraOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
          title={callState.isCameraOff ? "Activar cámara" : "Desactivar cámara"}
        >
          {callState.isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>

        {/* Microphone Button */}
        <button
          onClick={() => onAction("mute")}
          className={`p-3 rounded-full transition-colors ${
            callState.isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
          title={callState.isMuted ? "Activar micrófono" : "Silenciar micrófono"}
        >
          {callState.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Screen Share Button */}
        <button
          onClick={() => onAction("screen-share")}
          className={`p-3 rounded-full transition-colors ${
            callState.isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
          title={callState.isScreenSharing ? "Detener compartir pantalla" : "Compartir pantalla"}
        >
          <Monitor className="w-5 h-5" />
        </button>

        {/* More Options */}
        <button className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors" title="Más opciones">
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* Hang Up Button */}
        <button
          onClick={() => onAction("hang-up")}
          className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
          title="Colgar"
        >
          <Phone className="w-5 h-5 rotate-[135deg]" />
        </button>
      </div>
    </div>
  )
}
