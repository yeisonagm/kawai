"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ShoppingCart,
  MessageCircle,
  Eye,
  MapPin,
  Mountain,
  Recycle,
  Leaf,
  Package,
} from "lucide-react"

interface MarketplaceDetailProps {
  producer: any
  onBack: () => void
  onAddToCart: (producer: any) => void
}

const MarketplaceDetail: React.FC<MarketplaceDetailProps> = ({ producer, onBack, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const images = [
    "https://images.unsplash.com/photo-1442411210769-b95c4632195e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1615860291946-62f346ab7e63?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1670758291967-25ed2e90f21e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1724820187988-1c01f8a9b289?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  const reviews = [
    {
      buyerName: "Luis Exportadora SAC",
      rating: 5,
      comment:
        "Excelente calidad, llegó en perfectas condiciones. El perfil de sabor coincide exactamente con la descripción.",
      purchaseDate: "2025-08-15",
      verified: true,
    },
    {
      buyerName: "Café Premium Lima",
      rating: 4,
      comment: "Muy buen café, nuestros clientes están satisfechos. La trazabilidad blockchain da mucha confianza.",
      purchaseDate: "2025-08-10",
      verified: true,
    },
    {
      buyerName: "María González",
      rating: 5,
      comment: "Compra para mi cafetería. Don Pedro es muy profesional y el café mantiene consistencia en cada lote.",
      purchaseDate: "2025-07-28",
      verified: true,
    },
  ]

  const ratingBreakdown = {
    5: 18,
    4: 4,
    3: 2,
    2: 0,
    1: 0,
  }

  const totalReviews = Object.values(ratingBreakdown).reduce((sum, count) => sum + count, 0)

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-amber-800 to-orange-700 text-white p-4 z-10">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">Detalle del Producto</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${isFavorite ? "bg-red-500" : "hover:bg-white/20"}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={producer.coffee}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? "border-white" : "border-transparent"
                }`}
              >
                <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex flex-wrap gap-1">
            {producer.certifications?.map((cert: string, index: number) => (
              <span key={index} className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                ✅ {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Information */}
      <div className="p-4 space-y-4">
        {/* Title and Producer */}
        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">{producer.coffee}</h2>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{producer.producer.charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold text-amber-800">{producer.producer}</p>
              <div className="flex items-center text-sm text-amber-600">
                <MapPin className="w-3 h-3 mr-1" />
                {producer.location}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.8</span>
            <span className="text-sm text-gray-600">({totalReviews} reseñas)</span>
          </div>

          {/* Price */}
          <div className="bg-green-100 p-3 rounded-lg">
            <span className="text-2xl font-bold text-green-700">S/ {producer.price.toFixed(2)}</span>
            <span className="text-green-600 ml-1">por kg</span>
          </div>
        </div>

        {/* Technical Characteristics */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-amber-900 mb-3">Características Técnicas</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Mountain className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs text-gray-600">Altitud</p>
                <p className="font-semibold">1650m</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Recycle className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs text-gray-600">Proceso</p>
                <p className="font-semibold">Lavado</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs text-gray-600">Variedad</p>
                <p className="font-semibold">Catuaí Amarillo</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs text-gray-600">Stock</p>
                <p className="font-semibold">1000 kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-amber-900 mb-2">Descripción del Café</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Café de alta calidad con notas florales y cítricas. Cultivado en terrazas tradicionales con técnicas
            sostenibles transmitidas por generaciones. Ideal para tostado medio con excelente balance entre acidez y
            dulzura.
          </p>
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-1">Notas de sabor:</p>
            <div className="flex flex-wrap gap-1">
              {["Floral", "Cítrico", "Dulce", "Equilibrado"].map((note, index) => (
                <span key={index} className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-amber-900 mb-3">Calificaciones</h3>
          {Object.entries(ratingBreakdown)
            .reverse()
            .map(([stars, count]) => (
              <div key={stars} className="flex items-center space-x-2 mb-1">
                <span className="text-sm w-8">{stars}⭐</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-12">
                  {count} ({Math.round((count / totalReviews) * 100)}%)
                </span>
              </div>
            ))}
        </div>

        {/* Reviews */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-amber-900 mb-3">Reseñas de Compradores</h3>
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{review.buyerName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.buyerName}</p>
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        {review.verified && <span className="text-green-500 text-xs">✅</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Hace 9 días</span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={() => onAddToCart(producer)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Agregar al carrito</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Contactar</span>
            </button>
            <button className="bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Trazabilidad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceDetail
