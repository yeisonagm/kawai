"use client"

import { useState } from "react"
import { X, Send, Coffee } from "lucide-react"

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

interface KawaiAssistProps {
  show: boolean
  onClose: () => void
}

export default function KawaiAssist({ show, onClose }: KawaiAssistProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hola 👋 soy KAWAI ASSIST, tu asistente digital. Con KAWAI ASSIST, resuelve dudas sobre plagas, precios de mercado y gestión de lotes en segundos. ¿En qué puedo ayudarte?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      isBot: false,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")

    // Respuesta automática del bot
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        text: getBotResponse(chatInput),
        isBot: true,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("plaga") || lowerInput.includes("insecto") || lowerInput.includes("enfermedad")) {
      return "🐛 Para control de plagas: Revisa las alertas en tus lotes específicos. Las plagas más comunes en café son la broca, roya y cochinilla. Te recomiendo aplicar control biológico y monitoreo constante. ¿Qué síntomas observas en tu cultivo?"
    } else if (lowerInput.includes("precio") || lowerInput.includes("mercado") || lowerInput.includes("venta")) {
      return "💰 Precios actuales del mercado: Arábica S/18-22/kg, Robusta S/12-16/kg, Geisha S/45-60/kg. Los precios varían según calidad y certificaciones. Ve a Mercado para ver ofertas en tiempo real y contactar compradores directamente."
    } else if (lowerInput.includes("gestión") || lowerInput.includes("lote") || lowerInput.includes("manejo")) {
      return "📊 Para gestión de lotes: Registra todas las actividades (siembra, fertilización, cosecha), monitorea alertas climáticas, mantén trazabilidad completa y genera QR para cada lote. ¿Necesitas ayuda con algún proceso específico?"
    } else if (lowerInput.includes("clima") || lowerInput.includes("lluvia") || lowerInput.includes("temperatura")) {
      return "🌦️ Condiciones climáticas óptimas para café: Temperatura 18-24°C, precipitación 1200-2000mm/año, altitud 800-2000msnm. Revisa las alertas climáticas en tu dashboard para tomar decisiones preventivas."
    } else if (
      lowerInput.includes("fertilización") ||
      lowerInput.includes("abono") ||
      lowerInput.includes("nutriente")
    ) {
      return "🌱 Programa de fertilización: NPK 18-5-15 en crecimiento, 12-12-17 en producción. Aplica materia orgánica cada 6 meses. Análisis de suelo recomendado anualmente. ¿En qué etapa está tu cultivo?"
    } else if (lowerInput.includes("cosecha") || lowerInput.includes("recolección") || lowerInput.includes("cereza")) {
      return "☕ Indicadores de cosecha: Cerezas rojas maduras, 18-22% de azúcar, desprendimiento fácil. Cosecha selectiva mejora calidad. Procesa dentro de 6 horas para mantener características organolépticas."
    } else if (
      lowerInput.includes("certificación") ||
      lowerInput.includes("orgánico") ||
      lowerInput.includes("fair trade")
    ) {
      return "🏆 Certificaciones disponibles: Orgánico (+30% precio), Fair Trade (+25%), UTZ (+20%), Rainforest (+15%). Te ayudo a conectar con certificadoras y preparar documentación necesaria."
    } else if (
      lowerInput.includes("exportación") ||
      lowerInput.includes("internacional") ||
      lowerInput.includes("exportar")
    ) {
      return "🌍 Para exportación: Necesitas certificaciones, contratos internacionales, logística especializada. Actualiza a membresía Exportador para acceso a compradores internacionales y analítica avanzada."
    } else if (lowerInput.includes("hola") || lowerInput.includes("buenos") || lowerInput.includes("buenas")) {
      return "👋 ¡Hola! Soy tu asistente especializado en café. Puedo ayudarte con: control de plagas 🐛, precios de mercado 💰, gestión de lotes 📊, técnicas de cultivo 🌱, y mucho más. ¿Qué necesitas saber?"
    } else if (lowerInput.includes("gracias") || lowerInput.includes("perfecto") || lowerInput.includes("excelente")) {
      return "😊 ¡De nada! Estoy aquí para ayudarte a optimizar tu producción cafetera. Si tienes más dudas sobre plagas, precios o gestión, no dudes en consultarme. ¡Éxito en tu cultivo!"
    } else {
      return "🤖 Soy especialista en: Control de plagas 🐛, Precios de mercado 💰, Gestión de lotes 📊, Condiciones climáticas 🌦️, Técnicas de cultivo 🌱, Certificaciones 🏆, y Exportación 🌍. ¿Sobre qué tema específico necesitas ayuda?"
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md h-[500px] flex flex-col animate-slide-up">
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 p-4 rounded-t-3xl flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Coffee className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">KAWAI ASSIST</h3>
              <p className="text-amber-100 text-xs">Especialista en Café • En línea</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-amber-50 to-white">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-xs p-3 rounded-2xl shadow-sm ${
                  message.isBot
                    ? "bg-white border border-amber-200 text-amber-900"
                    : "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-amber-200 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="Pregunta sobre plagas, precios o gestión..."
              className="flex-1 p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleChatSubmit}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
