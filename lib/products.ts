export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  hook: string;
  benefits: string[];
  cta: string;
  customizable: boolean;
  image: string;
  images: string[];
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Purple Aso-Oke",
    price: 45000,
    hook: "Own the room with rich royal purple.",
    description:
      "Dense handwoven texture with bold color depth for premium celebratory looks.",
    benefits: [
      "Handwoven on traditional looms",
      "Striking shade for weddings and owambe",
      "Smooth finish that holds color",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/purple2.JPG",
    images: [
      "/purple2.JPG",
      "/product1.JPG",
      "/FB_IMG_1767943671776.JPG",
      "/FB_IMG_1767943658837.JPG",
    ],
    rating: 5,
  },
  {
    id: 2,
    name: "Royal Blue Aso-Oke",
    price: 42000,
    hook: "Classic royal blue with a modern glow.",
    description:
      "Premium Aso-Oke woven for sharp, confident looks at special events.",
    benefits: [
      "Rich tone with clean pattern definition",
      "Ideal for weddings and engagements",
      "Durable weave for repeat wear",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/royalblue.JPG",
    images: [
      "/royalblue.JPG",
      "/11480f63fe4f4e55a11a51d6da9d3580.JPG",
      "/FB_IMG_1765202837585.JPG",
      "/FB_IMG_1767118857808.JPG",
    ],
    rating: 5,
  },
  {
    id: 3,
    name: "Black & White Aso-Oke",
    price: 43000,
    hook: "Crisp contrast that never fades.",
    description:
      "Timeless black-and-white weave with clean lines and a premium handfeel.",
    benefits: [
      "High-contrast pattern that photographs well",
      "Perfect for traditional ceremonies",
      "Handwoven for lasting structure",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/blackandwhite.JPG",
    images: ["/blackandwhite.JPG", "/FB_IMG_1767943549905.JPG"],
    rating: 5,
  },
  {
    id: 4,
    name: "Sky Blue Aso-Oke",
    price: 40000,
    hook: "Light, airy, and celebration-ready.",
    description:
      "Soft sky-blue weave that brings effortless elegance to traditional attire.",
    benefits: [
      "Gentle tone with premium texture",
      "Great for weddings and cultural events",
      "Handwoven for durability and comfort",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/sky-blue-aso-oke-fabric-light.jpg",
    images: ["/sky-blue-aso-oke-fabric-light.jpg"],
    rating: 5,
  },
  {
    id: 5,
    name: "Signature Aso-Oke",
    price: 38000,
    hook: "Signature weave, modern energy.",
    description:
      "Refined handwoven Aso-Oke with lively tones and a polished finish.",
    benefits: [
      "Clean, premium texture",
      "Vibrant colorwork for standout looks",
      "Ideal for gele, iro, and agbada",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/product1.JPG",
    images: ["/product1.JPG", "/purple2.JPG", "/FB_IMG_1767943658837.JPG"],
    rating: 5,
  },
  {
    id: 6,
    name: "Heritage Aso-Oke",
    price: 39000,
    hook: "Heritage patterns with everyday luxury.",
    description:
      "Classic motif woven for comfort, durability, and tradition-forward style.",
    benefits: [
      "Authentic heritage-inspired patterns",
      "Strong weave for long-term wear",
      "Suitable for ceremonies and gifting",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/prodcut2.JPG",
    images: ["/prodcut2.JPG"],
    rating: 5,
  },
  {
    id: 7,
    name: "Aso-Oke Fabric No. 7",
    price: 41000,
    hook: "Deep color, bold presence.",
    description:
      "Handcrafted Aso-Oke with rich depth and a clean, premium texture.",
    benefits: [
      "Handwoven for authentic craftsmanship",
      "Color depth that holds over time",
      "Made for weddings and traditional events",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/11480f63fe4f4e55a11a51d6da9d3580.JPG",
    images: [
      "/11480f63fe4f4e55a11a51d6da9d3580.JPG",
      "/FB_IMG_1765202837585.JPG",
      "/FB_IMG_1767176840623.JPG",
    ],
    rating: 5,
  },
  {
    id: 8,
    name: "Aso-Oke Fabric No. 8",
    price: 39500,
    hook: "Vibrant detail for standout moments.",
    description:
      "Intricate loom work with a celebratory finish that photographs beautifully.",
    benefits: [
      "Detailed patterning with premium feel",
      "Great for engagement and owambe",
      "Durable weave for repeat wear",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1765202837585.JPG",
    images: [
      "/FB_IMG_1765202837585.JPG",
      "/FB_IMG_1767176840623.JPG",
      "/FB_IMG_1767118857808.JPG",
    ],
    rating: 5,
  },
  {
    id: 9,
    name: "Aso-Oke Fabric No. 9",
    price: 40500,
    hook: "Ceremony-ready and undeniably premium.",
    description:
      "High-quality weave built for engagements, weddings, and cultural events.",
    benefits: [
      "Premium texture with strong structure",
      "Ideal for agbada, iro, and gele",
      "Handwoven craftsmanship you can trust",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1767118857808.JPG",
    images: [
      "/FB_IMG_1767118857808.JPG",
      "/royalblue.JPG",
      "/FB_IMG_1767176840623.JPG",
    ],
    rating: 5,
  },
  {
    id: 10,
    name: "Aso-Oke Fabric No. 10",
    price: 42000,
    hook: "Traditional texture with refined polish.",
    description:
      "Balanced patterning and smooth finish for timeless Yoruba styling.",
    benefits: [
      "Classic look with premium handfeel",
      "Perfect for traditional ceremonies",
      "Colorwork that stays vibrant",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1767176840623.JPG",
    images: ["/FB_IMG_1767176840623.JPG", "/FB_IMG_1768155402955.JPG"],
    rating: 5,
  },
  {
    id: 11,
    name: "Aso-Oke Fabric No. 11",
    price: 41500,
    hook: "Luxury you can feel at first touch.",
    description:
      "Intricate detailing and dense weave for a premium ceremonial look.",
    benefits: [
      "Handwoven for authentic texture",
      "Elegant finish for special events",
      "Durable for repeat celebrations",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1768155428512.JPG",
    images: ["/FB_IMG_1768155428512.JPG", "/IMG-20251222-WA0012.JPEG"],
    rating: 5,
  },
  {
    id: 12,
    name: "Aso-Oke Fabric No. 12",
    price: 43000,
    hook: "Bold patterning, premium presence.",
    description:
      "Statement-making Aso-Oke with strong pattern definition and rich tones.",
    benefits: [
      "Eye-catching design for big moments",
      "Premium finish that feels substantial",
      "Great for weddings and festivals",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1767943658837.JPG",
    images: [
      "/FB_IMG_1767943658837.JPG",
      "/FB_IMG_1767943671776.JPG",
      "/purple2.JPG",
    ],
    rating: 5,
  },
  {
    id: 13,
    name: "Aso-Oke Fabric No. 13",
    price: 44000,
    hook: "Vibrant weave rooted in tradition.",
    description:
      "Classic Yoruba styling with a bright, confident finish.",
    benefits: [
      "Vibrant tone with premium texture",
      "Handwoven for authentic craftsmanship",
      "Ideal for ceremonies and styling sets",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1767943671776.JPG",
    images: ["/FB_IMG_1767943671776.JPG", "/purple2.JPG", "/product1.JPG"],
    rating: 5,
  },
  {
    id: 14,
    name: "Aso-Oke Fabric No. 14",
    price: 43500,
    hook: "Celebrate in bold, handwoven style.",
    description:
      "Crafted for festive occasions with durable, clean texture.",
    benefits: [
      "Handwoven for premium structure",
      "Celebration-ready look and feel",
      "Great for weddings and owambe",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1767943677128.JPG",
    images: [
      "/FB_IMG_1767943677128.JPG",
      "/IMG_20251224_112218049.JPG",
      "/IMG_20251224_112220670.JPG",
    ],
    rating: 5,
  },
  {
    id: 15,
    name: "Aso-Oke Fabric No. 15",
    price: 40000,
    hook: "Elegant loom work for standout looks.",
    description:
      "Smooth, premium weave that elevates agbada, iro, or gele.",
    benefits: [
      "Refined finish for special occasions",
      "Durable weave with soft handfeel",
      "Photographs beautifully in daylight",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1768155402955.JPG",
    images: ["/FB_IMG_1768155402955.JPG", "/FB_IMG_1767176840623.JPG"],
    rating: 5,
  },
  {
    id: 16,
    name: "Aso-Oke Fabric No. 16",
    price: 41000,
    hook: "Ceremonial colors with premium texture.",
    description:
      "Vibrant palette and tight weave for confident traditional wear.",
    benefits: [
      "Rich tones that stand out",
      "Traditional look with premium feel",
      "Ideal for weddings and festivals",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1768155423624.JPG",
    images: ["/FB_IMG_1768155423624.JPG"],
    rating: 5,
  },
  {
    id: 17,
    name: "Aso-Oke Fabric No. 17",
    price: 42000,
    hook: "Authentic, rich, and effortlessly elegant.",
    description:
      "Handwoven for a refined look with enduring quality.",
    benefits: [
      "Authentic texture with premium weight",
      "Great for ceremonies and styling",
      "Durable for repeat use",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1768155428512.JPG",
    images: ["/FB_IMG_1768155428512.JPG", "/IMG-20251222-WA0012.JPEG"],
    rating: 5,
  },
  {
    id: 18,
    name: "Aso-Oke Fabric No. 18",
    price: 42500,
    hook: "Signature depth with intricate detail.",
    description:
      "Textured weave that holds structure and color beautifully.",
    benefits: [
      "Premium finish with rich texture",
      "Perfect for high-visibility events",
      "Handwoven craftsmanship you can trust",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/FB_IMG_1768155433508.JPG",
    images: ["/FB_IMG_1768155433508.JPG"],
    rating: 5,
  },
  {
    id: 19,
    name: "Aso-Oke Fabric No. 19",
    price: 39500,
    hook: "Modern take, traditional soul.",
    description:
      "Updated pattern with classic craftsmanship for versatile styling.",
    benefits: [
      "Contemporary look with Yoruba roots",
      "Durable weave for regular use",
      "Works for weddings and gifting",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/IMG-20251222-WA0012.JPEG",
    images: ["/IMG-20251222-WA0012.JPEG", "/FB_IMG_1768155428512.JPG"],
    rating: 5,
  },
  {
    id: 20,
    name: "Aso-Oke Fabric No. 20",
    price: 40500,
    hook: "Balanced colorwork, premium finish.",
    description:
      "Clean color blend and smooth handfeel for high-end events.",
    benefits: [
      "Premium texture that feels substantial",
      "Great for engagements and celebrations",
      "Handwoven for durability",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/IMG_20251224_112218049.JPG",
    images: [
      "/IMG_20251224_112218049.JPG",
      "/FB_IMG_1767943677128.JPG",
      "/IMG_20251224_112220670.JPG",
    ],
    rating: 5,
  },
  {
    id: 21,
    name: "Aso-Oke Fabric No. 21",
    price: 41500,
    hook: "Made for celebrations and photographs.",
    description:
      "Detailed texture that catches light and looks premium on camera.",
    benefits: [
      "Handwoven for authentic craftsmanship",
      "Textured finish that stands out",
      "Ideal for weddings and festivities",
    ],
    cta: "Order now via WhatsApp",
    customizable: true,
    image: "/IMG_20251224_112220670.JPG",
    images: [
      "/IMG_20251224_112220670.JPG",
      "/IMG_20251224_112218049.JPG",
      "/FB_IMG_1767943677128.JPG",
    ],
    rating: 5,
  },
];
