"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, ArrowLeft, Package } from "lucide-react";

import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth } from "@/lib/firebase.client";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

type OrderStatus = "pending" | "confirmed" | "paid" | "shipped" | "completed" | "cancelled";

function formatMoney(n: number) {
  return `₦${(n || 0).toLocaleString()}`;
}

export default function ProfilePage() {
  const router = useRouter();

  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // profile stored in Firestore: /users/{uid}
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // orders from Firestore: /orders where userId == uid
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }

      setFbUser(u);

      // Load profile doc
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        // create a default user profile once
        const defaultProfile = {
          name: u.displayName || "",
          email: u.email || "",
          phone: "",
          address: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(userRef, defaultProfile);

        setProfile({
          name: defaultProfile.name,
          email: defaultProfile.email,
          phone: defaultProfile.phone,
          address: defaultProfile.address,
        });
        setEditForm({
          name: defaultProfile.name,
          email: defaultProfile.email,
          phone: defaultProfile.phone,
          address: defaultProfile.address,
        });
      } else {
        const data: any = snap.data();
        const p = {
          name: data.name || u.displayName || "",
          email: data.email || u.email || "",
          phone: data.phone || "",
          address: data.address || "",
        };
        setProfile(p);
        setEditForm(p);
      }

      // Live orders listener (dynamic history)
      const q = query(
        collection(db, "orders"),
        where("userId", "==", u.uid),
        orderBy("createdAt", "desc")
      );

      const unsubOrders = onSnapshot(q, (s) => {
        setOrders(s.docs.map((d) => ({ id: d.id, ...d.data() })));
      });

      setLoading(false);

      return () => unsubOrders();
    });

    return () => unsub();
  }, [router]);

  const handleSave = async () => {
    if (!fbUser) return;

    const userRef = doc(db, "users", fbUser.uid);
    await updateDoc(userRef, {
      name: editForm.name,
      email: editForm.email, // optional: you can keep email read-only if you prefer
      phone: editForm.phone,
      address: editForm.address,
      updatedAt: serverTimestamp(),
    });

    setProfile(editForm);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "confirmed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-serif font-bold">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-serif font-bold">{profile.name || "—"}</h2>
              </div>

              {!isEditing ? (
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">{profile.email || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">{profile.phone || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground font-medium">{profile.address || "—"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      setEditForm(profile);
                      setIsEditing(false);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Order History
              </h2>
            </div>

            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg text-muted-foreground mb-6">No orders yet</p>
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-border">
                      <div>
                        <h3 className="font-serif font-bold text-lg">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.createdAt?.toDate?.().toLocaleDateString?.() || ""}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold text-primary">
                            {formatMoney(order.total)}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            order.status || "pending"
                          )}`}
                        >
                          {order.status || "pending"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-muted-foreground uppercase">
                        Items
                      </p>

                      {(order.items || []).map((item: any, idx: number) => (
                        <div
                          key={`${order.id}-${idx}`}
                          className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatMoney((item.price || 0) * (item.quantity || 0))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
