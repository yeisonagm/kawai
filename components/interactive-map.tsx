"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, X, Users, Mountain } from "lucide-react"

// Datos de productores con coordenadas aproximadas del Perú
const coffeeProducers = [
  {
    id: 1,
    name: "Pedro Huamán",
    region: "Cajamarca",
    lat: -7.1611,
    lng: -78.5126,
    distance: "2.3 km",
    production: "1,200 kg/año",
    variety: "Caturra",
    altitude: "1,650m",
    certification: "Orgánico",
  },
  {
    id: 2,
    name: "Luis Ñahui",
    region: "San Martín",
    lat: -6.4889,
    lng: -76.3625,
    distance: "5.7 km",
    production: "850 kg/año",
    variety: "Bourbon",
    altitude: "1,200m",
    certification: "Fair Trade",
  },
  {
    id: 3,
    name: "María Vásquez",
    region: "Amazonas",
    lat: -6.2308,
    lng: -77.8717,
    distance: "8.1 km",
    production: "2,100 kg/año",
    variety: "Geisha",
    altitude: "1,800m",
    certification: "Orgánico + UTZ",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    region: "Huánuco",
    lat: -9.9306,
    lng: -76.2422,
    distance: "12.4 km",
    production: "950 kg/año",
    variety: "Typica",
    altitude: "1,450m",
    certification: "Rainforest",
  },
  {
    id: 5,
    name: "Ana Torres",
    region: "Pasco",
    lat: -10.6827,
    lng: -76.2561,
    distance: "15.2 km",
    production: "1,500 kg/año",
    variety: "Catimor",
    altitude: "1,750m",
    certification: "Orgánico",
  },
]

interface InteractiveMapProps {
  onBack: () => void
}

export default function InteractiveMap({ onBack }: InteractiveMapProps) {
  const [selectedProducer, setSelectedProducer] = useState<(typeof coffeeProducers)[0] | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleProducerClick = (producer: (typeof coffeeProducers)[0]) => {
    setSelectedProducer(producer)
    setShowPopup(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Map Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Interactive Map */}
        <div className="bg-gradient-to-br from-green-100 to-amber-100 rounded-2xl p-4 relative">
          <h3 className="text-lg font-bold text-amber-800 mb-2">Regiones Cafeteras del Perú</h3>

          <div className="relative h-80 bg-gradient-to-br from-green-200 via-yellow-100 to-amber-200 rounded-lg overflow-hidden border-2 border-amber-300">
            {/* Contorno básico del Perú */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400">
              <path
                d="M50 50 Q80 30 120 40 Q160 35 200 50 Q240 60 250 100 Q255 140 240 180 Q230 220 220 260 Q210 300 180 330 Q140 350 100 340 Q60 320 40 280 Q30 240 35 200 Q40 160 45 120 Q48 80 50 50 Z"
                fill="rgba(34, 197, 94, 0.2)"
                stroke="rgba(245, 158, 11, 0.5)"
                strokeWidth="2"
              />
            </svg>

            {/* Puntos de productores clickeables */}
            {coffeeProducers.map((producer, index) => (
              <div
                key={producer.id}
                className="absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125"
                style={{
                  left: `${20 + (index * 15) + (index % 2) * 10}%`,
                  top: `${25 + (index * 12) + (index % 3) * 8}%`,
                }}
                onClick={() => handleProducerClick(producer)}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-amber-600 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-amber-200 z-10">
                    <p className="font-bold text-amber-800">{producer.name}</p>
                    <p className="text-amber-600">{producer.region}</p>
                    <p className="text-green-600">{producer.variety}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Leyenda del mapa */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-lg text-xs border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                <span className="text-amber-700 font-medium">Productores de Café</span>
              </div>
              <p className="text-amber-600">Haz clic en los puntos para más información</p>
            </div>

            {/* Estadísticas del mapa */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-2 rounded-lg text-xs border border-amber-200">
              <p className="font-bold text-amber-800">{coffeeProducers.length} Productores</p>
              <p className="text-amber-600">5 Regiones Activas</p>
            </div>
          </div>
        </div>

        {/* Lista de productores */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Productores Cercanos
          </h3>
          <div className="space-y-3">
            {coffeeProducers.map((producer) => (
              <div
                key={producer.id}
                className="flex items-center justify-between p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
                onClick={() => handleProducerClick(producer)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">{producer.name}</p>
                    <p className="text-sm text-amber-600">
                      {producer.region} - {producer.distance}
                    </p>
                    <p className="text-xs text-green-600">
                      {producer.variety} • {producer.altitude}
                    </p>
                  </div>
                </div>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas regionales */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-4 text-white">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Mountain className="h-5 w-5" />
            Estadísticas Regionales
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">{coffeeProducers.length}</p>
              <p className="text-sm opacity-90">Productores</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">12.5k</p>
              <p className="text-sm opacity-90">Hectáreas</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm opacity-90">Orgánico</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">1,565m</p>
              <p className="text-sm opacity-90">Alt. Promedio</p>
            </div>
          </div>
        </div>
      </div>

      {showPopup && selectedProducer && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-sm mx-4 mb-0 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-amber-800">{selectedProducer.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPopup(false)} className="text-amber-600">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-medium text-amber-800">{selectedProducer.region}</p>
                  <p className="text-sm text-amber-600">A {selectedProducer.distance} de distancia</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-800">{selectedProducer.production}</p>
                  <p className="text-xs text-amber-600">Producción Anual</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-800">{selectedProducer.altitude}</p>
                  <p className="text-xs text-amber-600">Altitud</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">Variedad:</span>
                  <span className="text-sm font-medium text-green-600">{selectedProducer.variety}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700">Certificación:</span>
                  <span className="text-sm font-medium text-blue-600">{selectedProducer.certification}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">Contactar</Button>
                <Button
                  variant="outline"
                  className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  Ver Lotes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
