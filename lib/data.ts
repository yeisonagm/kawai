export interface Producer {
  id: string
  name: string
  location: string
  experience: number
  photo: string
  certifications: string[]
  annualProduction: number
  story: string
}

export interface Lot {
  id: string
  code: string
  producer: string
  farm: string
  variety: string
  altitude: number
  plantingDate: string
  harvestDate: string
  certifications: string[]
  maturation: number
  alerts: number
  price: number
  priceInSoles: number // agregando precio en soles
  stock: number
  alertType?: string | null // agregando tipo de alerta específica
  alertMessage?: string | null // agregando mensaje de alerta
}

export interface WeatherData {
  location: string
  temperature: number
  humidity: number
  forecast: string
  icon: string
}

export interface Alert {
  id: string
  type: "warning" | "info" | "danger"
  message: string
  date: string
  action?: string
}

export interface MarketProducer {
  id: number
  name: string
  location: string
  variety: string
  process: string
  altitude: string
  price: number
  priceUSD: string
  priceInSoles: string
  certifications: string[]
  stock: number
  rating: number
  description: string
  image: string
}

export interface UserLot {
  id: string
  variety: string
  farm: string
  altitude: number
  stock: number
  price: number
  priceInSoles: number
  maturation: number
  alerts: number
  alertType?: string | null
  alertMessage?: string | null
  certifications: string[]
}

// Sample data
export const weatherData: WeatherData = {
  location: "Jaén, Cajamarca",
  temperature: 22,
  humidity: 65,
  forecast: "lluvia ligera en 2 días",
  icon: "🌧️",
}

export const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "Posible brote de roya – actuar en 7 días",
    date: "2024-08-14",
    action: "Ver tratamiento",
  },
  {
    id: "2",
    type: "danger",
    message: "Alerta climática: Heladas previstas para mañana",
    date: "2024-08-14",
    action: "Proteger cultivos",
  },
  {
    id: "3",
    type: "info",
    message: "Precio del café subió 8% esta semana",
    date: "2024-08-13",
  },
]

export const coffeeImages = [
  "https://images.unsplash.com/photo-1442411210769-b95c4632195e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615860291946-62f346ab7e63?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670758291967-25ed2e90f21e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1724820187988-1c01f8a9b289?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561986810-4f3ba2f46ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1647049052430-d7d270f38298?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1663123459145-792ecee0fc23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615273831852-0157b5fd484b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1677125671399-65852c6dfb05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export const getRandomCoffeeImage = (index: number): string => {
  return coffeeImages[index % coffeeImages.length]
}

export const producers: Producer[] = [
  {
    id: "1",
    name: "Pedro Huamán",
    location: "San Ignacio",
    experience: 15,
    photo: getRandomCoffeeImage(0),
    certifications: ["Orgánico", "Comercio Justo"],
    annualProduction: 12000,
    story: "Productor de tercera generación especializado en variedades tradicionales",
  },
  {
    id: "2",
    name: "Juana Torres Gálvez",
    location: "Jaén, Cajamarca",
    experience: 8,
    photo: getRandomCoffeeImage(1),
    certifications: ["Rainforest Alliance"],
    annualProduction: 8300,
    story: "Pionera en técnicas sostenibles de cultivo de café",
  },
  {
    id: "3",
    name: "Luis Ñahui",
    location: "Cutervo",
    experience: 12,
    photo: getRandomCoffeeImage(2),
    certifications: ["Orgánico", "UTZ"],
    annualProduction: 10500,
    story: "Especialista en café Geisha con técnicas innovadoras",
  },
  {
    id: "4",
    name: "María Vásquez",
    location: "El Mirador, Amazonas",
    experience: 10,
    photo: getRandomCoffeeImage(3),
    certifications: ["Orgánico"],
    annualProduction: 9000,
    story: "Productora de café con enfoque en prácticas orgánicas",
  },
  {
    id: "5",
    name: "Carlos Mendoza",
    location: "Alta Vista, San Martín",
    experience: 14,
    photo: getRandomCoffeeImage(4),
    certifications: ["Rainforest Alliance", "UTZ"],
    annualProduction: 11000,
    story: "Cooperativa dedicada a la producción de café sostenible",
  },
  {
    id: "6",
    name: "Ana Rojas",
    location: "Bella Vista, Huánuco",
    experience: 9,
    photo: getRandomCoffeeImage(0),
    certifications: ["Orgánico", "Comercio Justo"],
    annualProduction: 8000,
    story: "Cooperativa de mujeres comprometidas con el comercio justo",
  },
  {
    id: "7",
    name: "Roberto Silva",
    location: "San Martín, Tarapoto",
    experience: 11,
    photo: getRandomCoffeeImage(1),
    certifications: ["UTZ"],
    annualProduction: 9500,
    story: "Productor con enfoque en técnicas de procesamiento natural",
  },
  {
    id: "8",
    name: "Elena Paredes",
    location: "Las Flores, Pasco",
    experience: 13,
    photo: getRandomCoffeeImage(2),
    certifications: ["Orgánico"],
    annualProduction: 10000,
    story: "Productora con experiencia en variedades de café exóticas",
  },
]

export const lots: Lot[] = [
  {
    id: "1",
    code: "KAWAI-2025-LOSCE001",
    producer: "Juana Torres Gálvez",
    farm: "Los Cedros",
    variety: "Bourbon Rojo",
    altitude: 1550,
    plantingDate: "2024-02-18",
    harvestDate: "2024-08-25",
    certifications: ["Rainforest Alliance"],
    maturation: 75,
    alerts: 0,
    price: 4.8,
    priceInSoles: 17.8,
    stock: 800,
    alertType: null,
    alertMessage: null,
  },
  {
    id: "2",
    code: "KAWAI-2025-SANIG002",
    producer: "Pedro Huamán",
    farm: "San Ignacio",
    variety: "Catuaí Amarillo",
    altitude: 1650,
    plantingDate: "2024-01-15",
    harvestDate: "2024-07-20",
    certifications: ["Orgánico", "Comercio Justo"],
    maturation: 80,
    alerts: 1,
    price: 5.2,
    priceInSoles: 19.2,
    stock: 500,
    alertType: "plaga",
    alertMessage: "Posible brote de roya detectado",
  },
  {
    id: "3",
    code: "KAWAI-2025-CUTE003",
    producer: "Luis Ñahui",
    farm: "Cutervo",
    variety: "Geisha",
    altitude: 1800,
    plantingDate: "2024-03-10",
    harvestDate: "2024-09-15",
    certifications: ["Orgánico", "UTZ"],
    maturation: 90,
    alerts: 1,
    price: 7.5,
    priceInSoles: 27.8,
    stock: 600,
    alertType: "clima",
    alertMessage: "Condiciones climáticas adversas previstas",
  },
  {
    id: "4",
    code: "KAWAI-2025-ELMIR004",
    producer: "María Vásquez",
    farm: "El Mirador",
    variety: "Caturra",
    altitude: 1720,
    plantingDate: "2024-01-20",
    harvestDate: "2024-07-30",
    certifications: ["Orgánico"],
    maturation: 85,
    alerts: 0,
    price: 5.0,
    priceInSoles: 18.5,
    stock: 1200,
    alertType: null,
    alertMessage: null,
  },
  {
    id: "5",
    code: "KAWAI-2025-ALTAV005",
    producer: "Carlos Mendoza",
    farm: "Alta Vista",
    variety: "Typica",
    altitude: 1900,
    plantingDate: "2024-02-05",
    harvestDate: "2024-08-15",
    certifications: ["Rainforest Alliance", "UTZ"],
    maturation: 70,
    alerts: 1,
    price: 5.8,
    priceInSoles: 21.5,
    stock: 950,
    alertType: "catastrofe",
    alertMessage: "Riesgo de deslizamiento por lluvias intensas",
  },
  {
    id: "6",
    code: "KAWAI-2025-BELAV006",
    producer: "Ana Rojas",
    farm: "Bella Vista",
    variety: "Pacamara",
    altitude: 1600,
    plantingDate: "2024-03-01",
    harvestDate: "2024-09-10",
    certifications: ["Orgánico", "Comercio Justo"],
    maturation: 78,
    alerts: 0,
    price: 6.2,
    priceInSoles: 23.0,
    stock: 750,
    alertType: null,
    alertMessage: null,
  },
  {
    id: "7",
    code: "KAWAI-2025-SANMA007",
    producer: "Roberto Silva",
    farm: "San Martín",
    variety: "Bourbon Amarillo",
    altitude: 1580,
    plantingDate: "2024-01-10",
    harvestDate: "2024-07-25",
    certifications: ["UTZ"],
    maturation: 82,
    alerts: 1,
    price: 4.9,
    priceInSoles: 18.1,
    stock: 1100,
    alertType: "plaga",
    alertMessage: "Presencia de broca del café detectada",
  },
  {
    id: "8",
    code: "KAWAI-2025-LASFL008",
    producer: "Elena Paredes",
    farm: "Las Flores",
    variety: "Catuai Rojo",
    altitude: 1750,
    plantingDate: "2024-02-12",
    harvestDate: "2024-08-20",
    certifications: ["Orgánico"],
    maturation: 88,
    alerts: 1,
    price: 5.4,
    priceInSoles: 20.0,
    stock: 850,
    alertType: "clima",
    alertMessage: "Temperaturas extremas afectando maduración",
  },
]

export const marketData = [
  {
    id: 1,
    producer: "Pedro Huamán",
    location: "San Ignacio, Cajamarca",
    coffee: "Catuaí Amarillo",
    variety: "Catuaí Amarillo",
    process: "Lavado",
    altitude: "1650m",
    price: 5.2,
    certifications: ["Orgánico", "Comercio Justo"],
    stock: 1000,
    rating: 4.8,
    totalReviews: 24,
    description:
      "Café de alta calidad con notas florales y cítricas. Cultivado en terrazas tradicionales con técnicas sostenibles transmitidas por generaciones. Ideal para tostado medio con excelente balance entre acidez y dulzura.",
    flavorNotes: ["Floral", "Cítrico", "Dulce", "Equilibrado"],
    brewingMethods: ["Espresso", "V60", "Chemex"],
    image: coffeeImages[0],
    reviews: [
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
    ],
    ratingBreakdown: {
      5: 18,
      4: 4,
      3: 2,
      2: 0,
      1: 0,
    },
  },
  {
    id: 2,
    producer: "Juana Torres Gálvez",
    location: "Jaén, Cajamarca",
    coffee: "Bourbon Rojo",
    variety: "Bourbon Rojo",
    process: "Natural",
    altitude: "1550m",
    price: 4.8,
    certifications: ["Rainforest Alliance"],
    stock: 800,
    rating: 4.6,
    totalReviews: 18,
    description:
      "Café con cuerpo completo y notas achocolatadas. Procesado natural que resalta la dulzura natural del grano. Cultivado bajo sombra con prácticas ambientalmente responsables.",
    flavorNotes: ["Chocolate", "Dulce", "Cuerpo completo"],
    brewingMethods: ["French Press", "Espresso", "Moka"],
    image: coffeeImages[1],
    reviews: [
      {
        buyerName: "Tostadores Unidos",
        rating: 5,
        comment: "El proceso natural le da un perfil único. Muy buena para blend premium.",
        purchaseDate: "2025-08-12",
        verified: true,
      },
      {
        buyerName: "Roberto Café Shop",
        rating: 4,
        comment: "Buena relación precio-calidad. Mis clientes aprecian las notas achocolatadas.",
        purchaseDate: "2025-08-05",
        verified: true,
      },
    ],
    ratingBreakdown: {
      5: 12,
      4: 5,
      3: 1,
      2: 0,
      1: 0,
    },
  },
  {
    id: 3,
    producer: "Luis Ñahui",
    location: "Cutervo, Cajamarca",
    coffee: "Geisha",
    variety: "Geisha",
    process: "Honey",
    altitude: "1800m",
    price: 7.5,
    certifications: ["Orgánico", "UTZ"],
    stock: 600,
    rating: 4.9,
    totalReviews: 31,
    description:
      "Café premium con perfil complejo de notas florales, jazmín y frutas tropicales. Variedad Geisha cultivada a gran altitud con técnicas innovadoras de fermentación controlada.",
    flavorNotes: ["Floral", "Jazmín", "Frutas tropicales", "Complejo"],
    brewingMethods: ["Pour Over", "Chemex", "Aeropress"],
    image: coffeeImages[2],
    reviews: [
      {
        buyerName: "Specialty Coffee Co.",
        rating: 5,
        comment: "Increíble perfil de sabor, nuestros clientes quedan fascinados con este Geisha.",
        purchaseDate: "2025-08-14",
        verified: true,
      },
    ],
    ratingBreakdown: {
      5: 28,
      4: 2,
      3: 1,
      2: 0,
      1: 0,
    },
  },
  {
    id: 4,
    producer: "María Vásquez",
    location: "El Mirador, Amazonas",
    coffee: "Caturra",
    variety: "Caturra",
    process: "Lavado",
    altitude: "1720m",
    price: 5.0,
    certifications: ["Orgánico"],
    stock: 1200,
    rating: 4.5,
    totalReviews: 15,
    description:
      "Café equilibrado con acidez brillante y notas cítricas. Cultivado en finca familiar con métodos orgánicos certificados. Excelente para espresso y métodos de filtrado.",
    flavorNotes: ["Cítrico", "Equilibrado", "Acidez brillante"],
    brewingMethods: ["Espresso", "V60", "French Press"],
    image: coffeeImages[3],
    reviews: [],
    ratingBreakdown: {
      5: 8,
      4: 5,
      3: 2,
      2: 0,
      1: 0,
    },
  },
  {
    id: 5,
    producer: "Carlos Mendoza",
    location: "Alta Vista, San Martín",
    coffee: "Typica",
    variety: "Typica",
    process: "Semi-lavado",
    altitude: "1900m",
    price: 5.8,
    certifications: ["Rainforest Alliance", "UTZ"],
    stock: 950,
    rating: 4.7,
    totalReviews: 22,
    description:
      "Café de montaña con cuerpo medio y notas a nueces y caramelo. Variedad tradicional Typica cultivada a gran altitud con certificaciones de sostenibilidad ambiental.",
    flavorNotes: ["Nueces", "Caramelo", "Cuerpo medio"],
    brewingMethods: ["Espresso", "Moka", "Cold Brew"],
    image: coffeeImages[4],
    reviews: [],
    ratingBreakdown: {
      5: 15,
      4: 6,
      3: 1,
      2: 0,
      1: 0,
    },
  },
  {
    id: 6,
    producer: "Ana Rojas",
    location: "Bella Vista, Huánuco",
    coffee: "Pacamara",
    variety: "Pacamara",
    process: "Lavado",
    altitude: "1600m",
    price: 6.2,
    certifications: ["Orgánico", "Comercio Justo"],
    stock: 750,
    rating: 4.8,
    totalReviews: 19,
    description:
      "Café especial con granos grandes y sabor intenso. Notas a chocolate negro y frutas rojas. Cultivado por cooperativa de mujeres con prácticas de comercio justo.",
    flavorNotes: ["Chocolate negro", "Frutas rojas", "Intenso"],
    brewingMethods: ["Pour Over", "French Press", "Espresso"],
    image: coffeeImages[5],
    reviews: [],
    ratingBreakdown: {
      5: 14,
      4: 4,
      3: 1,
      2: 0,
      1: 0,
    },
  },
  {
    id: 7,
    producer: "Roberto Silva",
    location: "San Martín, Tarapoto",
    coffee: "Bourbon Amarillo",
    variety: "Bourbon Amarillo",
    process: "Natural",
    altitude: "1580m",
    price: 4.9,
    certifications: ["UTZ"],
    stock: 1100,
    rating: 4.4,
    totalReviews: 13,
    description:
      "Café dulce con cuerpo medio y notas frutales. Procesado natural que potencia los sabores dulces naturales. Ideal para blend y tostados oscuros.",
    flavorNotes: ["Dulce", "Frutal", "Cuerpo medio"],
    brewingMethods: ["Espresso", "Moka", "French Press"],
    image: coffeeImages[6],
    reviews: [],
    ratingBreakdown: {
      5: 6,
      4: 5,
      3: 2,
      2: 0,
      1: 0,
    },
  },
  {
    id: 8,
    producer: "Elena Paredes",
    location: "Las Flores, Pasco",
    coffee: "Catuai Rojo",
    variety: "Catuai Rojo",
    process: "Honey",
    altitude: "1750m",
    price: 5.4,
    certifications: ["Orgánico"],
    stock: 850,
    rating: 4.6,
    totalReviews: 17,
    description:
      "Café con perfil balanceado y notas a miel y especias suaves. Proceso honey que aporta dulzura y complejidad. Cultivado en microclima ideal para esta variedad.",
    flavorNotes: ["Miel", "Especias suaves", "Balanceado"],
    brewingMethods: ["V60", "Chemex", "Aeropress"],
    image: coffeeImages[7],
    reviews: [],
    ratingBreakdown: {
      5: 11,
      4: 4,
      3: 2,
      2: 0,
      1: 0,
    },
  },
]

export const salesData = [
  { month: "Ene", sales: 25000, year: 2024 },
  { month: "Feb", sales: 28000, year: 2024 },
  { month: "Mar", sales: 32000, year: 2024 },
  { month: "Abr", sales: 35000, year: 2024 },
  { month: "May", sales: 38000, year: 2024 },
  { month: "Jun", sales: 42000, year: 2024 },
  { month: "Jul", sales: 45000, year: 2024 },
  { month: "Ago", sales: 41000, year: 2024 },
  { month: "Sep", sales: 39000, year: 2024 },
  { month: "Oct", sales: 43000, year: 2024 },
  { month: "Nov", sales: 46000, year: 2024 },
  { month: "Dec", sales: 48000, year: 2024 },
]

export const dashboardCards = [
  {
    id: 1,
    title: "Alertas Críticas",
    value: "3 Activas",
    description: "Broca del café y condiciones climáticas adversas",
    color: "red",
    icon: "alert",
  },
  {
    id: 2,
    title: "Predicción Climática",
    value: "Lluvia Moderada",
    description: "Próximas 48 horas - Ideal para riego natural",
    color: "blue",
    icon: "weather",
  },
  {
    id: 3,
    title: "Tendencia de Precios",
    value: "+12% ↗",
    description: "Precio del café subió esta semana",
    color: "green",
    icon: "trend",
  },
  {
    id: 4,
    title: "Mejores Exportadores",
    value: "5 Disponibles",
    description: "Nuevos compradores internacionales activos",
    color: "purple",
    icon: "export",
  },
]

export const notificationsData = [
  {
    id: 1,
    type: "clima",
    title: "Alerta Climática",
    message: "Posibles lluvias intensas en las próximas 48 horas",
    time: "Hace 2 horas",
    read: false,
    color: "border-blue-500",
  },
  {
    id: 2,
    type: "plaga",
    title: "Detección de Plagas",
    message: "Broca del café detectada en Lote CAT-123-2024",
    time: "Hace 4 horas",
    read: false,
    color: "border-red-500",
  },
  {
    id: 3,
    type: "catastrofe",
    title: "Alerta de Heladas",
    message: "Temperaturas bajo 0°C esperadas esta madrugada",
    time: "Hace 6 horas",
    read: true,
    color: "border-orange-500",
  },
  {
    id: 4,
    type: "pedido",
    title: "Nuevo Pedido Recibido",
    message: "Exportadora Lima Coffee solicita 500kg de Geisha",
    time: "Hace 8 horas",
    read: false,
    color: "border-green-500",
  },
  {
    id: 5,
    type: "confirmacion",
    title: "Pedido Confirmado",
    message: "Tu envío de 300kg ha sido confirmado por el comprador",
    time: "Hace 12 horas",
    read: true,
    color: "border-purple-500",
  },
  {
    id: 6,
    type: "clima",
    title: "Condiciones Favorables",
    message: "Clima ideal para cosecha en los próximos 3 días",
    time: "Hace 1 día",
    read: true,
    color: "border-blue-500",
  },
  {
    id: 7,
    type: "plaga",
    title: "Tratamiento Recomendado",
    message: "Aplicar fungicida preventivo en Lote BOU-456-2024",
    time: "Hace 1 día",
    read: false,
    color: "border-red-500",
  },
  {
    id: 8,
    type: "pedido",
    title: "Cotización Solicitada",
    message: "Café Premium SAC solicita cotización para 1000kg",
    time: "Hace 2 días",
    read: true,
    color: "border-green-500",
  },
  {
    id: 9,
    type: "catastrofe",
    title: "Riesgo de Deslizamiento",
    message: "Lluvias intensas pueden causar deslizamientos en la zona",
    time: "Hace 2 días",
    read: false,
    color: "border-orange-500",
  },
  {
    id: 10,
    type: "confirmacion",
    title: "Pago Procesado",
    message: "Pago de S/ 15,600 ha sido procesado exitosamente",
    time: "Hace 3 días",
    read: true,
    color: "border-purple-500",
  },
  {
    id: 11,
    type: "clima",
    title: "Sequía Prolongada",
    message: "Sin lluvias esperadas en los próximos 10 días",
    time: "Hace 3 días",
    read: false,
    color: "border-blue-500",
  },
  {
    id: 12,
    type: "plaga",
    title: "Roya Amarilla Detectada",
    message: "Presencia de roya en plantaciones vecinas",
    time: "Hace 4 días",
    read: true,
    color: "border-red-500",
  },
  {
    id: 13,
    type: "pedido",
    title: "Pedido Urgente",
    message: "Cliente internacional necesita 200kg para mañana",
    time: "Hace 4 días",
    read: false,
    color: "border-green-500",
  },
  {
    id: 14,
    type: "catastrofe",
    title: "Vientos Fuertes",
    message: "Vientos de hasta 80 km/h previstos para hoy",
    time: "Hace 5 días",
    read: true,
    color: "border-orange-500",
  },
  {
    id: 15,
    type: "confirmacion",
    title: "Certificación Renovada",
    message: "Tu certificación orgánica ha sido renovada por 2 años",
    time: "Hace 5 días",
    read: true,
    color: "border-purple-500",
  },
  {
    id: 16,
    type: "clima",
    title: "Temperatura Óptima",
    message: "Temperaturas ideales para floración del café",
    time: "Hace 6 días",
    read: false,
    color: "border-blue-500",
  },
  {
    id: 17,
    type: "plaga",
    title: "Control de Broca",
    message: "Tratamiento contra broca aplicado exitosamente",
    time: "Hace 6 días",
    read: true,
    color: "border-red-500",
  },
  {
    id: 18,
    type: "pedido",
    title: "Muestra Solicitada",
    message: "Tostadora artesanal solicita muestra de 250g",
    time: "Hace 7 días",
    read: true,
    color: "border-green-500",
  },
  {
    id: 19,
    type: "catastrofe",
    title: "Granizada Leve",
    message: "Granizo de pequeño tamaño reportado en la región",
    time: "Hace 7 días",
    read: false,
    color: "border-orange-500",
  },
  {
    id: 20,
    type: "confirmacion",
    title: "Envío Entregado",
    message: "Tu envío de 800kg llegó a destino sin problemas",
    time: "Hace 8 días",
    read: true,
    color: "border-purple-500",
  },
  {
    id: 21,
    type: "clima",
    title: "Humedad Alta",
    message: "Niveles de humedad del 85% favorecen hongos",
    time: "Hace 8 días",
    read: true,
    color: "border-blue-500",
  },
  {
    id: 22,
    type: "plaga",
    title: "Minador de Hoja",
    message: "Presencia de minador detectada en sector norte",
    time: "Hace 9 días",
    read: false,
    color: "border-red-500",
  },
  {
    id: 23,
    type: "pedido",
    title: "Contrato Anual",
    message: "Propuesta de contrato anual por 5000kg recibida",
    time: "Hace 9 días",
    read: true,
    color: "border-green-500",
  },
  {
    id: 24,
    type: "catastrofe",
    title: "Sismo Menor",
    message: "Sismo de 4.2 grados registrado sin daños",
    time: "Hace 10 días",
    read: true,
    color: "border-orange-500",
  },
  {
    id: 25,
    type: "confirmacion",
    title: "Análisis de Calidad",
    message: "Tu café obtuvo 86 puntos en análisis de calidad",
    time: "Hace 10 días",
    read: false,
    color: "border-purple-500",
  },
]

export const salesDataByYear = {
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

export const notifications = [
  {
    id: 1,
    type: "weather",
    title: "Condiciones Climáticas",
    message: "Lluvia moderada esperada en las próximas 48 horas",
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 2,
    type: "pest",
    title: "Alerta de Plagas",
    message: "Broca del café detectada en Lote KAWAI-2024-SANIG002",
    time: "Hace 3 horas",
    read: false,
  },
  {
    id: 3,
    type: "disaster",
    title: "Riesgo de Heladas",
    message: "Temperaturas bajo 5°C previstas para esta madrugada",
    time: "Hace 5 horas",
    read: true,
  },
  {
    id: 4,
    type: "weather",
    title: "Clima Favorable",
    message: "Condiciones ideales para cosecha en los próximos 3 días",
    time: "Hace 1 día",
    read: true,
  },
  {
    id: 5,
    type: "pest",
    title: "Tratamiento Aplicado",
    message: "Fungicida aplicado exitosamente en Lote KAWAI-2024-CUTE003",
    time: "Hace 2 días",
    read: true,
  },
]

export const marketProducers: MarketProducer[] = marketData.map((producer, index) => ({
  ...producer,
  id: producer.id,
  name: producer.producer,
  image: producer.image,
  priceUSD: `$${producer.price}/kg`,
  price: `S/ ${(producer.price * 3.7).toFixed(1)}/kg`,
  rating: producer.rating || 4.5,
}))

export const userLots: UserLot[] = lots.slice(0, 8).map((lot) => ({
  ...lot,
  id: lot.id,
  variety: lot.variety,
  farm: lot.farm,
  altitude: lot.altitude,
  stock: lot.stock,
  price: lot.price,
  priceInSoles: lot.priceInSoles,
  maturation: lot.maturation,
  alerts: lot.alerts,
  alertType: lot.alertType,
  alertMessage: lot.alertMessage,
  certifications: lot.certifications,
}))
