"use client"

import { useState, useEffect } from "react"
import {
  User,
  Crown,
  MessageCircle,
  Settings,
  Bell,
  Globe,
  HelpCircle,
  Phone,
  Star,
  Award,
  Calendar,
  Package,
} from "lucide-react"

interface ProfileData {
  name: string
  email: string
  phone: string
  role: string
  experience: string
  production: string
  certifications: string[]
  story: string
}

interface ChatMessage {
  sender: string
  message: string
  time: string
  isOwn: boolean
  hasButton?: boolean
  buttonText?: string
  buttonAction?: string
  hasImage?: boolean
  imageUrl?: string
  imageAlt?: string
  isSystemMessage?: boolean
}

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Pedro Huamán",
    email: "pedro.hauman@correo.com",
    phone: "+51 987 123 456",
    role: "Caficultor",
    experience: "12 años",
    production: "10,500 kg anuales",
    certifications: ["Orgánico", "UTZ", "Fair Trade"],
    story:
      "Gracias a KAWAI GUARDIAN, mis clientes pueden conocer todo el proceso de mi Geisha y confiar en su calidad.",
  })
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("Español")

  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [currentMembership, setCurrentMembership] = useState("Gratuito")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    yapeName: "",
    yapeNumber: "",
    googleEmail: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [selectedAccount, setSelectedAccount] = useState<any>(null)

  const predefinedAccounts = {
    yape: [
      { id: 1, name: "Pedro Huamán", number: "+51 987 123 456", isDefault: true },
      { id: 2, name: "María Ñahui", number: "+51 987 654 321", isDefault: false },
    ],
    googlepay: [
      { id: 1, email: "pedro.huaman@gmail.com", isDefault: true },
      { id: 2, email: "luis.nahui.work@gmail.com", isDefault: false },
    ],
    card: [
      { id: 1, name: "Visa **** 4567", number: "**** **** **** 4567", type: "Visa", isDefault: true },
      { id: 2, name: "Mastercard **** 8901", number: "**** **** **** 8901", type: "Mastercard", isDefault: false },
    ],
  }

  const chatContacts = [
    {
      id: 1,
      name: "Exportadora Lima SAC",
      avatar: "EL",
      lastMessage: "¿Tienes disponible el lote Geisha?",
      time: "10:45 AM",
      unread: 2,
      status: "online",
    },
    {
      id: 2,
      name: "Coffee Traders Inc.",
      avatar: "CT",
      lastMessage: "Excelente calidad, queremos más",
      time: "Ayer",
      unread: 0,
      status: "offline",
    },
    {
      id: 3,
      name: "Specialty Coffee Co.",
      avatar: "SC",
      lastMessage: "¿Cuál es el precio por kg?",
      time: "2 días",
      unread: 1,
      status: "online",
    },
    {
      id: 4,
      name: "European Imports",
      avatar: "EI",
      lastMessage: "Necesitamos certificación orgánica",
      time: "1 semana",
      unread: 0,
      status: "offline",
    },
    {
      id: 5,
      name: "Luis Exportador",
      avatar: "LE",
      lastMessage: "Compra confirmada 🛒",
      time: "12:30 PM",
      unread: 1,
      status: "online",
    },
  ]

  const chatConversations: Record<number, ChatMessage[]> = {
    1: [
      { sender: "Exportadora Lima SAC", message: "Hola Luis, ¿cómo estás?", time: "10:30 AM", isOwn: false },
      { sender: "Luis", message: "¡Hola! Todo bien, gracias por preguntar", time: "10:32 AM", isOwn: true },
      {
        sender: "Exportadora Lima SAC",
        message: "¿Tienes disponible el lote Geisha? Necesitamos 500kg",
        time: "10:35 AM",
        isOwn: false,
      },
      {
        sender: "Luis",
        message: "Sí, tengo disponible. Es de excelente calidad, 87 puntos SCA",
        time: "10:40 AM",
        isOwn: true,
      },
      { sender: "Exportadora Lima SAC", message: "Perfecto, ¿cuál es el precio?", time: "10:42 AM", isOwn: false },
      { sender: "Luis", message: "S/ 45 por kg. Incluye certificación orgánica", time: "10:45 AM", isOwn: true },
    ],
    2: [
      {
        sender: "Coffee Traders Inc.",
        message: "Luis, el último lote fue increíble",
        time: "Ayer 3:20 PM",
        isOwn: false,
      },
      { sender: "Luis", message: "¡Gracias! Me alegra que les haya gustado", time: "Ayer 3:25 PM", isOwn: true },
      {
        sender: "Coffee Traders Inc.",
        message: "Queremos hacer un pedido más grande",
        time: "Ayer 3:30 PM",
        isOwn: false,
      },
      { sender: "Luis", message: "Excelente, ¿qué cantidad necesitan?", time: "Ayer 3:35 PM", isOwn: true },
    ],
    3: [
      {
        sender: "Specialty Coffee Co.",
        message: "Hola, vi tu perfil en KAWAI GUARDIAN",
        time: "2 días 2:15 PM",
        isOwn: false,
      },
      { sender: "Luis", message: "¡Hola! Gracias por contactarme", time: "2 días 2:20 PM", isOwn: true },
      {
        sender: "Specialty Coffee Co.",
        message: "¿Cuál es el precio por kg del Bourbon?",
        time: "2 días 2:25 PM",
        isOwn: false,
      },
    ],
    5: [
      {
        sender: "Luis Exportador",
        message: "Hola Don Pedro, ¿tiene certificación orgánica?",
        time: "11:15 AM",
        isOwn: false,
      },
      {
        sender: "Don Pedro",
        message: "Sí, está en blockchain.",
        time: "11:18 AM",
        isOwn: true,
        hasButton: true,
        buttonText: "📄 Ver Certificación",
        buttonAction: "viewCertification"
      },
      {
        sender: "Luis Exportador",
        message: "Excelente, confirmo compra de 50 kg.",
        time: "11:22 AM",
        isOwn: false,
      },
      {
        sender: "Don Pedro",
        message: "📸 Foto del grano recién procesado",
        time: "11:25 AM",
        isOwn: true,
        hasImage: true,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzaX3VpPyalxrvGLDlGZ1AoukffXZhgYofQ&s",
        imageAlt: "Granos de café procesados"
      },
      {
        sender: "Luis Exportador",
        message: "Se ve excelente la calidad. Procedo con el pago.",
        time: "11:30 AM",
        isOwn: false,
        hasButton: true,
        buttonText: "🛒 Confirmar compra",
        buttonAction: "confirmPurchase"
      },
      {
        sender: "Sistema",
        message: "✨ ¡Felicidades! Lote #001 vendido a Luis Exportador. Pago confirmado.",
        time: "12:30 PM",
        isOwn: true,
        isSystemMessage: true,
        hasButton: true,
        buttonText: "📊 Ver mis ingresos",
        buttonAction: "viewEarnings"
      },
      {
        sender: "Luis Exportador",
        message: "Compra confirmada. Café de San Ignacio, Cajamarca ☕ 🚚 Envío coordinado.",
        time: "12:32 PM",
        isOwn: false,
      },
    ],
  }

  useEffect(() => {
    const savedProfile = localStorage.getItem("kawai-profile")
    const savedMembership = localStorage.getItem("kawai-membership")
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }
    if (savedMembership) {
      setCurrentMembership(savedMembership)
    }
  }, [])

  const updateProfile = (field: keyof ProfileData, value: string | string[]) => {
    const newProfile = { ...profileData, [field]: value }
    setProfileData(newProfile)
    localStorage.setItem("kawai-profile", JSON.stringify(newProfile))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Aquí se agregaría la lógica para enviar el mensaje
      setNewMessage("")
    }
  }

  const handleChatAction = (action: string) => {
    switch (action) {
      case "viewCertification":
        alert("🔍 Mostrando certificación orgánica en blockchain...")
        break
      case "confirmPurchase":
        alert("🛒 Procesando compra de 50kg...")
        break
      case "viewEarnings":
        alert("📊 Mostrando reporte de ingresos...")
        break
      default:
        break
    }
  }

  const handleUpgradePlan = (planName: string) => {
    setSelectedPlan(planName)
    setShowPaymentModal(true)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method)
    setShowPaymentForm(true)
  }

  const handleAccountSelect = (account: any) => {
    setSelectedAccount(account)
  }

  const processPaymentWithAccount = () => {
    setIsProcessing(true)

    // Simular procesamiento de pago con animación
    setTimeout(() => {
      setIsProcessing(false)
      setShowPaymentModal(false)
      setShowPaymentForm(false)
      setShowSuccessModal(true)

      // Actualizar membresía
      setCurrentMembership(selectedPlan)
      localStorage.setItem("kawai-membership", selectedPlan)

      // Cerrar modal de éxito después de 3 segundos
      setTimeout(() => {
        setShowSuccessModal(false)
        setPaymentMethod("")
        setSelectedAccount(null)
      }, 3000)
    }, 2500)
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-200 shadow-lg">
          <img
            src="/profile-pedro.jpg" 
            alt="Pedro Huamán"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-user.jpg"
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-amber-900">{profileData.name}</h3>
        <p className="text-amber-700">{profileData.role}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Nombre completo</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => updateProfile("name", e.target.value)}
            className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => updateProfile("email", e.target.value)}
            className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Teléfono</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => updateProfile("phone", e.target.value)}
            className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">Experiencia</label>
            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-800">{profileData.experience}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">Producción anual</label>
            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <Package className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-800">{profileData.production}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Certificaciones</label>
          <div className="flex flex-wrap gap-2">
            {profileData.certifications.map((cert, index) => (
              <span
                key={index}
                className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                <Award className="w-4 h-4 mr-1" />
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Historia</label>
          <textarea
            value={profileData.story}
            onChange={(e) => updateProfile("story", e.target.value)}
            rows={3}
            className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderMembershipTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-amber-900">Planes de Suscripción</h3>
        <div className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full inline-block">
          <span className="text-sm font-medium text-amber-800">Plan Actual: {currentMembership}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Plan Gratuito */}
        <div
          className={`border-2 rounded-lg p-4 ${currentMembership === "Gratuito" ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-gray-50"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-gray-700">Gratuito</h4>
            <span className="text-2xl font-bold text-gray-600">S/ 0</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-gray-400" />3 lotes máximo
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-gray-400" />
              QR básico
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-gray-400" />
              Soporte por email
            </li>
          </ul>
          {currentMembership === "Gratuito" ? (
            <button className="w-full mt-4 py-2 bg-amber-500 text-white rounded-lg font-medium">Plan Actual</button>
          ) : (
            <button
              onClick={() => handleUpgradePlan("Gratuito")}
              className="w-full mt-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium"
            >
              Cambiar a Gratuito
            </button>
          )}
        </div>

        {/* Plan Pro */}
        <div
          className={`border-2 rounded-lg p-4 ${currentMembership === "Pro" ? "border-amber-500 bg-amber-100" : "border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-amber-800">Pro</h4>
            <div className="text-right">
              <span className="text-2xl font-bold text-amber-700">S/ 29</span>
              <span className="text-sm text-amber-600">/mes</span>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Lotes ilimitados
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Trazabilidad multimedia
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Alertas climáticas
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Soporte prioritario
            </li>
          </ul>
          {currentMembership === "Pro" ? (
            <button className="w-full mt-4 py-2 bg-amber-500 text-white rounded-lg font-medium">Plan Actual</button>
          ) : (
            <button
              onClick={() => handleUpgradePlan("Pro")}
              className="w-full mt-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Actualizar a Pro
            </button>
          )}
        </div>

        {/* Plan Exportador */}
        <div
          className={`border-2 rounded-lg p-4 ${currentMembership === "Exportador" ? "border-purple-500 bg-purple-100" : "border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h4 className="text-lg font-bold text-purple-800">Exportador</h4>
              <Crown className="w-5 h-5 ml-2 text-purple-600" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-700">S/ 79</span>
              <span className="text-sm text-purple-600">/mes</span>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-purple-700">
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-purple-500" />
              Todo lo del plan Pro
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-purple-500" />
              Compradores internacionales
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-purple-500" />
              Analítica avanzada
            </li>
            <li className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-purple-500" />
              Gestor de cuenta dedicado
            </li>
          </ul>
          {currentMembership === "Exportador" ? (
            <button className="w-full mt-4 py-2 bg-purple-500 text-white rounded-lg font-medium">Plan Actual</button>
          ) : (
            <button
              onClick={() => handleUpgradePlan("Exportador")}
              className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Actualizar a Exportador
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderChatTab = () => (
    <div className="h-full flex flex-col space-y-4">
      <h3 className="text-xl font-bold text-amber-900 text-center">Chats con Clientes</h3>

      {/* Lista de Contactos */}
      <div className="bg-white rounded-lg border border-amber-200 max-h-48 overflow-y-auto">
        <div className="p-3 border-b border-amber-100">
          <h4 className="font-semibold text-amber-800 text-sm">Conversaciones Activas</h4>
        </div>
        <div className="divide-y divide-amber-100">
          {chatContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`w-full p-3 flex items-center space-x-3 hover:bg-amber-50 transition-colors ${
                selectedChat === contact.id ? "bg-amber-100" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{contact.avatar}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-amber-900 text-sm">{contact.name}</h5>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{contact.time}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversación Activa */}
      <div className="flex-1 bg-white rounded-lg border border-amber-200 flex flex-col">
        <div className="p-3 border-b border-amber-100 bg-amber-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {chatContacts.find((c) => c.id === selectedChat)?.avatar}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 text-sm">
                {chatContacts.find((c) => c.id === selectedChat)?.name}
              </h4>
              <p className="text-xs text-green-600">
                {chatContacts.find((c) => c.id === selectedChat)?.status === "online" ? "En línea" : "Desconectado"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-3 min-h-[200px]">
          {(chatConversations[selectedChat as keyof typeof chatConversations] || []).map((msg, index) => (
            <div key={index} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  msg.isSystemMessage
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-lg border border-green-300"
                    : msg.isOwn 
                    ? "bg-amber-600 text-white rounded-br-sm" 
                    : "bg-gray-200 text-gray-800 rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                
                {/* Imagen si existe */}
                {msg.hasImage && (
                  <div className="mt-2">
                    <img
                      src={msg.imageUrl}
                      alt={msg.imageAlt || "Imagen"}
                      className="w-full max-w-[200px] h-auto rounded-lg border shadow-sm"
                    />
                  </div>
                )}
                
                {/* Botón si existe */}
                {msg.hasButton && msg.buttonAction && (
                  <button
                    onClick={() => handleChatAction(msg.buttonAction!)}
                    className={`mt-2 px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                      msg.isSystemMessage
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : msg.isOwn
                        ? "bg-white text-amber-600 hover:bg-amber-50"
                        : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
                  >
                    {msg.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-amber-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-amber-900 text-center">Configuración y Soporte</h3>

      <div className="space-y-4">
        {/* Idioma */}
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-amber-600 mr-3" />
              <span className="font-medium text-amber-800">Idioma</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border border-amber-200 rounded focus:ring-2 focus:ring-amber-500"
            >
              <option value="Español">Español</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-amber-600 mr-3" />
              <span className="font-medium text-amber-800">Notificaciones</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-amber-600" : "bg-gray-300"}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Centro de Ayuda */}
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 text-amber-600 mr-3" />
              <span className="font-medium text-amber-800">Centro de Ayuda</span>
            </div>
            <button className="text-amber-600 hover:text-amber-700">Abrir</button>
          </div>
        </div>

        {/* Chat en Vivo */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 rounded-lg border border-amber-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-amber-700 mr-3" />
              <div>
                <span className="font-medium text-amber-800 block">Chat en Vivo</span>
                <span className="text-xs text-amber-600">Con técnico agrícola (Premium)</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors">
              Contactar
            </button>
          </div>
        </div>

        {/* Información de la App */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Información de la App</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Versión: 1.2.3</p>
            <p>Última actualización: 15 Dic 2024</p>
            <p>Términos y Condiciones</p>
            <p>Política de Privacidad</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Tabs Navigation */}
      <div className="flex border-b border-amber-200 bg-white">
        {[
          { id: "profile", label: "Perfil", icon: User },
          { id: "membership", label: "Membresía", icon: Crown },
          { id: "chat", label: "Chat", icon: MessageCircle },
          { id: "settings", label: "Ajustes", icon: Settings },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === id
                ? "text-amber-600 border-b-2 border-amber-600 bg-amber-50"
                : "text-gray-500 hover:text-amber-500"
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content - Optimizando altura del contenedor para mejor visualización */}
      <div
        className="flex-1 overflow-y-auto bg-gradient-to-b from-amber-50 to-white"
        style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
      >
        <div className="p-4 pb-8">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "membership" && renderMembershipTab()}
          {activeTab === "chat" && renderChatTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm transform transition-all duration-300 scale-100 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4 text-center">Actualizar a {selectedPlan}</h3>

              {!showPaymentForm ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4 text-center">Selecciona método de pago:</p>
                    <div className="space-y-3">
                      {/* Yape */}
                      <button
                        onClick={() => handlePaymentMethodSelect("yape")}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl flex items-center space-x-4 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 transform hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg font-bold">Y</span>
                        </div>
                        <div className="text-left flex-1">
                          <span className="font-semibold text-gray-800 block">Yape</span>
                          <span className="text-sm text-purple-600">Pago móvil instantáneo</span>
                        </div>
                        <div className="text-purple-600">→</div>
                      </button>

                      {/* Google Pay */}
                      <button
                        onClick={() => handlePaymentMethodSelect("googlepay")}
                        className="w-full p-4 border-2 border-blue-200 rounded-xl flex items-center space-x-4 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg font-bold">G</span>
                        </div>
                        <div className="text-left flex-1">
                          <span className="font-semibold text-gray-800 block">Google Pay</span>
                          <span className="text-sm text-blue-600">Pago con Google</span>
                        </div>
                        <div className="text-blue-600">→</div>
                      </button>

                      {/* Tarjeta */}
                      <button
                        onClick={() => handlePaymentMethodSelect("card")}
                        className="w-full p-4 border-2 border-green-200 rounded-xl flex items-center space-x-4 hover:border-green-400 hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg">💳</span>
                        </div>
                        <div className="text-left flex-1">
                          <span className="font-semibold text-gray-800 block">Tarjeta</span>
                          <span className="text-sm text-green-600">Visa, Mastercard</span>
                        </div>
                        <div className="text-green-600">→</div>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <button
                        onClick={() => setShowPaymentForm(false)}
                        className="text-amber-600 hover:text-amber-700 mr-3 text-xl"
                      >
                        ←
                      </button>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {paymentMethod === "yape" && "Cuentas Yape"}
                        {paymentMethod === "googlepay" && "Cuentas Google Pay"}
                        {paymentMethod === "card" && "Tarjetas Guardadas"}
                      </h4>
                    </div>

                    <div className="space-y-3 mb-6">
                      {paymentMethod === "yape" &&
                        predefinedAccounts.yape.map((account) => (
                          <button
                            key={account.id}
                            onClick={() => handleAccountSelect(account)}
                            className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                              selectedAccount?.id === account.id
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-800">{account.name}</p>
                                <p className="text-sm text-purple-600">{account.number}</p>
                              </div>
                              {account.isDefault && (
                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Principal
                                </span>
                              )}
                            </div>
                          </button>
                        ))}

                      {paymentMethod === "googlepay" &&
                        predefinedAccounts.googlepay.map((account) => (
                          <button
                            key={account.id}
                            onClick={() => handleAccountSelect(account)}
                            className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                              selectedAccount?.id === account.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-800">Google Pay</p>
                                <p className="text-sm text-blue-600">{account.email}</p>
                              </div>
                              {account.isDefault && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Principal
                                </span>
                              )}
                            </div>
                          </button>
                        ))}

                      {paymentMethod === "card" &&
                        predefinedAccounts.card.map((account) => (
                          <button
                            key={account.id}
                            onClick={() => handleAccountSelect(account)}
                            className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                              selectedAccount?.id === account.id
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-green-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-800">{account.name}</p>
                                <p className="text-sm text-green-600">{account.number}</p>
                              </div>
                              {account.isDefault && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Principal
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                    </div>

                    {selectedAccount && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-amber-800 text-center">
                          <span className="font-semibold">Pagar con:</span>{" "}
                          {paymentMethod === "yape" && `${selectedAccount.name} - ${selectedAccount.number}`}
                          {paymentMethod === "googlepay" && selectedAccount.email}
                          {paymentMethod === "card" && selectedAccount.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={processPaymentWithAccount}
                      disabled={!selectedAccount || isProcessing}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                        !selectedAccount
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isProcessing
                            ? "bg-amber-400 text-white cursor-not-allowed"
                            : "bg-amber-600 text-white hover:bg-amber-700 transform hover:scale-105"
                      }`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Procesando...
                        </div>
                      ) : (
                        "Pagar Ahora"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-[90%] text-center transform animate-pulse">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-2">¡Pago Exitoso!</h3>
            <p className="text-gray-600 mb-4">
              Ahora eres miembro <span className="font-bold text-amber-600">{selectedPlan}</span>
            </p>
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-3 rounded-lg">
              <p className="text-sm text-amber-800">Disfruta de todos los beneficios de tu nueva membresía</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
