"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, MessageCircle, Settings, Crown, Zap, Globe, Bell, HelpCircle, Phone } from "lucide-react"

interface ProfileTabsProps {
  userProfile: any
  onUpdateProfile: (profile: any) => void
}

export default function ProfileTabs({ userProfile, onUpdateProfile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [editingProfile, setEditingProfile] = useState(false)
  const [tempProfile, setTempProfile] = useState(userProfile)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("es")

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "membership", label: "Membresía", icon: CreditCard },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "settings", label: "Ajustes", icon: Settings },
  ]

  const handleSaveProfile = () => {
    onUpdateProfile(tempProfile)
    setEditingProfile(false)
  }

  const renderProfileTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-amber-800">Información Personal</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditingProfile(!editingProfile)}
          className="border-amber-200 text-amber-700 hover:bg-amber-50"
        >
          {editingProfile ? "Cancelar" : "Editar"}
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-amber-700">Nombre</label>
          {editingProfile ? (
            <Input
              value={tempProfile.name}
              onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
              className="mt-1"
            />
          ) : (
            <p className="text-amber-800 mt-1">{userProfile.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-amber-700">Email</label>
          {editingProfile ? (
            <Input
              value={tempProfile.email}
              onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
              className="mt-1"
            />
          ) : (
            <p className="text-amber-800 mt-1">{userProfile.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-amber-700">Teléfono</label>
          {editingProfile ? (
            <Input
              value={tempProfile.phone}
              onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
              className="mt-1"
            />
          ) : (
            <p className="text-amber-800 mt-1">{userProfile.phone}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-amber-700">Ubicación</label>
          {editingProfile ? (
            <Input
              value={tempProfile.location}
              onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
              className="mt-1"
            />
          ) : (
            <p className="text-amber-800 mt-1">{userProfile.location}</p>
          )}
        </div>
      </div>

      {editingProfile && (
        <Button onClick={handleSaveProfile} className="w-full bg-amber-600 hover:bg-amber-700">
          Guardar Cambios
        </Button>
      )}
    </div>
  )

  const renderMembershipTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-amber-800">Planes de Suscripción</h3>

      <div className="space-y-3">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Gratuito</h4>
                <p className="text-sm text-gray-600">3 lotes, QR básico</p>
              </div>
              <Badge variant="secondary">Actual</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Pro</h4>
                </div>
                <p className="text-sm text-amber-600">Lotes ilimitados, trazabilidad multimedia, alertas climáticas</p>
                <p className="text-lg font-bold text-amber-800 mt-1">S/ 29/mes</p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Actualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <h4 className="font-semibold text-purple-800">Exportador</h4>
                </div>
                <p className="text-sm text-purple-600">
                  Todo lo anterior + compradores internacionales + analítica avanzada
                </p>
                <p className="text-lg font-bold text-purple-800 mt-1">S/ 79/mes</p>
              </div>
              <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 bg-transparent">
                Actualizar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderChatTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-amber-800">Chat con Clientes</h3>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
        <div className="flex justify-start">
          <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
            <p className="text-sm">Hola, estoy interesado en su lote Geisha, ¿podría enviarme una muestra?</p>
            <span className="text-xs opacity-75">Comprador - 10:30 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-amber-600 text-white p-2 rounded-lg max-w-xs">
            <p className="text-sm">¡Por supuesto! Puedo enviar 500g esta semana. El costo de envío es S/15.</p>
            <span className="text-xs opacity-75">Tú - 10:35 AM</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
            <p className="text-sm">Perfecto, ¿cuál es el precio por kg para pedidos de 50kg?</p>
            <span className="text-xs opacity-75">Comprador - 10:40 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-amber-600 text-white p-2 rounded-lg max-w-xs">
            <p className="text-sm">Para 50kg el precio es S/18.5 por kg. Incluye certificación orgánica.</p>
            <span className="text-xs opacity-75">Tú - 10:42 AM</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Escribe tu mensaje..." className="flex-1" />
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
          Enviar
        </Button>
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-amber-800">Configuración y Soporte</h3>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Idioma</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Notificaciones</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <HelpCircle className="h-4 w-4" />
            Centro de Ayuda
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <Phone className="h-4 w-4" />
            Chat en vivo con técnico agrícola
            <Badge variant="secondary" className="ml-auto">
              Premium
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex space-x-1 bg-amber-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab.id ? "bg-white text-amber-800 shadow-sm" : "text-amber-600 hover:text-amber-800"
              }`}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "membership" && renderMembershipTab()}
        {activeTab === "chat" && renderChatTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  )
}
