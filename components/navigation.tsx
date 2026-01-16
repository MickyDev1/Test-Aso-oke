"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase.client";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const router = useRouter();

  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setFbUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setIsOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="text-2xl font-bold font-serif text-primary">
              ASO-OKE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sweet-link text-sm font-medium transition-colors hover:text-primary cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Only show auth buttons after auth state resolves */}
            {!authLoading && !fbUser && (
              <>
                <Link href="/login" className="hidden md:block">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>

                <Link href="/signup" className="hidden md:block">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {!authLoading && fbUser && (
              <>
                <Link href="/profile" className="cursor-pointer">
                  <Button
                    variant="ghost"
                    size="icon"
                    title="My Profile"
                    className="cursor-pointer"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="icon"
                  title="Sign out"
                  className="hidden md:inline-flex"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}

            <Link href="/cart" className="cursor-pointer">
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden cursor-pointer"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sweet-tap block px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!authLoading && !fbUser && (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>

                <Link
                  href="/signup"
                  className="block px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {!authLoading && fbUser && (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    My Profile
                  </Button>
                </Link>

                <div className="px-4 py-2">
                  <Button onClick={handleSignOut} className="w-full">
                    Sign Out
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
