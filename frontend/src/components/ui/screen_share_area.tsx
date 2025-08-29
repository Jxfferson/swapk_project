"use client"

export function ScreenShareArea() {
  return (
    <div className="flex-1 bg-[#141414] p-6">
      <div className="h-full bg-[#1a1a1a] rounded-lg overflow-hidden">
        {/* Simulated Canva Interface */}
        <div className="h-full relative">
          <img
            src="/canva-design-interface-with-colorful-design-templa.png"
            alt="Canva interface being shared"
            className="w-full h-full object-cover"
          />

          {/* Screen share overlay */}
          <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg">
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
              Compartiendo pantalla
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
