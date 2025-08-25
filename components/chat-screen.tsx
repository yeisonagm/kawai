"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, X, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  image?: string
  hasButtons?: boolean
  buttons?: Array<{ text: string; action: string }>
}

interface Conversation {
  id: string
  title: string
  preview: string
  category: "plagas" | "registro" | "precios" | "tecnico"
  messages: Message[]
}

interface ChatScreenProps {
  onClose: () => void
}

export default function ChatScreen({ onClose }: ChatScreenProps) {
  const [currentView, setCurrentView] = useState<"conversations" | "chat">("conversations")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const coffeeImages = [
    "https://images.unsplash.com/photo-1442411210769-b95c4632195e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1615860291946-62f346ab7e63?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1670758291967-25ed2e90f21e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1724820187988-1c01f8a9b289?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://perfectdailygrind.com/es/wp-content/uploads/sites/2/2021/01/La-Roya-4.jpg"
  ]

  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Consulta sobre Variedades",
      preview: "¿Qué variedad de café me conviene plantar?",
      category: "tecnico",
      messages: [
        {
          id: "1",
          text: "¡Hola! Soy KAWAI ASSIST 👋 ¿En qué puedo ayudarte hoy?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "¿Qué variedad de café me conviene plantar?",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "3",
          text: "¿En qué zona de Cajamarca está su finca?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "4",
          text: "San Ignacio, a 1,800 metros",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "5",
          text: "Perfecto para su altitud recomiendo:\n\n☕ Caturra - resistente, buen precio\n☕ Bourbon - mejor calidad, más delicado\n\n¿Prioriza resistencia o calidad?",
          sender: "bot",
          timestamp: new Date(),
          image: coffeeImages[0],
        },
        {
          id: "6",
          text: "Quiero buena calidad",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "7",
          text: "Bourbon es ideal. Necesita:\n\n🌳 Sombra parcial (60%)\n💧 Riego constante\n✂️ Cosecha selectiva\n\n¿Tiene experiencia con cafés delicados?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "8",
          text: "Soy nuevo",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "9",
          text: "Le sugiero empezar con Caturra. Es más tolerante y aprenderá mejor. Después puede plantar Bourbon gradualmente.",
          sender: "bot",
          timestamp: new Date(),
          image: coffeeImages[1],
        },
      ],
    },
    {
      id: "2",
      title: "Registro de Lotes",
      preview: "Quiero registrar mi cosecha",
      category: "registro",
      messages: [
        {
          id: "1",
          text: "¡Hola Don Pedro! ¿Quiere registrar un nuevo lote de café?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "Sí, quiero registrar mi cosecha",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "3",
          text: "Perfecto. Primero suba una foto de su café",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [{ text: "📸 Tomar foto", action: "camera" }],
        },
        {
          id: "4",
          text: "[Foto subida]",
          sender: "user",
          timestamp: new Date(),
          image: coffeeImages[2],
        },
        {
          id: "5",
          text: "Excelente café arábica. Ahora indique dónde está su finca",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [
            { text: "📍 Mi ubicación", action: "location" },
            { text: "🗺️ Buscar en mapa", action: "map" },
          ],
        },
        {
          id: "6",
          text: "San Ignacio, Cajamarca",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "7",
          text: "¿Cuándo cosechó este lote?",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [{ text: "📅 Calendario", action: "calendar" }],
        },
        {
          id: "8",
          text: "15/08/2025",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "9",
          text: "¿Cuántos kilos cosechó?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "10",
          text: "250 kilos",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "11",
          text: "✅ ¡Listo! Lote #001 registrado en blockchain\n\nSe generó automáticamente un código QR de trazabilidad",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [
            { text: "📥 Descargar QR", action: "download" },
            { text: "📤 Compartir", action: "share" },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Alerta de Broca",
      preview: "🔴 Riesgo alto de Broca del café",
      category: "plagas",
      messages: [
        {
          id: "1",
          text: "🔴 ALERTA: Riesgo alto de Broca del café en su zona. Actúe en 48 horas.",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "¿Qué es la Broca?",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "3",
          text: "Insecto que perfora los granos. Puede perder hasta 40% de cosecha si no actúa.",
          sender: "bot",
          timestamp: new Date(),
          image: coffeeImages[3],
        },
        {
          id: "4",
          text: "¿Cómo la combato?",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "5",
          text: "Tratamiento urgente:\n\n🧹 Recoger frutos del suelo\n🍺 Aplicar trampas con alcohol\n☕ Cosechar granos maduros\n\n¿Tiene alcohol disponible?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "6",
          text: "No tengo",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "7",
          text: "Alternativa inmediata:\n\n🧹 Recoger TODOS los frutos caídos\n⚰️ Enterrarlos a 50 cm profundidad\n☕ Cosechar lo maduro hoy mismo\n\n¿Puede hacerlo hoy?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "8",
          text: "Sí, voy ahora",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "9",
          text: "Excelente. Envío tutorial de trampas caseras. Mañana preguntaré cómo le fue.",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [{ text: "📖 Ver tutorial trampas", action: "tutorial" }],
        },
      ],
    },
    {
      id: "4",
      title: "Asesor Técnico - Roya",
      preview: "Mis plantas tienen manchas amarillas",
      category: "tecnico",
      messages: [
        {
          id: "1",
          text: "Mis plantas tienen manchas amarillas",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "Entiendo su preocupación. Suba una foto de la hoja afectada para diagnosticar",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [{ text: "📸 Tomar foto", action: "camera" }],
        },
        {
          id: "3",
          text: "[Foto de hoja con manchas]",
          sender: "user",
          timestamp: new Date(),
          image: coffeeImages[4],
        },
        {
          id: "4",
          text: "Detecté síntomas de Roya del café. Es una plaga común en Cajamarca",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "5",
          text: "¿Qué hago?",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "6",
          text: "Le recomiendo:\n\n🧪 Aplicar fungicida de cobre\n🌬️ Mejorar ventilación entre plantas\n🍃 Eliminar hojas afectadas\n\n¿Tiene fungicida disponible?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "7",
          text: "No tengo",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "8",
          text: "Alternativa natural:\n\n🧂 Bicarbonato de sodio (1 cucharada por litro)\n🌅 Aplicar en mañanas frescas\n\n¿Necesita más detalles del tratamiento?",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [
            { text: "📖 Ver tutorial", action: "tutorial" },
            { text: "✅ Entendido", action: "understood" },
          ],
        },
        {
          id: "9",
          text: "Sí, el tutorial",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: "10",
          text: "Recuerde: aplique cada 7 días por 3 semanas. ¿Programo recordatorios?",
          sender: "bot",
          timestamp: new Date(),
          hasButtons: true,
          buttons: [
            { text: "⏰ Sí, recordar", action: "reminder" },
            { text: "📱 No, gracias", action: "no_reminder" },
          ],
        },
      ],
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setMessages(conversation.messages)
    setCurrentView("chat")
  }

  const handleBackToConversations = () => {
    setCurrentView("conversations")
    setSelectedConversation(null)
    setMessages([])
  }

  const handleButtonClick = (action: string) => {
    let responseText = ""
    switch (action) {
      case "camera":
        responseText = "📸 Foto tomada correctamente"
        break
      case "location":
        responseText = "📍 Ubicación detectada: San Ignacio, Cajamarca"
        break
      case "map":
        responseText = "🗺️ Ubicación seleccionada en el mapa"
        break
      case "calendar":
        responseText = "📅 Fecha seleccionada: " + new Date().toLocaleDateString()
        break
      case "download":
        responseText = "📥 QR descargado exitosamente"
        break
      case "share":
        responseText = "📤 QR compartido por WhatsApp"
        break
      case "tutorial":
        responseText = "📖 Tutorial enviado a su WhatsApp"
        break
      case "reminder":
        responseText = "⏰ Recordatorios programados cada 7 días"
        break
      default:
        responseText = "✅ Acción completada"
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("roya") || message.includes("mancha") || message.includes("hoja")) {
      return "La roya amarilla es común en Cajamarca durante época lluviosa. 🍃\n✅ Tratamiento inmediato: Trichoderma harzianum 2g/L\n⚠️ Evitar cobre en floración\n📍 Proveedores cercanos: AgroVerde Cajamarca, BioInsumos Jaén\n¿Necesita el contacto específico?"
    }

    if (message.includes("broca") || message.includes("gusano") || message.includes("perforación")) {
      return "Broca del café detectada. En Cajamarca es crítica entre marzo-junio. 🐛\n✅ Control: Beauveria bassiana + trampas con metanol\n📊 Umbral: >2% de frutos perforados requiere tratamiento\n⏰ Aplicar temprano en la mañana\n¿Quiere el protocolo completo?"
    }

    if (message.includes("precio") || message.includes("mercado") || message.includes("venta")) {
      return "Precios actuales Cajamarca (Diciembre 2024): 💰\n☕ Pergamino seco: S/9.20-S/11.50/kg\n⭐ Café especial: S/13.00-S/16.00/kg\n🌍 Exportación directa: $2.40-$2.80/lb\n📈 Tendencia: Alza por demanda europea\n¿Tiene café listo para venta?"
    }

    return "Como su asistente especializado en café de Cajamarca, puedo ayudarle con: 🌱 Manejo de plagas (roya, broca), 💰 Precios actualizados del mercado, 📊 Registro de cosechas y lotes, 🌤️ Alertas climáticas regionales. ¿Sobre qué tema necesita asesoría?"
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "plagas":
        return "bg-red-100 text-red-800"
      case "registro":
        return "bg-blue-100 text-blue-800"
      case "precios":
        return "bg-green-100 text-green-800"
      case "tecnico":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plagas":
        return "🐛"
      case "registro":
        return "📝"
      case "precios":
        return "💰"
      case "tecnico":
        return "🔧"
      default:
        return "💬"
    }
  }

  if (currentView === "conversations") {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">KAWAI ASSIST</h2>
              <p className="text-sm text-amber-100">Selecciona una conversación</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Conversaciones Disponibles</h3>
            <p className="text-sm text-gray-600">
              Con KAWAI ASSIST, resuelve dudas sobre plagas, precios de mercado y gestión de lotes en segundos.
            </p>
          </div>

          <div className="space-y-3">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation)}
                className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-amber-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getCategoryIcon(conversation.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{conversation.title}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(conversation.category)}`}
                      >
                        {conversation.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{conversation.preview}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <MessageCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs text-amber-600">{conversation.messages.length} mensajes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBackToConversations}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            ←
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">KAWAI ASSIST</h2>
            <p className="text-sm text-amber-100">{selectedConversation?.title || "Chat activo"}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-amber-600 text-white"
                    : "bg-gradient-to-br from-orange-500 to-amber-600 text-white"
                }`}
              >
                {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.sender === "user"
                    ? "bg-amber-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border border-amber-100"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image || "/placeholder.svg"}
                    alt="Imagen del chat"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                {message.hasButtons && message.buttons && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(button.action)}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium hover:bg-amber-200 transition-colors"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-amber-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-amber-100">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta"
              className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
