"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Filter } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

const colors = ["All", "Blue", "White", "Navy", "Sky", "Combo"]
const categories = ["All", "Premium", "Classic", "Heritage", "Modern"]

export default function ShopPage() {
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const { addToCart } = useCart()

  const filtered = PRODUCTS.filter((product) => {
    return true // Products already filtered by our blue/white theme
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    return 0
  })

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    addToCart(product, 1)
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold mb-2">Our Collection</h1>
          <p className="text-muted-foreground text-lg">Explore our selection of handcrafted Aso-Oke fabrics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 text-sm text-muted-foreground">Showing {sorted.length} products</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                >
                  <Link href={`/shop/${product.id}`} className="block">
                    <div className="relative h-64 bg-muted overflow-hidden group">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
                    <div className="flex gap-1 mb-4">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                        >
                          Add
                        </Button>
                        <Link href={`/shop/${product.id}`}>
                          <Button size="sm" variant="outline" className="cursor-pointer bg-transparent">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
