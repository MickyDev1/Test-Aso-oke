import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold text-primary mb-4">
              ASO-OKE
            </h3>
            <p className="text-sm text-muted-foreground">
              Authentic handcrafted Aso-Oke fabrics. Tradition woven in style. 
              Experience the art of weaving with Aso-Oke. 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="sweet-link text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="sweet-link text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="sweet-link text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/login"
                  className="sweet-link text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Sign In
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: aso.oke.house@gmail.com</li>
              <li>Phone: +234 (0) 80 335 19937</li>
              <li>WhatsApp: +234 (0) 80 335 19937</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="text-sm"
              />
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Aso-Oke. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
