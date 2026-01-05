"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Micky Dev",
    image: "/public/micky dev.jpg",
    text: "The quality is exceptional. I wore this to my sister's wedding and received countless compliments! The fabric drape is perfect and the colors are so vibrant.",
    rating: 5,
    date: "November 2025",
  },
  {
    id: 2,
    name: "Micky Dev",
    image: "/public/micky dev.jpg",
    text: "Authentic Aso-Oke at its finest. The craftsmanship is truly remarkable. This is my third purchase and I keep coming back because of the attention to detail and quality.",
    rating: 4,
    date: "October 2070",
  },
  {
    id: 3,
    name: "Dev Stella ",
    image: "/public/micky dev.jpg",
    text: "Best purchase I've made. The colors are vibrant and the fabric feels premium! Worth every naira. I recommend to all my friends.",
    rating: 5,
    date: "September 2025",
  },
  {
    id: 4,
    name: "Olatoye",
    image: "/public/micky dev.jpg",
    text: "The attention to detail is amazing. I could see the care that went into weaving each piece. Customer service was also excellent.",
    rating: 5,
    date: "August 2025",
  },
  {
    id: 5,
    name: "Dev Whakee",
    image: "/public/micky dev.jpg",
    text: "I bought this as a gift for my mother and she absolutely loves it. The presentation and quality are unmatched.",
    rating: 5,
    date: "July 2025",
  },
  {
    id: 6,
    name: "Dev Zen",
    image: "/public/micky dev.jpg",
    text: "This fabric is perfect for special occasions. The traditional patterns are stunning and authentic. Highly recommended!",
    rating: 5,
    date: "June 2025",
  },
];

export default function TestimonialsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Testimonial submitted:", formData);
    setFormData({ name: "", email: "", rating: 5, message: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Customer Testimonials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our satisfied customers who have experienced the beauty
            and quality of our authentic Aso-Oke fabrics.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed min-h-24">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submission Section */}
        <div className="bg-card rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Share Your Experience
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We love hearing from our customers! Share your testimonial and help
            others discover the beauty of authentic Aso-Oke.
          </p>

          {!showForm ? (
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowForm(true)}
            >
              Submit Your Testimonial
            </Button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= formData.rating
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Share your experience with our Aso-Oke fabrics..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Submit Testimonial
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
