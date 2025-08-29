"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

interface ChatAreaProps {
  currentContact: string
}

export function ChatArea({ currentContact }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Usuario",
      content: "Hola, ¿Cómo estás?",
      timestamp: "13:20",
      isOwn: false,
    },
    {
      id: "2",
      sender: "Tú",
      content: "Muy bien, gracias!",
      timestamp: "13:21",
      isOwn: true,
    },
    {
      id: "3",
      sender: "Usuario",
      content: "Me alegro, ¿Te interesaría hacer un intercambio?",
      timestamp: "13:22",
      isOwn: false,
    },
    {
      id: "4",
      sender: "Tú",
      content: "Claro!, ¿Qué tema te gustaría abordar?",
      timestamp: "13:23",
      isOwn: true,
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "Tú",
        content: message,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full">
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="font-medium">U</span>
              </div>
              <div>
                <h3 className="font-medium">{currentContact}</h3>
                <p className="text-sm text-green-400">En línea</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? "order-2" : "order-1"}`}>
                {!msg.isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">U</div>
                    <span className="text-xs text-gray-400">{msg.sender}</span>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-lg ${msg.isOwn ? "bg-blue-600 text-white" : "bg-[#1a1a1a] text-white"}`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-200" : "text-gray-400"}`}>{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">U</div>
              <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="w-full bg-[#141414] border border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 rounded p-1 transition-colors">
                <Smile className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
