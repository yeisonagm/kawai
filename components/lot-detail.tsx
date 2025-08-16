"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Share2,
  QrCode,
  AlertTriangle,
  Leaf,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  Info,
  Lightbulb,
  BookOpen,
  Sun,
  Droplets,
  Thermometer,
  X,
} from "lucide-react"
import type { Lot } from "@/lib/data"
import { getRandomCoffeeImage } from "@/lib/data"

interface LotDetailProps {
  lot: Lot
  onBack: () => void
}

export default function LotDetail({ lot, onBack }: LotDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [showComparative, setShowComparative] = useState(false)

  // Imágenes simuladas para el slider
  const lotImages = [getRandomCoffeeImage(0), getRandomCoffeeImage(1), getRandomCoffeeImage(2), getRandomCoffeeImage(3)]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lotImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lotImages.length) % lotImages.length)
  }

  const generateQR = () => {
    const qrData = `KAWAI-${lot.code}-${lot.farm}-${lot.variety}-${lot.producer}`
    setShowQR(true)
  }

  const openComparative = () => {
    setShowComparative(true)
  }

  const shareToSocial = (platform: string) => {
    const text = `🌱 Café ${lot.variety} de ${lot.farm}\n📍 ${lot.producer}\n💰 S/ ${lot.priceInSoles}/kg\n🏆 ${lot.certifications.join(", ")}\n\n#KawaiGuardian #CaféPeruano #CaféEspecial`

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`,
      instagram: `https://www.instagram.com/`,
    }

    if (platform === "instagram") {
      alert("Para compartir en Instagram, toma una captura de pantalla y compártela en tu historia")
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  const getAlertIcon = () => {
    switch (lot.alertType) {
      case "plaga":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "clima":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case "catastrofe":
        return <AlertTriangle className="w-4 h-4 text-red-700" />
      default:
        return <Leaf className="w-4 h-4 text-green-600" />
    }
  }

  const getLotInfo = () => {
    const infoMap: Record<string, any> = {
      Geisha: {
        description:
          "El café Geisha es considerado uno de los más exclusivos del mundo, originario de Etiopía pero perfeccionado en Panamá. Su perfil de taza es floral, con notas a jazmín y bergamota.",
        curiosities: [
          "Fue descubierto en 1931 en los bosques de Geisha, Etiopía",
          "Puede alcanzar precios de hasta $1,000 por libra en subastas",
          "Su sabor único se debe a la altitud y condiciones climáticas específicas",
        ],
        tips: [
          "Cosecha solo los frutos completamente maduros (rojo cereza)",
          "Procesa inmediatamente después de la cosecha",
          "Mantén temperatura constante durante el secado",
        ],
        cultivation:
          "Se cultiva a altitudes superiores a 1,500m, requiere sombra parcial y suelos volcánicos bien drenados. El proceso de fermentación es crucial para desarrollar sus características florales.",
      },
      Bourbon: {
        description:
          "Variedad tradicional con excelente balance entre acidez y dulzura. Originaria de la isla Bourbon (actual Reunión), es apreciada por su consistencia y sabor clásico a café.",
        curiosities: [
          "Una de las variedades más antiguas cultivadas comercialmente",
          "Los frutos pueden ser rojos o amarillos según la mutación",
          "Base genética de muchas variedades modernas",
        ],
        tips: [
          "Poda regularmente para mantener productividad",
          "Fertiliza con materia orgánica cada 3 meses",
          "Controla la broca del café con trampas naturales",
        ],
        cultivation:
          "Adaptable a diferentes altitudes (800-2000m), prefiere temperaturas entre 18-24°C. Requiere precipitación anual de 1,200-1,800mm distribuida uniformemente.",
      },
      Caturra: {
        description:
          "Mutación natural del Bourbon, más compacta y productiva. Excelente para pequeños productores por su alta densidad de siembra y resistencia moderada a enfermedades.",
        curiosities: [
          "Descubierta en Brasil en 1937",
          "Permite plantar hasta 5,000 plantas por hectárea",
          "Madura 6 meses antes que el Bourbon tradicional",
        ],
        tips: [
          "Ideal para sistemas de cultivo intensivo",
          "Requiere fertilización constante por su alta productividad",
          "Cosecha selectiva mejora significativamente la calidad",
        ],
        cultivation:
          "Crece bien entre 500-1,700m de altitud. Su porte bajo facilita la cosecha manual. Necesita manejo cuidadoso de nutrientes debido a su alta productividad.",
      },
    }
    return infoMap[lot.variety] || infoMap["Bourbon"]
  }

  const lotInfo = getLotInfo()

  return (
    <div className="h-full bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Detalle del Lote</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={openComparative} className="text-white hover:bg-white/20 p-2">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={generateQR} className="text-white hover:bg-white/20 p-2">
              <QrCode className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100%-80px)] overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Nombre de la Finca - Grande y prominente */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{lot.farm}</h2>
            <p className="text-lg text-amber-700">{lot.producer}</p>
            <Badge variant="outline" className="mt-2 border-amber-600 text-amber-800">
              {lot.code}
            </Badge>
          </div>

          {/* Slider de Imágenes */}
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={lotImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${lot.variety} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Controles del slider */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                →
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {lotImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Descripción del Café
            </h3>
            <p className="text-gray-700 leading-relaxed">{lotInfo.description}</p>
          </div>

          {/* Información Principal */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Variedad</p>
                  <p className="font-semibold text-amber-900">{lot.variety}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Altitud</p>
                  <p className="font-semibold text-amber-900">{lot.altitude}m</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Cosecha</p>
                  <p className="font-semibold text-amber-900">
                    {new Date(lot.harvestDate).toLocaleDateString("es-PE")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Maduración</p>
                  <p className="font-semibold text-amber-900">{lot.maturation}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Condiciones de la Finca */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Condiciones de la Finca
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Temperatura</p>
                <p className="font-semibold text-blue-900">22°C</p>
              </div>
              <div className="text-center">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Humedad</p>
                <p className="font-semibold text-blue-900">75%</p>
              </div>
              <div className="text-center">
                <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Luz Solar</p>
                <p className="font-semibold text-blue-900">6h/día</p>
              </div>
            </div>
          </div>

          {/* Precio y Stock */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-700 rounded-xl shadow-lg p-6 text-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-amber-200 text-sm">Precio por kg</p>
                <p className="text-2xl font-bold">S/ {lot.priceInSoles}</p>
                <p className="text-amber-200 text-sm">${lot.price} USD</p>
              </div>
              <div>
                <p className="text-amber-200 text-sm">Stock disponible</p>
                <p className="text-2xl font-bold">{lot.stock.toLocaleString()} kg</p>
              </div>
            </div>
          </div>

          {/* Certificaciones */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certificaciones
            </h3>
            <div className="flex flex-wrap gap-2">
              {lot.certifications.map((cert, index) => (
                <Badge key={index} className="bg-green-100 text-green-800 border-green-300">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Alertas */}
          {lot.alerts > 0 && lot.alertMessage && (
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
                {getAlertIcon()}
                Alertas de la Finca {lot.farm}
              </h3>
              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <p className="text-orange-800 font-medium">{lot.alertMessage}</p>
                <p className="text-orange-600 text-sm mt-1">
                  Finca: {lot.farm} | Tipo:{" "}
                  {lot.alertType === "plaga" ? "Plaga" : lot.alertType === "clima" ? "Clima" : "Catástrofe"}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-amber-800 text-sm">
                  <strong>Recomendación:</strong>{" "}
                  {lot.alertType === "plaga"
                    ? "Aplicar control biológico inmediatamente"
                    : lot.alertType === "clima"
                      ? "Proteger cultivos con mallas sombreadoras"
                      : "Evaluar daños y planificar recuperación"}
                </p>
              </div>
            </div>
          )}

          {/* Curiosidades */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Curiosidades
            </h3>
            <div className="space-y-3">
              {lotInfo.curiosities.map((curiosity: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-purple-800 text-sm">{curiosity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips de Cultivo */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Tips de Cultivo
            </h3>
            <div className="space-y-3">
              {lotInfo.tips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-green-800 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proceso de Cultivo */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl shadow-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Proceso de Cultivo
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed">{lotInfo.cultivation}</p>
          </div>

          {/* Botones de Acción */}
          <div className="grid grid-cols-2 gap-4 pb-6">
            <Button
              className="bg-gradient-to-r from-amber-700 to-orange-600 hover:from-amber-800 hover:to-orange-700 text-white font-semibold py-3"
              onClick={openComparative}
            >
              Comparar Lotes
            </Button>
            <Button
              variant="outline"
              className="border-2 border-amber-700 text-amber-800 hover:bg-amber-50 font-semibold py-3 bg-transparent"
              onClick={generateQR}
            >
              Generar QR
            </Button>
          </div>
        </div>
      </div>

      {/* Modales */}
      {showQR && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-[280px] w-full">
            <h3 className="text-base font-semibold text-amber-900 mb-3 text-center">Código QR</h3>
            <div className="bg-amber-900 w-24 h-24 mx-auto rounded-lg flex items-center justify-center mb-3">
              <div className="text-white text-xs text-center p-2">
                <QrCode className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">{lot.code}</p>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mb-3">Escanea para ver información del lote</p>
            <Button onClick={() => setShowQR(false)} className="w-full bg-amber-800 hover:bg-amber-900 text-sm py-2">
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {showComparative && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-[320px] w-full max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-amber-900">Compartir Lote</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowComparative(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Tarjeta para compartir */}
            <div className="bg-gradient-to-r from-amber-800 to-orange-700 rounded-xl p-4 text-white mb-4">
              <div className="flex items-start gap-3">
                <img
                  src={lotImages[0] || "/placeholder.svg"}
                  alt={lot.variety}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm">{lot.variety}</h4>
                  <p className="text-amber-200 text-xs">{lot.farm}</p>
                  <p className="text-amber-100 text-xs mb-1">{lot.producer}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="bg-white/20 px-1 py-0.5 rounded text-xs">S/ {lot.priceInSoles}/kg</span>
                    <span className="bg-white/20 px-1 py-0.5 rounded text-xs">{lot.stock} kg</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-amber-100 text-xs">🏆 {lot.certifications.join(" • ")}</p>
                <p className="text-amber-200 text-xs mt-1">📍 {lot.altitude}m de altitud</p>
              </div>
            </div>

            {/* Opciones de compartir */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-2">Compartir en redes sociales:</p>

              <Button
                onClick={() => shareToSocial("whatsapp")}
                className="w-full bg-green-600 hover:bg-green-700 text-white justify-start text-sm py-2"
              >
                <span className="mr-2">📱</span> WhatsApp
              </Button>

              <Button
                onClick={() => shareToSocial("facebook")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start text-sm py-2"
              >
                <span className="mr-2">📘</span> Facebook
              </Button>

              <Button
                onClick={() => shareToSocial("twitter")}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white justify-start text-sm py-2"
              >
                <span className="mr-2">🐦</span> Twitter
              </Button>

              <Button
                onClick={() => shareToSocial("instagram")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white justify-start text-sm py-2"
              >
                <span className="mr-2">📷</span> Instagram
              </Button>
            </div>

            <div className="mt-4 pt-3 border-t">
              <Button
                variant="outline"
                onClick={() => setShowComparative(false)}
                className="w-full border-amber-600 text-amber-800 hover:bg-amber-50 text-sm py-2"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
