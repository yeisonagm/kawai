"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Coffee,
  Leaf,
  MapPin,
  Plus,
  ArrowLeft,
  Bell,
  Settings,
  Bug,
  CloudRain,
  Mountain,
  X,
  Star,
  TrendingUp,
  AlertTriangle,
  Cloud,
  Package,
  ShoppingCart,
  Globe,
  DollarSign,
  CheckCircle,
  Store,
  Home,
  Trash2,
  MessageCircle,
  Send,
} from "lucide-react"
import { dashboardCards } from "@/lib/data"
import { lots, marketData } from "@/lib/data"
import ProfileSettings from "@/components/profile-settings"
import LotDetail from "@/components/lot-detail"
import InteractiveMap from "@/components/interactive-map"
import PhoneFrame from "@/components/phone-frame"

type Screen =
  | "welcome"
  | "register"
  | "dashboard"
  | "lots"
  | "market"
  | "profile"
  | "add-lot"
  | "notifications"
  | "lot-detail"
  | "login"
  | "map"
  | "settings"
  | "location"

const notificationsData = [
  {
    id: 1,
    type: "clima",
    title: "Alerta Climática",
    message: "Posibles lluvias intensas en las próximas 48 horas",
    time: "Hace 2 horas",
    icon: <CloudRain className="h-4 w-4 text-blue-500" />,
    read: false,
    color: "border-blue-500",
  },
  {
    id: 2,
    type: "plaga",
    title: "Detección de Plagas",
    message: "Broca del café detectada en Lote CAT-123-2024",
    time: "Hace 4 horas",
    icon: <Bug className="h-4 w-4 text-red-500" />,
    read: false,
    color: "border-red-500",
  },
  {
    id: 3,
    type: "catastrofe",
    title: "Alerta de Heladas",
    message: "Temperaturas bajo 0°C esperadas esta madrugada",
    time: "Hace 6 horas",
    icon: <Mountain className="h-4 w-4 text-orange-500" />,
    read: true,
    color: "border-orange-500",
  },
  {
    id: 4,
    type: "clima",
    title: "Condiciones Favorables",
    message: "Clima ideal para cosecha en los próximos 3 días",
    time: "Hace 1 día",
    icon: <CloudRain className="h-4 w-4 text-green-500" />,
    read: true,
    color: "border-green-500",
  },
  {
    id: 5,
    type: "plaga",
    title: "Tratamiento Recomendado",
    message: "Aplicar fungicida preventivo en Lote BOU-456-2024",
    time: "Hace 2 días",
    icon: <Bug className="h-4 w-4 text-yellow-500" />,
    read: true,
    color: "border-yellow-500",
  },
  {
    id: 6,
    type: "pedido",
    title: "Nuevo Pedido",
    message: "Has recibido un nuevo pedido de Lote CAT-123-2024",
    time: "Hace 3 días",
    icon: <Package className="h-4 w-4 text-green-500" />,
    read: false,
    color: "border-green-500",
  },
  {
    id: 7,
    type: "confirmacion",
    title: "Confirmación de Pedido",
    message: "Tu pedido de Lote BOU-456-2024 ha sido confirmado",
    time: "Hace 5 días",
    icon: <CheckCircle className="h-4 w-4 text-purple-500" />,
    read: true,
    color: "border-purple-500",
  },
]

const salesDataByYear = {
  2020: [
    { month: "Ene", sales: 2000 },
    { month: "Feb", sales: 2200 },
    { month: "Mar", sales: 2100 },
    { month: "Abr", sales: 2300 },
    { month: "May", sales: 2400 },
    { month: "Jun", sales: 2500 },
    { month: "Jul", sales: 2600 },
    { month: "Ago", sales: 2700 },
    { month: "Sep", sales: 2800 },
    { month: "Oct", sales: 2900 },
    { month: "Nov", sales: 3000 },
    { month: "Dic", sales: 3100 },
  ],
  2021: [
    { month: "Ene", sales: 2100 },
    { month: "Feb", sales: 2300 },
    { month: "Mar", sales: 2200 },
    { month: "Abr", sales: 2400 },
    { month: "May", sales: 2500 },
    { month: "Jun", sales: 2600 },
    { month: "Jul", sales: 2700 },
    { month: "Ago", sales: 2800 },
    { month: "Sep", sales: 2900 },
    { month: "Oct", sales: 3000 },
    { month: "Nov", sales: 3100 },
    { month: "Dic", sales: 3200 },
  ],
  2022: [
    { month: "Ene", sales: 2200 },
    { month: "Feb", sales: 2400 },
    { month: "Mar", sales: 2300 },
    { month: "Abr", sales: 2500 },
    { month: "May", sales: 2600 },
    { month: "Jun", sales: 2700 },
    { month: "Jul", sales: 2800 },
    { month: "Ago", sales: 2900 },
    { month: "Sep", sales: 3000 },
    { month: "Oct", sales: 3100 },
    { month: "Nov", sales: 3200 },
    { month: "Dic", sales: 3300 },
  ],
  2023: [
    { month: "Ene", sales: 2300 },
    { month: "Feb", sales: 2500 },
    { month: "Mar", sales: 2400 },
    { month: "Abr", sales: 2600 },
    { month: "May", sales: 2700 },
    { month: "Jun", sales: 2800 },
    { month: "Jul", sales: 2900 },
    { month: "Ago", sales: 3000 },
    { month: "Sep", sales: 3100 },
    { month: "Oct", sales: 3200 },
    { month: "Nov", sales: 3300 },
    { month: "Dic", sales: 3400 },
  ],
  2024: [
    { month: "Ene", sales: 2400 },
    { month: "Feb", sales: 2600 },
    { month: "Mar", sales: 2500 },
    { month: "Abr", sales: 2700 },
    { month: "May", sales: 2800 },
    { month: "Jun", sales: 2900 },
    { month: "Jul", sales: 3000 },
    { month: "Ago", sales: 3100 },
    { month: "Sep", sales: 3200 },
    { month: "Oct", sales: 3300 },
    { month: "Nov", sales: 3400 },
    { month: "Dic", sales: 3500 },
  ],
}

export default function KawaiGuardian() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  })
  const [savedData, setSavedData] = useState<any[]>([])
  const [userLots, setUserLots] = useState(lots)
  const [newLot, setNewLot] = useState({
    variety: "",
    farm: "",
    altitude: "",
    stock: "",
    price: "",
  })
  const [showNewLotAnimation, setShowNewLotAnimation] = useState(false)
  const [notifications, setNotifications] = useState(notificationsData)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedProducer, setSelectedProducer] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Pedro Huamán",
    phone: "+51 987 654 321",
    email: "pedro.huaman@correo.com",
    role: "caficultor",
  })
  const [selectedLot, setSelectedLot] = useState<any | null>(null)
  const [userData, setUserData] = useState({
    name: "Pedro Huamán",
    email: "pedro.huaman@correo.com",
    phone: "+51 987 654 321",
  })
  const [showAddLot, setShowAddLot] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedYear, setSelectedYear] = useState(2024)

  const [cart, setCart] = useState<any[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [cartNotification, setCartNotification] = useState("")

  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hola 👋 soy KAWAI ASSIST, tu asistente digital. ¿Quieres ayuda en técnicas agrícolas, trazabilidad o contactos de mercado?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const stored = localStorage.getItem("kawai-guardian-data")
    if (stored) {
      setSavedData(JSON.parse(stored))
    }

    const storedLots = localStorage.getItem("kawai-guardian-lots")
    if (storedLots) {
      setUserLots(JSON.parse(storedLots))
    }

    const storedNotifications = localStorage.getItem("kawai-guardian-notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }

    const storedProfile = localStorage.getItem("kawai_user_profile")
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % dashboardCards.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const saveToStorage = (data: any) => {
    const newData = [...savedData, { ...data, id: Date.now() }]
    setSavedData(newData)
    localStorage.setItem("kawai-guardian-data", JSON.stringify(newData))
  }

  const saveLot = (lot: any) => {
    const newLotData = {
      ...lot,
      id: Date.now(),
      code: `${lot.variety.substring(0, 3).toUpperCase()}-${String(Date.now()).slice(-3)}-2024`,
      maturation: Math.floor(Math.random() * 40) + 60, // 60-100%
      priceInSoles: Number.parseFloat(lot.price) * 3.7, // Conversión aproximada USD a PEN
      certifications: ["Orgánico"],
      alerts: Math.random() > 0.7 ? 1 : 0,
      alertType:
        Math.random() > 0.7
          ? ["clima", "plaga", "catastrofe", "pedido", "confirmacion"][Math.floor(Math.random() * 5)]
          : null,
      alertMessage: Math.random() > 0.7 ? "Nueva alerta detectada" : null,
    }

    const updatedLots = [newLotData, ...userLots]
    setUserLots(updatedLots)
    localStorage.setItem("kawai-guardian-lots", JSON.stringify(updatedLots))

    // Animación de nuevo lote
    setShowNewLotAnimation(true)
    setTimeout(() => setShowNewLotAnimation(false), 2000)
  }

  const updateProfile = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    localStorage.setItem("kawai-guardian-profile", JSON.stringify(updatedData))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNewLotChange = (field: string, value: string) => {
    setNewLot((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = () => {
    console.log("[v0] Registro completado:", formData)
    saveToStorage(formData)
    setCurrentScreen("dashboard")
  }

  const handleLogin = () => {
    // Simulación de login - en producción validaría credenciales
    console.log("[v0] Login completado")
    setCurrentScreen("dashboard")
  }

  const handleAddLot = () => {
    if (newLot.variety && newLot.farm && newLot.altitude && newLot.stock && newLot.price) {
      saveLot(newLot)
      setNewLot({ variety: "", farm: "", altitude: "", stock: "", price: "" })
      setCurrentScreen("lots")
    }
  }

  const getAlertIcon = (alertType: string | null) => {
    switch (alertType) {
      case "clima":
        return <CloudRain className="h-3 w-3 text-blue-500" />
      case "plaga":
        return <Bug className="h-3 w-3 text-red-500" />
      case "catastrofe":
        return <Mountain className="h-3 w-3 text-orange-500" />
      case "pedido":
        return <Package className="h-3 w-3 text-green-500" />
      case "confirmacion":
        return <CheckCircle className="h-3 w-3 text-purple-500" />
      default:
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />
    }
  }

  const openContactModal = (producer) => {
    setSelectedProducer(producer)
    setShowContactModal(true)
  }

  const addToCart = (producer: any) => {
    const cartItem = {
      id: Date.now(),
      producer: producer.producer,
      coffee: producer.coffee,
      price: producer.price,
      quantity: 1,
      image: producer.image,
    }
    const updatedCart = [...cart, cartItem]
    setCart(updatedCart)
    localStorage.setItem("kawai-guardian-cart", JSON.stringify(updatedCart))

    // Mostrar notificación visual
    setCartNotification(`${producer.coffee} agregado al carrito`)
    setTimeout(() => setCartNotification(""), 3000)
  }

  const handleCheckout = () => {
    setShowCart(false)
    setShowCheckout(true)
  }

  const confirmOrder = () => {
    setShowCheckout(false)
    setOrderConfirmed(true)
    setCart([])
    localStorage.removeItem("kawai-guardian-cart")
    setTimeout(() => setOrderConfirmed(false), 5000)
  }

  const getCoffeeIcon = (coffeeType: string) => {
    const icons = {
      Geisha: "☕",
      Bourbon: "🫘",
      Caturra: "🌰",
      Typica: "🫘",
      Pacamara: "☕",
      default: "☕",
    }
    return icons[coffeeType] || icons.default
  }

  const sendQuote = (type) => {
    alert(`Cotización ${type} enviada a ${selectedProducer?.producer}`)
    setShowContactModal(false)
  }

  const AppHeader = ({ title, subtitle, showBack = false, onBack }: any) => (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 pt-8 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-3">
            <Coffee className="h-6 w-6" />
            <div>
              <h1 className="text-lg font-bold">{title}</h1>
              <p className="text-xs opacity-90">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-2 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter((n) => !n.read).length}
              </div>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-2"
            onClick={() => setCurrentScreen("profile")}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b bg-amber-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-800">Notificaciones</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="text-amber-600 hover:bg-amber-100 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notif.color} ${!notif.read ? "bg-blue-50/30" : ""}`}
                onClick={() => markNotificationAsRead(notif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {notif.type === "clima" && <CloudRain className="h-4 w-4 text-blue-500" />}
                      {notif.type === "plaga" && <Bug className="h-4 w-4 text-red-500" />}
                      {notif.type === "catastrofe" && <Mountain className="h-4 w-4 text-orange-500" />}
                      {notif.type === "pedido" && <Package className="h-4 w-4 text-green-500" />}
                      {notif.type === "confirmacion" && <CheckCircle className="h-4 w-4 text-purple-500" />}
                      <h4 className="font-medium text-gray-900 text-sm">{notif.title}</h4>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const updateNotifications = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === String(id) ? { ...notif, read: true } : notif)))
  }

  const showLotDetail = (lot: any) => {
    setSelectedLot(lot)
    setCurrentScreen("lot-detail")
  }

  const markNotificationAsRead = (id: number) => {
    const updatedNotifications = notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    setNotifications(updatedNotifications)
    localStorage.setItem("kawai_notifications", JSON.stringify(updatedNotifications))
  }

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

    if (lowerInput.includes("técnica") || lowerInput.includes("cultivo") || lowerInput.includes("plaga")) {
      return "🌱 Para técnicas agrícolas, te recomiendo revisar la sección de Lotes donde encontrarás alertas específicas sobre plagas y condiciones climáticas. También puedes contactar a nuestros técnicos especializados."
    } else if (lowerInput.includes("trazabilidad") || lowerInput.includes("qr") || lowerInput.includes("código")) {
      return "📱 La trazabilidad se maneja desde cada lote individual. Puedes generar códigos QR únicos para cada producción y compartir la información completa con tus compradores."
    } else if (lowerInput.includes("mercado") || lowerInput.includes("venta") || lowerInput.includes("precio")) {
      return "💰 En la sección Mercado encontrarás productores verificados, precios actualizados y podrás contactar directamente con compradores. Los precios se actualizan diariamente."
    } else if (lowerInput.includes("contacto") || lowerInput.includes("ayuda") || lowerInput.includes("soporte")) {
      return "📞 Para soporte técnico, puedes usar el chat integrado en cada perfil de productor o contactar a nuestro equipo desde Configuración > Centro de Ayuda."
    } else {
      return "🤖 Puedo ayudarte con: técnicas agrícolas 🌱, trazabilidad de productos 📱, información de mercado 💰, y contactos comerciales 📞. ¿Sobre qué tema específico necesitas ayuda?"
    }
  }

  // Pantalla de bienvenida
  if (currentScreen === "welcome") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coffee className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">KAWAI GUARDIAN</h1>
            </div>
            <p className="text-amber-100 text-sm">"Cultivando el futuro del café"</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <img
                src="kawai-guardian.jpg"
                alt="Caficultor sonriendo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={() => setCurrentScreen("login")}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setCurrentScreen("register")}
                className="w-full border-2 border-amber-600 text-amber-700 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all duration-300"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    )
  }

  // Pantalla de login
  if (currentScreen === "login") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coffee className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">KAWAI GUARDIAN</h1>
            </div>
            <p className="text-amber-100 text-sm">Iniciar Sesión</p>
          </div>

          <div className="flex-1 flex flex-col justify-center p-6 space-y-6">
            <div className="flex justify-center mb-6">
              <img
                src="kawai-guardian.jpg"
                alt="KAWAI GUARDIAN Logo"
                className="w-24 h-24 rounded-2xl shadow-lg border-4 border-white"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-4 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full p-4 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setCurrentScreen("welcome")}
                className="w-full border-2 border-amber-600 text-amber-700 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all duration-300"
              >
                Volver
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentScreen("register")}
                className="text-amber-600 hover:text-amber-800 text-sm font-medium"
              >
                ¿No tienes cuenta? Regístrate aquí
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    )
  }

  // Dashboard principal
  if (currentScreen === "dashboard") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">KAWAI GUARDIAN</h1>
                <p className="text-xs opacity-90">Bienvenido, {userData.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentScreen("settings")}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            {showNotifications && (
              <div className="absolute top-16 left-4 right-4 bg-white rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notificaciones</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${!notif.read ? "bg-blue-50" : ""}`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-1 rounded-full ${
                            notif.type === "clima"
                              ? "bg-blue-100"
                              : notif.type === "plaga"
                                ? "bg-red-100"
                                : notif.type === "catastrofe"
                                  ? "bg-orange-100"
                                  : notif.type === "pedido"
                                    ? "bg-green-100"
                                    : "bg-purple-100"
                          }`}
                        >
                          {notif.type === "clima" && <Cloud className="w-4 h-4 text-blue-600" />}
                          {notif.type === "plaga" && <Bug className="w-4 h-4 text-red-600" />}
                          {notif.type === "catastrofe" && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                          {notif.type === "pedido" && <Package className="w-4 h-4 text-green-600" />}
                          {notif.type === "confirmacion" && <CheckCircle className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                          <p className="text-xs text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-amber-50/80 to-orange-50/80">
              <div className="mb-6">
                <div className="relative">
                  <div className="overflow-hidden rounded-xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
                    >
                      {dashboardCards.map((card, index) => (
                        <div key={card.id} className="w-full flex-shrink-0 px-1">
                          <div
                            className={`p-4 rounded-xl shadow-lg backdrop-blur-sm bg-gradient-to-r ${
                              card.color === "red"
                                ? "from-red-500/90 to-red-600/90"
                                : card.color === "blue"
                                  ? "from-blue-500/90 to-blue-600/90"
                                  : card.color === "green"
                                    ? "from-green-500/90 to-green-600/90"
                                    : "from-purple-500/90 to-purple-600/90"
                            } text-white border border-white/20`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-sm">{card.title}</h3>
                              {card.icon === "alert" && <AlertTriangle className="w-5 h-5" />}
                              {card.icon === "weather" && <Cloud className="w-5 h-5" />}
                              {card.icon === "trend" && <TrendingUp className="w-5 h-5" />}
                              {card.icon === "export" && <Globe className="w-5 h-5" />}
                            </div>
                            <p className="text-xl font-bold mb-1">{card.value}</p>
                            <p className="text-xs opacity-90">{card.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-3 space-x-2">
                    {dashboardCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentCardIndex ? "bg-amber-600" : "bg-amber-300/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-100/70 to-orange-100/70 backdrop-blur-sm border border-amber-200/50 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Coffee className="w-5 h-5 text-amber-700" />
                    <span className="text-xs text-amber-600 font-medium">ACTIVOS</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-amber-600">{userLots.length} lotes activos</span>
                      <span className="text-sm font-bold text-amber-800">
                        {userLots.reduce((sum, lot) => sum + lot.stock, 0).toLocaleString()} kg
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100/70 to-emerald-100/70 backdrop-blur-sm border border-green-200/50 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-green-700" />
                    <span className="text-xs text-green-600 font-medium">PRECIO</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-green-800">S/ 8.50/kg</span>
                    <div className="text-xs text-green-600">$2.30/kg</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-100/70 to-rose-100/70 backdrop-blur-sm border border-red-200/50 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-700" />
                    <span className="text-xs text-red-600 font-medium">ALERTAS</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-red-800">3 Activas</span>
                    <div className="text-xs text-red-600">Clima, Plagas</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-100/70 to-sky-100/70 backdrop-blur-sm border border-blue-200/50 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Globe className="w-5 h-5 text-blue-700" />
                    <span className="text-xs text-blue-600 font-medium">EXPORT</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-blue-800">2,450 kg</span>
                    <div className="text-xs text-blue-600">Este mes</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-amber-800">Tendencias de Ventas</h3>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="text-xs bg-white/80 border border-amber-200 rounded px-2 py-1 text-amber-700"
                  >
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                  </select>
                </div>
                <div className="h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120">
                    <defs>
                      <pattern id="grid" width="25" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 24" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <polyline
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                      points={salesDataByYear[selectedYear]
                        .map((data, index) => {
                          const x = index * 25 + 12.5
                          const y = 120 - (data.sales / 3000) * 100
                          return `${x},${y}`
                        })
                        .join(" ")}
                    />

                    {salesDataByYear[selectedYear].map((data, index) => {
                      const x = index * 25 + 12.5
                      const y = 120 - (data.sales / 3000) * 100
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#d97706"
                          className="hover:r-4 transition-all cursor-pointer"
                        >
                          <title>
                            {data.month}: {data.sales}kg
                          </title>
                        </circle>
                      )
                    })}
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-xs text-amber-600">
                    Promedio:{" "}
                    {Math.round(salesDataByYear[selectedYear].reduce((sum, data) => sum + data.sales, 0) / 12)}
                    kg/mes
                  </span>
                </div>
              </div>
            </div>
          </div>

          <NavigationMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
      </PhoneFrame>
    )
  }

  // Otras pantallas con sintaxis corregida
  if (currentScreen === "settings") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
          <AppHeader
            title="Configuración"
            subtitle="Ajustes y preferencias"
            showBack={true}
            onBack={() => setCurrentScreen("dashboard")}
          />
          <div className="flex-1 overflow-hidden">
            <ProfileSettings />
          </div>
          <NavigationMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
      </PhoneFrame>
    )
  }

  if (currentScreen === "lots") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Mis Lotes</h1>
              <button
                onClick={() => setShowAddLot(true)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
            <div className="space-y-4">
              {userLots.map((lot) => (
                <div
                  key={lot.id}
                  onClick={() => {
                    setSelectedLot(lot)
                    setCurrentScreen("lot-detail")
                  }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-white via-amber-50 to-orange-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-800 text-lg">{lot.variety}</h3>
                        <p className="text-sm text-gray-600">{lot.farm}</p>
                      </div>
                    </div>
                    {lot.alerts > 0 && (
                      <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full">
                        {getAlertIcon(lot.alertType)}
                        <span className="text-xs font-medium text-red-600">{lot.alerts}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-amber-50 rounded-lg">
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="font-bold text-amber-800">{lot.stock} kg</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-500">Maduración</p>
                      <p className="font-bold text-green-600">{lot.maturation}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-green-600">S/ {lot.priceInSoles?.toFixed(2)}/kg</p>
                      <p className="text-xs text-gray-500">${lot.price}/kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-amber-600">{lot.altitude}m</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {lot.certifications?.map((cert, index) => (
                          <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {lot.alertMessage && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-700">{lot.alertMessage}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <NavigationMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
      </PhoneFrame>
    )
  }

  if (currentScreen === "market") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Mercado</h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCart(true)}
                  className="relative bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
            <div className="space-y-4">
              {cartNotification && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
                  ✓ {cartNotification}
                </div>
              )}
              {marketData.map((producer) => (
                <div
                  key={producer.id}
                  className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-200/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{getCoffeeIcon(producer.coffee)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-amber-900 text-base">{producer.coffee}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < producer.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-amber-700 mb-1">{producer.producer}</p>
                      <p className="text-xs text-amber-600 mb-2">{producer.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-amber-600">Disponible: {producer.stock} kg</span>
                        <span className="text-xs text-amber-600">{producer.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {producer.certifications?.map((cert: string, idx: number) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <span className="text-lg font-bold text-amber-800">
                            S/ {(producer.price * 3.7).toFixed(2)}
                          </span>
                          <span className="text-xs text-amber-600 block">/kg</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(producer)
                          }}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center space-x-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Agregar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProducer(producer)
                      setShowContactModal(true)
                    }}
                    className="w-full mt-3 text-amber-600 hover:text-amber-800 text-xs font-medium border border-amber-200 rounded-lg py-2 hover:bg-amber-50 transition-all"
                  >
                    Ver detalles y contactar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <NavigationMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
      </PhoneFrame>
    )
  }

  if (currentScreen === "location") {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
            <h1 className="text-lg font-bold">Ubicación</h1>
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            <InteractiveMap />
          </div>

          <NavigationMenu currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
      </PhoneFrame>
    )
  }

  if (currentScreen === "lot-detail" && selectedLot) {
    return (
      <PhoneFrame>
        <LotDetail lot={selectedLot} onBack={() => setCurrentScreen("lots")} />
      </PhoneFrame>
    )
  }

  // Modales y pantallas adicionales con sintaxis corregida
  return (
    <PhoneFrame>
      {(currentScreen === "dashboard" ||
        currentScreen === "lots" ||
        currentScreen === "market" ||
        currentScreen === "location") && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-20 right-4 z-50 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-full shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-md h-96 flex flex-col">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">KAWAI ASSIST</h3>
                  <p className="text-amber-100 text-xs">Asistente Virtual</p>
                </div>
              </div>
              <button onClick={() => setShowChatbot(false)} className="text-white hover:text-amber-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.isBot ? "bg-amber-100 text-amber-800" : "bg-amber-600 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-orange-50">
        {showCart && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90%] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-amber-900">Carrito de Compras</h3>
                <button onClick={() => setShowCart(false)} className="text-amber-600 hover:text-amber-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.coffee}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-900">{item.coffee}</h4>
                          <p className="text-sm text-amber-600">{item.producer}</p>
                          <p className="text-sm font-bold text-green-600">S/ {(item.price * 3.7).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id)
                            setCart(updatedCart)
                            localStorage.setItem("kawai-guardian-cart", JSON.stringify(updatedCart))
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-bold text-amber-900">
                      <span>Total:</span>
                      <span>S/ {cart.reduce((total, item) => total + item.price * 3.7, 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    Proceder al Pago
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}

const NavigationMenu = ({ currentScreen, setCurrentScreen }: any) => (
  <div className="absolute bottom-2 left-0 right-0 flex justify-center px-4">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 px-6 py-3">
      <div className="flex items-center space-x-8">
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === "dashboard" ? "text-amber-600" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Inicio</span>
        </button>
        <button
          onClick={() => setCurrentScreen("lots")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === "lots" ? "text-amber-600" : "text-gray-500"
          }`}
        >
          <Package className="w-6 h-6" />
          <span className="text-xs font-medium">Lotes</span>
        </button>
        <button
          onClick={() => setCurrentScreen("market")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === "market" ? "text-amber-600" : "text-gray-500"
          }`}
        >
          <Store className="w-6 h-6" />
          <span className="text-xs font-medium">Mercado</span>
        </button>
        <button
          onClick={() => setCurrentScreen("location")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === "location" ? "text-amber-600" : "text-gray-500"
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs font-medium">Ubicación</span>
        </button>
      </div>
    </div>
  </div>
)
