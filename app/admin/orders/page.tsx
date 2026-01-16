"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";

import { auth } from "@/lib/firebase.client";

const db = getFirestore();
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

const ADMIN_UID = "VcFK4VLkPbet7MAvYx35ds17C143";

function formatMoney(n: number) {
  return `₦${(n || 0).toLocaleString()}`;
}

export default function AdminOrdersPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.uid !== ADMIN_UID) {
        router.push("/");
        return;
      }

      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const unsubOrders = onSnapshot(q, (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(list);
        setLoading(false);
      });

      return () => unsubOrders();
    });

    return () => unsubAuth();
  }, [router]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => (o.status || "pending") === statusFilter);
  }, [orders, statusFilter]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to update status");
    }
  };

  const copyWhatsAppReply = async (order: any) => {
    const orderId = order.id;
    const name = order.customerName || "there";
    const total = formatMoney(order.total);

    const text =
      `Hi ${name}, thanks for your order ✅\n\n` +
      `Order ID: ${orderId}\n` +
      `Total: ${total}\n\n` +
      `Stock confirmed. Please pay using this Paystack/Flutterwave link:\n` +
      `[PASTE PAYMENT LINK HERE]\n\n` +
      `After payment, kindly send proof of payment and your delivery address.`;

    try {
      await navigator.clipboard.writeText(text);
      alert("WhatsApp reply copied ✅");
    } catch {
      alert("Could not copy. Your browser may block clipboard access.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Orders</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all customer orders.
            </p>
          </div>

          <Link href="/profile">
            <Button variant="outline">Back to Profile</Button>
          </Link>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              "all",
              "pending",
              "confirmed",
              "paid",
              "shipped",
              "completed",
              "cancelled",
            ] as const
          ).map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              onClick={() => setStatusFilter(s)}
              className="capitalize"
            >
              {s}
            </Button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">
              No orders found for this filter.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold">
                      Order ID: <span className="font-mono">{order.id}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Customer: {order.customerName || "—"} •{" "}
                      {order.customerEmail || "—"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Status:{" "}
                      <span className="capitalize">
                        {order.status || "pending"}
                      </span>{" "}
                      • Channel: {order.channel || "—"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-bold text-primary">
                      {formatMoney(order.total)}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Items
                  </div>
                  <div className="space-y-2">
                    {(order.items || []).map((item: any, idx: number) => (
                      <div
                        key={`${order.id}-${idx}`}
                        className="flex justify-between text-sm"
                      >
                        <div>
                          {item.name}{" "}
                          <span className="text-muted-foreground">
                            x{item.quantity}
                          </span>
                        </div>
                        <div className="font-semibold">
                          {formatMoney(
                            (item.price || 0) * (item.quantity || 0)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyWhatsAppReply(order)}
                  >
                    Copy WhatsApp Payment Reply
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, "confirmed")}
                  >
                    Mark Confirmed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, "paid")}
                  >
                    Mark Paid
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, "shipped")}
                  >
                    Mark Shipped
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, "completed")}
                  >
                    Mark Completed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, "cancelled")}
                  >
                    Mark Cancelled
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
