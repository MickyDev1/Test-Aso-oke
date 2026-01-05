"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

import { addDoc, collection, serverTimestamp, getFirestore } from "firebase/firestore";
import { auth, app } from "@/lib/firebase.client";

const db = getFirestore(app);

const WHATSAPP_NUMBER = "2348012345678"; // <-- change to your business WhatsApp number (no +)

function buildWhatsAppMessage(params: {
  orderId: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number;
  shippingFee: number;
  vat: number;
  total: number;
}) {
  const { orderId, items, subtotal, shippingFee, vat, total } = params;

  const lines = items.map(
    (i) =>
      `• ${i.name} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}`
  );

  const message =
    `Hello Aso-Oke Store 👋\n\n` +
    `I’d like to place an order.\n\n` +
    `Order ID: ${orderId}\n\n` +
    `Items:\n${lines.join("\n")}\n\n` +
    `Subtotal: ₦${subtotal.toLocaleString()}\n` +
    `Shipping: ₦${shippingFee.toLocaleString()}\n` +
    `VAT (7.5%): ₦${vat.toLocaleString()}\n` +
    `Total: ₦${total.toLocaleString()}\n\n` +
    `Please confirm availability. Once confirmed, kindly send a Paystack/Flutterwave payment link.\n`;

  return encodeURIComponent(message);
}

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
      return;
    }

    // Totals (same logic you already show)
    const subtotal = cartTotal;
    const shippingFee = 2000;
    const vat = Math.round(subtotal * 0.075);
    const total = subtotal + shippingFee + vat;

    try {
      // 1) Create order in Firestore
      const ref = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customerName: user.displayName || "",
        customerEmail: user.email || "",
        items: cartItems.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image || "",
        })),
        subtotal,
        shippingFee,
        vat,
        total,
        status: "pending", // pending -> confirmed -> paid -> shipped -> completed
        channel: "whatsapp",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 2) Open WhatsApp with message containing the order ID
      const text = buildWhatsAppMessage({
        orderId: ref.id,
        items: cartItems.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        shippingFee,
        vat,
        total,
      });

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      window.location.href = waUrl;

      // Optional: you can also redirect user to /profile after WhatsApp opens
      // router.push("/profile");
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to create order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
          <h1 className="text-4xl font-serif font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl text-muted-foreground mb-6">
              Your cart is empty
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-lg mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.description}
                      </p>
                      <p className="text-primary font-bold text-lg">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-foreground hover:text-primary font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-foreground hover:text-primary font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border text-right">
                    <p className="text-sm text-muted-foreground">
                      Subtotal:{" "}
                      <span className="font-bold text-foreground">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">₦2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">
                      ₦{Math.round(cartTotal * 0.075).toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">
                      ₦
                      {(
                        cartTotal +
                        2000 +
                        Math.round(cartTotal * 0.075)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3"
                  size="lg"
                >
                  Proceed to WhatsApp Checkout
                </Button>

                <Link href="/shop" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
