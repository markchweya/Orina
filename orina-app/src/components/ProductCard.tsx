"use client";

import { useCart } from "@/lib/cartStore";

export default function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string | null;
    price_kes: number;
  };
}) {
  const add = useCart((s) => s.add);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_12px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      {/* soft glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-orina-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-orina-hot/15 blur-3xl" />

      <div className="relative z-10 flex gap-5">
        {/* image placeholder (swap for real image_url later) */}
        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orina-primary/40 via-white/5 to-orina-hot/20">
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(244,182,58,0.35),transparent_55%)]" />
          <div className="grid h-full w-full place-items-center text-3xl">🥚</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs tracking-wide text-orina-cream/70">
            Orina Groceries
          </div>

          <h3 className="mt-1 truncate text-xl font-semibold text-orina-cream">
            {product.name}
          </h3>

          {product.description ? (
            <p className="mt-1 line-clamp-2 text-sm text-orina-cream/70">
              {product.description}
            </p>
          ) : null}

          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
              <div className="text-[11px] uppercase tracking-wide text-orina-cream/60">
                Price
              </div>
              <div className="text-lg font-bold text-orina-cream">
                KES {product.price_kes}
              </div>
            </div>

            <button
              onClick={() => add(product)}
              className="rounded-2xl bg-orina-accent px-5 py-3 text-sm font-semibold text-orina-ink shadow-[0_10px_30px_rgba(244,182,58,0.25)] transition hover:translate-y-[-1px] hover:opacity-95 active:translate-y-0"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 top-0 h-full w-48 rotate-12 bg-white/5 blur-xl" />
      </div>
    </div>
  );
}
