"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "2348033519937";
  const whatsappMessage =
    "Hi Aso-Oke House, I would like to inquire about Aso-Oke fabrics, pricing, and availability.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Let&apos;s Chat on WhatsApp
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fast replies, friendly help, and real-time updates. Message our team
            on WhatsApp and we&apos;ll guide you through fabrics, pricing, and
            custom orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">+234 80 3351 9937</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">aso.oke.house@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9:00 AM - 8:00 PM
                  <br />
                  Saturday: 10:00 AM - 5:30 PM
                  <br />
                  Sunday: Closed (but you can still place orders online).
                </p>
              </div>
            </div>
          </Card>

          {/* WhatsApp CTA */}
          <div className="lg:col-span-2">
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 text-primary mb-4">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  WhatsApp Concierge
                </span>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Get instant help from our team
              </h2>
              <p className="text-muted-foreground mb-6">
                Skip the forms. Tap the button to open a prefilled WhatsApp
                message and we&apos;ll take it from there. Perfect for
                inquiries, order help, or custom requests.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-semibold">What we can help with</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Fabric availability & pricing</li>
                    <li>Custom orders & styling</li>
                    <li>Delivery timelines</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">Response time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We usually reply within a few minutes during business hours.
                  </p>
                </div>
              </div>

              <Button asChild size="lg" className="w-full">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Aso-Oke House on WhatsApp"
                >
                  Chat on WhatsApp
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                You&apos;ll be taken to WhatsApp with a prefilled message.
              </p>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden h-96 bg-muted mb-16">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7444555555554!2d3.3666!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2b2b2b2b2d%3A0x2b2b2b2b2b2b2b2b!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890123"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Follow Us</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with us on social media for exclusive updates,
            behind-the-scenes content, and special offers.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://www.instagram.com/_aso.oke?igsh=MTViMHQ3eHZrNnQwbA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </Button>
            <Button variant="outline" size="lg">
              Whatsapp
            </Button>
            <Button variant="outline" size="lg">
              TikTok
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
