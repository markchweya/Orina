"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cartStore";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total);
  const clear = useCart((s) => s.clear);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      items.length > 0 &&
      email.trim().includes("@") &&
      phone.trim().length >= 7 &&
      location.trim().length >= 2 &&
      houseNumber.trim().length >= 1
    );
  }, [items, email, phone, location, houseNumber]);

  async function submit() {
    setErr(null);
    setDone(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer_email: email,
          customer_phone: phone,
          location,
          house_number: houseNumber,
          items: items.map((x) => ({
            product_id: x.id,
            name: x.name,
            qty: x.qty,
            unit_price_kes: x.price_kes,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      clear();
      setDone(`Order received! We’ll contact you shortly. Order ID: ${data.order_id}`);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-orina-cream">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-extrabold text-orina-primary">Checkout</h1>
        <p className="mt-1 text-sm text-orina-ink/70">Payment is on delivery.</p>

        <div className="mt-6 rounded-2xl border border-orina-primary/15 bg-white p-6">
          <h2 className="text-lg font-bold text-orina-ink">Your cart</h2>
          <div className="mt-3 space-y-2 text-sm">
            {items.map((x) => (
              <div key={x.id} className="flex justify-between">
                <div>
                  {x.name} <span className="opacity-60">× {x.qty}</span>
                </div>
                <div>KES {x.price_kes * x.qty}</div>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
              <div>Total</div>
              <div>KES {total()}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orina-primary/15 bg-white p-6">
          <h2 className="text-lg font-bold text-orina-ink">Delivery details</h2>

          <div className="mt-4 grid gap-3">
            <input className="rounded-xl border p-3" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="rounded-xl border p-3" placeholder="Phone number"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className="rounded-xl border p-3" placeholder="Location (Estate/Area)"
              value={location} onChange={(e) => setLocation(e.target.value)} />
            <input className="rounded-xl border p-3" placeholder="House / Apartment number"
              value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />

            <button
              disabled={!canSubmit || loading}
              onClick={submit}
              className="rounded-xl bg-orina-accent px-4 py-3 font-semibold text-orina-ink disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Place order"}
            </button>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            {done ? <p className="text-sm text-green-700">{done}</p> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
