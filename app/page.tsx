import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Royal Blue Aso-Oke",
    price: "₦45,000",
    image: "/blue-aso-oke-fabric-elegant-handcrafted.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Gold Classic Aso-Oke",
    price: "₦38,000",
    image: "/gold-aso-oke-fabric-luxury-traditional.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Burgundy Heritage Aso-Oke",
    price: "₦42,000",
    image: "/burgundy-aso-oke-fabric-rich-ornate.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Green Mint Aso-Oke",
    price: "₦40,000",
    image: "/green-aso-oke-fabric-fresh-handwoven.jpg",
    rating: 5,
  },
]

const testimonials = [
  {
    name: "Chioma Okafor",
    text: "The quality is exceptional. I wore this to my sister's wedding and received countless compliments!",
    rating: 5,
  },
  {
    name: "Amara Adeleke",
    text: "Authentic Aso-Oke at its finest. The craftsmanship is truly remarkable.",
    rating: 5,
  },
  {
    name: "Folake Adeyemi",
    text: "Best purchase I've made. The colors are vibrant and the fabric feels premium!",
    rating: 5,
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
            Tradition Woven in Style
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover authentic handcrafted Aso-Oke fabrics that celebrate culture, craftsmanship, and timeless elegance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Featured Collections</h2>
            <p className="text-muted-foreground text-lg">Handpicked Aso-Oke pieces for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-muted overflow-hidden group">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex gap-1 mb-4">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <Link href={`/shop/${product.id}`}>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About the Craft */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/aso-oke-weaving-process-traditional-craft-hands.jpg" alt="Aso-Oke weaving process" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Art of Aso-Oke</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Aso-Oke is a handwoven textile that holds deep cultural significance in Yoruba tradition. Each piece is
                meticulously crafted using traditional looms, representing generations of expertise and dedication.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our commitment to quality ensures that every fabric meets the highest standards of craftsmanship,
                vibrant colors, and durability.
              </p>
              <Link href="/about">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Discover Our Story</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button variant="outline" size="lg">
                View All Testimonials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
