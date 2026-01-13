import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import image from "../../public/aso-oke-weaving-process-traditional-craft-hands.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating tradition, craftsmanship, and cultural heritage through
            authentic Aso-Oke fabrics.
          </p>
        </div>

        {/* Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  items-center mb-20">
          <div>
            <img
              src="/aso-oke-weaving-process-traditional-craft-hands.jpg"
              alt="Aso-Oke weaving process"
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">
              The Art of Aso-Oke
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Aso-Oke, meaning "cloth from the top," is a handwoven textile with 
              deep roots in Yoruba culture. For generations, this fabric has
              been an essential part of traditional ceremonies, celebrations,
              and formal attire. It is known for its vibrant colors, intricate
              patterns, and intricate weaving techniques.
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Each piece is meticulously crafted using traditional looms,
              requiring exceptional skill and patience. The vibrant colors and
              intricate patterns represent the weaver's creativity and cultural
              pride. Aso-Oke is a symbol of tradition, craftsmanship, and
              cultural heritage.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our mission is to preserve this ancient tradition while making it
              accessible to the modern world, ensuring that future generations
              can appreciate this beautiful art form. We believe that Aso-Oke is
              a symbol of beauty, elegance, and cultural heritage, and we are
              committed to preserving its legacy for generations to come.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="p-8">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To create exceptional, handcrafted Aso-Oke fabrics that honor
              tradition while celebrating contemporary style and elegance. We
              strive to provide our customers with the highest quality products
              and unparalleled service.
            </p>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the leading global destination for authentic, premium
              Aso-Oke fabrics, preserving cultural heritage for generations to
              come. We envision a world where traditional craftsmanship is
              celebrated and cherished.
            </p>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Our Values
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Quality craftsmanship, cultural authenticity, sustainability, and
              customer satisfaction guide everything we do. We are committed to
              excellence in every aspect of our business. We believe in
              continuous learning and innovation to stay ahead of the changing
              market.
            </p>
          </Card>
        </div>

        {/* Meet the Founder */}
        <div className="bg-card rounded-lg p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/micky dev.jpg" alt="Founder" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">
                Meet Our Founder
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                With decades of experience in textile arts and cultural
                preservation, our founder has dedicated her life to championing
                the craft of Aso-Oke weaving. Her vision was to create a brand
                that not only produces exquisite fabrics but also educates the
                world about the rich heritage behind each weave. With a deep
                understanding of the weaving process and a passion for
                preserving cultural traditions, Micky Oke, the founder of Aso-Oke
                Fabrics, has set the standard for authentic Aso-Oke fabrics. She
                believes that Aso-Oke is not just a fabric, but a symbol of
                tradition, creativity, and cultural heritage.
              </p>
              <blockquote className="text-xl font-serif italic text-primary mb-8">
                "Every thread tells a story. Every color carries meaning.
                Aso-Oke isn't just fabric—it's cultural memory woven into
                cloth."
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Her passion for maintaining traditional techniques while
                innovating for modern markets has made us a trusted name in
                authentic Aso-Oke fabrics worldwide. We are committed to
                preserving the craftsmanship and cultural heritage of Aso-Oke,
                ensuring that every piece is a true masterpiece.
              </p>
            </div>
          </div>
        </div>

        {/* Craftsmanship */}
        <div className="mb-20">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">
            Our Craftsmanship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Quality Materials",
                description:
                  "We source the finest cotton and materials to ensure durability and vibrancy.",
              },
              {
                title: "Traditional Looms",
                description:
                  "Each piece is woven using time-honored techniques on traditional looms.",
              },
              {
                title: "Attention to Detail",
                description:
                  "Every pattern is carefully executed for perfect alignment and beauty.",
              },
              {
                title: "Cultural Authenticity",
                description:
                  "We honor traditional patterns while embracing modern design sensibilities.",
              },
            ].map((craft, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-serif font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-3">
                  {craft.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {craft.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Explore our collection and discover why discerning customers choose
            authentic Aso-Oke for their most important occasions. Each piece is
            a testament to timeless craftsmanship and cultural heritage. Join us
            in celebrating the art of Aso-Oke.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/shop">Shop Our Collection Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
