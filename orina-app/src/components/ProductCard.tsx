"use client";

import { useCart } from "@/lib/cartStore";

export default function ProductCard({
  product,
}: {
  product: { id: string; name: string; description: string | null; price_kes: number };
}) {
  const add = useCart((s) => s.add);

  return (
    <div className="rounded-2xl border border-orina-primary/15 bg-white/70 p-5 shadow-sm">
      <div className="text-sm text-orina-primary/70">Orina Groceries</div>
      <h3 className="mt-1 text-xl font-semibold text-orina-ink">{product.name}</h3>
      {product.description ? (
        <p className="mt-1 text-sm text-orina-ink/70">{product.description}</p>
      ) : null}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold text-orina-primary">
          KES {product.price_kes}
        </div>
        <button
          onClick={() => add(product)}
          className="rounded-xl bg-orina-accent px-4 py-2 text-sm font-semibold text-orina-ink hover:opacity-90"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
