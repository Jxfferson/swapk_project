"use client"

import { useState } from "react"
import { Phone, MessageCircle, Video, MoreVertical, Search } from "lucide-react"

interface Contact {
  id: string
  name: string
  status: "online" | "away" | "offline"
  lastMessage?: string
  avatar: string
  isVerified?: boolean
}

interface ContactsSidebarProps {
  currentContact: string
  onContactSelect: (contact: string) => void
  onViewChange: (view: "video-call" | "chat" | "screen-share") => void
  currentView: string
}

export function ContactsSidebar({ currentContact, onContactSelect, onViewChange, currentView }: ContactsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Eduardo",
      status: "online",
      lastMessage: "Eduardo ha iniciado una video llamada que esta en curso",
      avatar: "E",
      isVerified: true,
    },
    {
      id: "2",
      name: "Eduardo",
      status: "away",
      lastMessage: "Quisiera mostrarte como expresarte ante un público y tener seguridad al hacerlo.",
      avatar: "E",
    },
    {
      id: "3",
      name: "Usuario",
      status: "offline",
      lastMessage: "Vale, gracias por tu tiempo!",
      avatar: "U",
      isVerified: true,
    },
    {
      id: "4",
      name: "Usuario",
      status: "online",
      lastMessage: "Me gustaría hacer un intercambio...",
      avatar: "U",
      isVerified: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-80 bg-[#0f0f0f] border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Eduardo</span>
            <div className="w-5 h-5 text-blue-400">✓</div>
          </div>
          <button className="p-1 hover:bg-gray-700 rounded">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => onViewChange("video-call")}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${
            currentView === "video-call" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
          }`}
        >
          <Video className="w-4 h-4 mx-auto mb-1" />
          Llamadas
        </button>
        <button
          onClick={() => onViewChange("chat")}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${
            currentView === "chat" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
          }`}
        >
          <MessageCircle className="w-4 h-4 mx-auto mb-1" />
          Mensajes
        </button>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact.name)}
            className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-[#1a1a1a] transition-colors ${
              currentContact === contact.name ? "bg-[#1a1a1a]" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-medium">
                  {contact.avatar}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 border-[#0f0f0f]`}
                ></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-medium truncate">{contact.name}</span>
                  {contact.isVerified && <div className="w-4 h-4 text-blue-400">✓</div>}
                </div>
                {contact.lastMessage && <p className="text-sm text-gray-400 line-clamp-2">{contact.lastMessage}</p>}
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-500">13:20</span>
                {contact.status === "online" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <button className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded-lg transition-colors">
            <Phone className="w-4 h-4 mx-auto" />
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors">
            <Video className="w-4 h-4 mx-auto" />
          </button>
          <button className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}
