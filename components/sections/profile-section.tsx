"use client"

import { useState } from 'react'
import Image from 'next/image'
import { 
  User, Mail, Gamepad2, Crown, Bell, 
  ChevronRight, Settings, LogOut, Shield,
  CreditCard, Smartphone, TrendingDown, Tag, Sparkles, X, Check,
  Globe, Moon, Volume2, Vibrate, Eye, Lock, Trash2, Download, KeyRound
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { UserProfile, Notification } from '@/lib/types'

interface ProfileSectionProps {
  user: UserProfile
  notifications: Notification[]
  onUpdateUser: (updates: Partial<UserProfile>) => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

export function ProfileSection({ 
  user, 
  notifications,
  onUpdateUser, 
  onMarkAsRead,
  onMarkAllAsRead
}: ProfileSectionProps) {
  const [showPaymentSheet, setShowPaymentSheet] = useState(false)
  const [showAlertsSheet, setShowAlertsSheet] = useState(false)
  const [showPreferencesSheet, setShowPreferencesSheet] = useState(false)
  const [showPrivacySheet, setShowPrivacySheet] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'apple' | 'card' | null>(null)
  
  // Preferences state
  const [language, setLanguage] = useState('es')
  const [autoPlayVideos, setAutoPlayVideos] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [hapticFeedback, setHapticFeedback] = useState(true)
  
  // Privacy state
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [biometricLogin, setBiometricLogin] = useState(true)
  const [shareActivity, setShareActivity] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }

  return (
    <>
      <div className="pt-20 pb-28">
        {/* Profile Header */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {user.plan === 'premium' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-primary font-medium">{user.gamertag}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Miembro desde {formatDate(user.memberSince)}
              </p>
            </div>
          </div>

          {/* Plan Card */}
          <div className={cn(
            "p-4 rounded-2xl border",
            user.plan === 'premium' 
              ? "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30"
              : "bg-card border-border"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  user.plan === 'premium' 
                    ? "bg-gradient-to-br from-amber-400 to-amber-600"
                    : "bg-secondary"
                )}>
                  {user.plan === 'premium' ? (
                    <Crown className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className={cn(
                    "font-bold text-sm",
                    user.plan === 'premium' ? "text-amber-500" : "text-foreground"
                  )}>
                    {user.plan === 'premium' ? 'XPrice Premium' : 'Plan Gratuito'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {user.plan === 'premium' 
                      ? 'Todas las funciones desbloqueadas' 
                      : 'Funciones limitadas'}
                  </p>
                </div>
              </div>
              {user.plan === 'free' && (
                <Button 
                  size="sm" 
                  onClick={() => setShowPaymentSheet(true)}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold px-4"
                >
                  Mejorar
                </Button>
              )}
            </div>
            {user.plan === 'free' && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Beneficios Premium:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Alertas ilimitadas', 'Sin anuncios', 'Historial completo', 'Soporte prioritario'].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-primary" />
                      <span className="text-xs text-secondary-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Info Section */}
        <div className="px-5 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Informacion personal
          </h2>
          <div className="bg-card rounded-2xl divide-y divide-border/50 overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Nombre completo</p>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Correo electronico</p>
                <p className="text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Xbox Gamertag</p>
                <p className="text-sm font-medium text-primary">{user.gamertag}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="px-5 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Notificaciones
          </h2>
          <button 
            onClick={() => setShowAlertsSheet(true)}
            className="w-full bg-card rounded-2xl p-4 flex items-center justify-between hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Alertas de precio</p>
                <p className="text-xs text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} sin leer` : 'Configurar alertas'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Settings Section */}
        <div className="px-5 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Configuracion
          </h2>
          <div className="bg-card rounded-2xl divide-y divide-border/50 overflow-hidden">
            <button 
              onClick={() => setShowPreferencesSheet(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Preferencias</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              onClick={() => setShowPrivacySheet(true)}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Privacidad y seguridad</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-destructive/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-destructive">Cerrar sesion</p>
              </div>
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="px-5 text-center">
          <p className="text-xs text-muted-foreground">XPrice v1.0.0</p>
        </div>
      </div>

      {/* Payment Sheet */}
      {showPaymentSheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPaymentSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-5 pb-10 safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Mejorar a Premium</h2>
              <button 
                onClick={() => setShowPaymentSheet(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">$4.99</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Cancela cuando quieras</p>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-2xl p-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Incluye:</p>
              <div className="space-y-2">
                {[
                  'Alertas de precio ilimitadas',
                  'Historial de precios completo',
                  'Sin anuncios',
                  'Comparador de precios por region',
                  'Soporte prioritario 24/7'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-secondary-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedPaymentMethod('apple')}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                  selectedPaymentMethod === 'apple'
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-background" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">Apple Pay</p>
                  <p className="text-xs text-muted-foreground">Pago rapido y seguro</p>
                </div>
                {selectedPaymentMethod === 'apple' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setSelectedPaymentMethod('card')}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                  selectedPaymentMethod === 'card'
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">Tarjeta de debito/credito</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                </div>
                {selectedPaymentMethod === 'card' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            </div>

            {/* Pay Button */}
            <Button 
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80"
              disabled={!selectedPaymentMethod}
              onClick={() => {
                onUpdateUser({ plan: 'premium' })
                setShowPaymentSheet(false)
              }}
            >
              {selectedPaymentMethod === 'apple' ? 'Pagar con Apple Pay' : 'Continuar con el pago'}
            </Button>
          </div>
        </div>
      )}

      {/* Alerts Sheet */}
      {showAlertsSheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAlertsSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b border-border/50 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Alertas de precio</h2>
              <button 
                onClick={() => setShowAlertsSheet(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 pb-10">
              {/* Alert Settings */}
              <div className="bg-card rounded-2xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Configuracion de alertas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <TrendingDown className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Bajadas de precio</span>
                    </div>
                    <Switch 
                      checked={user.priceDropAlerts}
                      onCheckedChange={(checked) => onUpdateUser({ priceDropAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Precio minimo historico</span>
                    </div>
                    <Switch 
                      checked={user.lowestEverAlerts}
                      onCheckedChange={(checked) => onUpdateUser({ lowestEverAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Ofertas en favoritos</span>
                    </div>
                    <Switch 
                      checked={user.wishlistAlerts}
                      onCheckedChange={(checked) => onUpdateUser({ wishlistAlerts: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Notificaciones recientes
                  </h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={onMarkAllAsRead}
                      className="text-xs text-primary font-medium"
                    >
                      Marcar todas leidas
                    </button>
                  )}
                </div>
                {notifications.length > 0 ? (
                  <div className="space-y-2">
                    {notifications.slice(0, 5).map(notification => (
                      <button
                        key={notification.id}
                        onClick={() => onMarkAsRead(notification.id)}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left",
                          notification.read ? "bg-card" : "bg-primary/10 border border-primary/20"
                        )}
                      >
                        <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={notification.gameCover}
                            alt={notification.gameTitle}
                            width={40}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm text-foreground truncate">
                              {notification.gameTitle}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          {notification.newPrice && (
                            <p className="text-xs text-primary font-semibold mt-1">
                              ${notification.newPrice}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Sin notificaciones</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Sheet */}
      {showPreferencesSheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreferencesSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b border-border/50 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Preferencias</h2>
              <button 
                onClick={() => setShowPreferencesSheet(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 pb-10">
              {/* Language */}
              <div className="bg-card rounded-2xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Idioma y region</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setLanguage('es')}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                      language === 'es' ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                    )}
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">Espanol</p>
                      <p className="text-xs text-muted-foreground">Idioma de la aplicacion</p>
                    </div>
                    {language === 'es' && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                      language === 'en' ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                    )}
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">English</p>
                      <p className="text-xs text-muted-foreground">App language</p>
                    </div>
                    {language === 'en' && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* App Behavior */}
              <div className="bg-card rounded-2xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Comportamiento de la app</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Auto-reproducir videos</p>
                        <p className="text-xs text-muted-foreground">En trailers de juegos</p>
                      </div>
                    </div>
                    <Switch 
                      checked={autoPlayVideos}
                      onCheckedChange={setAutoPlayVideos}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Efectos de sonido</p>
                        <p className="text-xs text-muted-foreground">Sonidos de la interfaz</p>
                      </div>
                    </div>
                    <Switch 
                      checked={soundEffects}
                      onCheckedChange={setSoundEffects}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Vibrate className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Vibracion haptica</p>
                        <p className="text-xs text-muted-foreground">Retroalimentacion tactil</p>
                      </div>
                    </div>
                    <Switch 
                      checked={hapticFeedback}
                      onCheckedChange={setHapticFeedback}
                    />
                  </div>
                </div>
              </div>

              {/* Cache */}
              <div className="bg-card rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Almacenamiento</h3>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">Limpiar cache</p>
                    <p className="text-xs text-muted-foreground">Libera espacio en tu dispositivo</p>
                  </div>
                  <span className="text-xs text-muted-foreground">45 MB</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Security Sheet */}
      {showPrivacySheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPrivacySheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b border-border/50 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Privacidad y seguridad</h2>
              <button 
                onClick={() => setShowPrivacySheet(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 pb-10">
              {/* Security */}
              <div className="bg-card rounded-2xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Seguridad de la cuenta</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <KeyRound className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Autenticacion de 2 factores</p>
                        <p className="text-xs text-muted-foreground">Capa extra de seguridad</p>
                      </div>
                    </div>
                    <Switch 
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Face ID / Touch ID</p>
                        <p className="text-xs text-muted-foreground">Inicio de sesion biometrico</p>
                      </div>
                    </div>
                    <Switch 
                      checked={biometricLogin}
                      onCheckedChange={setBiometricLogin}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-card rounded-2xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Privacidad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Compartir actividad</p>
                        <p className="text-xs text-muted-foreground">Mostrar juegos en tu perfil</p>
                      </div>
                    </div>
                    <Switch 
                      checked={shareActivity}
                      onCheckedChange={setShareActivity}
                    />
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-card rounded-2xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Gestion de datos</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">Descargar mis datos</p>
                      <p className="text-xs text-muted-foreground">Exporta tu informacion</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">Cambiar contrasena</p>
                      <p className="text-xs text-muted-foreground">Actualiza tu contrasena</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20">
                <h3 className="text-sm font-semibold text-destructive mb-4">Zona de peligro</h3>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-destructive">Eliminar cuenta</p>
                    <p className="text-xs text-destructive/70">Esta accion es irreversible</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
