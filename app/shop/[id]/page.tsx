"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const productId = Number.parseInt(params.id)
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0]
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert(`Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart!`)
    setQuantity(1)
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="text-primary hover:underline mb-8 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div>
            <div className="rounded-lg overflow-hidden bg-muted h-96 mb-6">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-5xl font-serif font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(5.0 rating)</span>
            </div>

            <p className="text-4xl font-bold text-primary mb-6">₦{product.price.toLocaleString()}</p>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="mb-8 bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">• Length: 2.5 meters</li>
                <li className="text-sm text-muted-foreground">• Width: 1.5 meters</li>
                <li className="text-sm text-muted-foreground">• Material: 100% Cotton Blend</li>
                <li className="text-sm text-muted-foreground">• Origin: Nigeria</li>
                <li className="text-sm text-muted-foreground">• Handwoven with traditional looms</li>
                <li className="text-sm text-muted-foreground">• Dry clean recommended</li>
              </ul>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors font-bold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-l border-r border-border py-2 bg-background"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Link href="/cart" className="block">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8">Recommended Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-muted">
                    <img src={p.image || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-semibold text-lg mb-2">{p.name}</h3>
                    <p className="text-xl font-bold text-primary mb-4">₦{p.price.toLocaleString()}</p>
                    <Link href={`/shop/${p.id}`}>
                      <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
