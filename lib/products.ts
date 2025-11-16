export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  rating: number
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Blue Aso-Oke",
    price: 45000,
    description: "Premium handcrafted royal blue Aso-Oke fabric with intricate patterns",
    image: "/royal-blue-aso-oke-fabric-handcrafted.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "White Classic Aso-Oke",
    price: 38000,
    description: "Elegant white Aso-Oke with traditional embroidery and craftsmanship",
    image: "/white-aso-oke-fabric-classic.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Navy Heritage Aso-Oke",
    price: 42000,
    description: "Rich navy blue handwoven Aso-Oke with luxury finishing",
    image: "/navy-blue-aso-oke-fabric-heritage.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Sky Blue Aso-Oke",
    price: 40000,
    description: "Fresh sky blue Aso-Oke perfect for celebrations and special occasions",
    image: "/sky-blue-aso-oke-fabric-light.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "White & Blue Combo Aso-Oke",
    price: 50000,
    description: "Stunning white base with blue patterns - limited edition piece",
    image: "/white-blue-combination-aso-oke-fabric.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Cobalt Deep Aso-Oke",
    price: 48000,
    description: "Deep cobalt blue Aso-Oke with premium hand-finishing details",
    image: "/cobalt-deep-blue-aso-oke-fabric.jpg",
    rating: 5,
  },
]
