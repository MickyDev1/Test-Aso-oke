"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { app } from "@/lib/firebase.client";
import { buildWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const db = getFirestore(app);

const ORDER_STEPS = [
  "pending",
  "confirmed",
  "paid",
  "shipped",
  "completed",
] as const;

type OrderStep = (typeof ORDER_STEPS)[number];

type OrderItem = {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
};

type OrderData = {
  id: string;
  status?: OrderStep | string;
  items?: OrderItem[];
  subtotal?: number;
  shippingFee?: number;
  vat?: number;
  total?: number;
  customerName?: string;
  customerPhone?: string;
  shippingAddress?: string;
  customerNote?: string;
  createdAt?: { toDate?: () => Date };
};

function formatMoney(n: number) {
  return `₦${(n || 0).toLocaleString()}`;
}

function getStatusIndex(status: string | undefined) {
  const normalized = (status || "pending").toLowerCase();
  const idx = ORDER_STEPS.indexOf(normalized as OrderStep);
  return idx === -1 ? 0 : idx;
}

function OrderStatusTimeline({ status }: { status: string }) {
  const currentIndex = getStatusIndex(status);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {ORDER_STEPS.map((step, index) => {
        const isActive = index <= currentIndex;
        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isActive ? "bg-primary" : "bg-muted"
              }`}
            />
            <span
              className={`text-xs uppercase tracking-wide ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const orderId = params?.id ?? "";
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!orderId) return;

    const orderRef = doc(db, "orders", orderId);
    const unsub = onSnapshot(orderRef, (snap) => {
      if (!snap.exists()) {
        setOrder(null);
        setLoading(false);
        return;
      }

      setOrder({ id: snap.id, ...(snap.data() as any) });
      setLoading(false);
    });

    return () => unsub();
  }, [orderId]);

  const totals = useMemo(() => {
    if (!order) return null;
    const subtotal = order.subtotal ?? 0;
    const shippingFee = order.shippingFee ?? 0;
    const vat = order.vat ?? 0;
    const total = order.total ?? subtotal + shippingFee + vat;

    return { subtotal, shippingFee, vat, total };
  }, [order]);

  const whatsappLink = useMemo(() => {
    if (!order || !origin) return "";

    const items = (order.items || []).map((item) => ({
      name: item.name || "Item",
      price: item.price || 0,
      quantity: item.quantity || 1,
      image: item.image || "",
    }));

    const text = buildWhatsAppMessage({
      orderId: order.id,
      items,
      subtotal: totals?.subtotal || 0,
      shippingFee: totals?.shippingFee || 0,
      vat: totals?.vat || 0,
      total: totals?.total || 0,
      origin,
      customerName: order.customerName,
      phone: order.customerPhone,
      address: order.shippingAddress,
      note: order.customerNote,
    });

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }, [order, origin, totals]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-10 text-center max-w-lg">
          <h1 className="text-2xl font-serif font-bold mb-4">
            Order not found
          </h1>
          <p className="text-muted-foreground mb-6">
            We could not locate that order. Please check the order link and try
            again.
          </p>
          <Link href="/shop">
            <Button className="w-full">Browse the collection</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold">Order confirmation</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your order. Please confirm on WhatsApp to continue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-xl font-semibold font-mono">{order.id}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {order.createdAt?.toDate?.().toLocaleDateString?.() || ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Current status
                  </p>
                  <p className="text-lg font-semibold capitalize">
                    {order.status || "pending"}
                  </p>
                </div>
              </div>

              <OrderStatusTimeline status={order.status || "pending"} />
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Items</h2>
              <div className="space-y-4">
                {(order.items || []).map((item, idx) => (
                  <div
                    key={`${order.id}-${idx}`}
                    className="flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatMoney((item.price || 0) * (item.quantity || 1))}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">
                Order summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    {formatMoney(totals?.subtotal || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {formatMoney(totals?.shippingFee || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT</span>
                  <span className="font-semibold">
                    {formatMoney(totals?.vat || 0)}
                  </span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">
                    {formatMoney(totals?.total || 0)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-serif font-bold mb-3">
                Next step: WhatsApp confirmation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use WhatsApp to confirm stock and receive a payment link.
              </p>
              <Button asChild size="lg" className="w-full">
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  Continue on WhatsApp
                </a>
              </Button>
            </Card>

            <Link href="/shop">
              <Button variant="outline" className="w-full">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
