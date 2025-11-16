import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-serif",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Aso-Oke | Premium Handcrafted Fabrics & Fashion",
  description: "Discover authentic Aso-Oke handcrafted fabrics and fashion accessories. Tradition woven in style.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} font-sans`}>
        <ThemeProvider>
          <CartProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
