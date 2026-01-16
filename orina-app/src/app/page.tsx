// src/app/page.tsx
import ProductCard from "@/components/ProductCard";
import CartBar from "@/components/CartBar";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default async function Home() {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("id,name,description,price_kes")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-orina-ink p-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-orina-cream shadow-[0_18px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <h1 className="text-2xl font-extrabold">Orina</h1>
          <p className="mt-2 text-sm text-red-300">
            Failed to load products: {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orina-ink">
      {/* Cinematic background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(244,182,58,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(228,87,46,0.12),transparent_55%),radial-gradient(circle_at_40%_90%,rgba(59,29,58,0.45),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-10">
        <header className="rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-orina-cream">
            Orina
          </h1>
          <p className="mt-2 max-w-xl text-orina-cream/75">
            Simple groceries. Fast delivery coordination. Payment on delivery.
          </p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {(data ?? []).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </div>

      <CartBar />
    </main>
  );
}
