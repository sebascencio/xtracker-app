export interface Game {
  id: string
  title: string
  coverImage: string
  currentPrice: number
  originalPrice: number
  lowestPrice: number
  highestPrice: number
  discount: number
  isFavorite: boolean
  priceHistory: PricePoint[]
  platform: 'Xbox Series X|S' | 'Xbox One' | 'PC' | 'All'
  releaseDate: string
  rating: number
  category: string
  xboxStoreUrl: string
}

export interface PricePoint {
  date: string
  price: number
}

export interface Notification {
  id: string
  gameId: string
  gameTitle: string
  gameCover: string
  type: 'price_drop' | 'wishlist_sale' | 'lowest_ever'
  message: string
  timestamp: string
  read: boolean
  newPrice?: number
  oldPrice?: number
}

export type TabType = 'home' | 'deals' | 'favorites' | 'profile' | 'search'

export interface UserProfile {
  id: string
  name: string
  email: string
  gamertag: string
  avatar: string
  plan: 'free' | 'premium'
  memberSince: string
  alertsEnabled: boolean
  priceDropAlerts: boolean
  lowestEverAlerts: boolean
  wishlistAlerts: boolean
}

export interface Currency {
  code: string
  symbol: string
  name: string
  flag: string
  rate: number
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: 'US', rate: 1 },
  { code: 'MXN', symbol: '$', name: 'Peso Mexicano', flag: 'MX', rate: 17.15 },
  { code: 'EUR', symbol: '\u20AC', name: 'Euro', flag: 'EU', rate: 0.92 },
  { code: 'GBP', symbol: '\u00A3', name: 'British Pound', flag: 'GB', rate: 0.79 },
  { code: 'ARS', symbol: '$', name: 'Peso Argentino', flag: 'AR', rate: 875 },
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileno', flag: 'BR', rate: 4.97 },
  { code: 'COP', symbol: '$', name: 'Peso Colombiano', flag: 'CO', rate: 3950 },
  { code: 'CLP', symbol: '$', name: 'Peso Chileno', flag: 'CL', rate: 925 },
]
