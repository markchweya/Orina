// src/app/page.tsx
import ProductCard from "@/components/ProductCard";
import CartDock from "@/components/CartDock";
import { supabaseBrowser } from "@/lib/supabaseClient";

const categories = ["Popular", "Eggs", "Dairy", "Fruits", "Veg", "Snacks"];

export default async function Home() {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("id,name,description,price_kes")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F8FB] px-5 py-10 text-slate-900">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6">
          <h1 className="text-2xl font-extrabold">Orina</h1>
          <p className="mt-2 text-sm text-red-600">
            Failed to load products: {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FB] text-slate-900">
      {/* Clean light background (no dark blobs) */}
      <div className="pointer-events-none fixed inset-0">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
        {/* soft top glow */}
        <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-28 pt-8 md:pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold tracking-tight">Orina</div>
            <div className="mt-1 text-sm text-slate-600">
              Pay on delivery • We confirm by phone
            </div>
          </div>

          <button className="hidden md:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <span>🛒</span>
            <span>Cart</span>
          </button>
        </div>

        {/* Hero */}
        <section className="mt-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 md:grid-cols-[1fr_360px]">
            {/* Left */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                Fresh groceries, simplified.
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                Add to cart, checkout with phone + location. We call to confirm
                delivery time. Payment is always on delivery.
              </p>

              {/* Search */}
              <div className="mt-5 flex max-w-2xl items-center gap-3">
                <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
                  <span className="text-slate-500">🔎</span>
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500/70"
                    placeholder="Search products (next)"
                    disabled
                  />
                </div>

                <button className="h-12 shrink-0 rounded-2xl bg-amber-400 px-5 text-sm font-extrabold text-slate-900 shadow-[0_12px_26px_rgba(251,191,36,0.30)]">
                  Go
                </button>
              </div>

              {/* Category pills */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                {categories.map((c, i) => (
                  <button
                    key={c}
                    className={
                      "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition " +
                      (i === 0
                        ? "bg-indigo-600 text-white shadow-[0_10px_24px_rgba(99,102,241,0.22)]"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Tiny trust row */}
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-2">
                  ✅ Fresh today
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-2">
                  📍 Nairobi delivery
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-2">
                  ☎️ We confirm by phone
                </span>
              </div>
            </div>

            {/* Right highlight */}
            <div className="border-t border-slate-200 bg-slate-50 p-6 md:border-l md:border-t-0 md:p-8">
              <div className="text-xs font-semibold text-slate-500">
                Today’s highlight
              </div>

              <div className="mt-2 rounded-3xl border border-slate-200 bg-white p-5">
                <div className="text-lg font-extrabold text-slate-900">
                  Eggs (Tray)
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Fresh • Packed safely • Delivered fast
                </div>

                <div className="mt-4 grid gap-2">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="text-xs font-semibold text-slate-500">
                      Payment
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      On delivery
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="text-xs font-semibold text-slate-500">
                      Confirmation
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Phone call / SMS
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Tip: add your exact estate + house number at checkout.
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-xl font-extrabold text-slate-900">
                Popular items
              </div>
              <div className="text-sm text-slate-600">Fresh today</div>
            </div>
            <button className="text-sm font-bold text-indigo-600 hover:opacity-80">
              View all →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      <CartDock />
    </main>
  );
}
