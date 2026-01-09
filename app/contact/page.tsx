import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our Aso-Oke fabrics? We're here to help. Whether you need assistance with your order, want to learn more about our products, or just want to say hello, feel free to reach out. Our team is dedicated to providing you with the best service possible.
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
                  Sunday: Closed/ but you can still place orders online.
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" required />
                  <Input type="email" placeholder="Your Email" required />
                </div>

                <Input placeholder="Subject" required />

                <Textarea placeholder="Message" rows={6} required />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Send Message
                </Button>
              </form>
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
            allowFullScreen={true}
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Follow Us</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with us on social media for exclusive updates, behind-the-scenes content, and special offers.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg">
              Instagram
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
  )
}
