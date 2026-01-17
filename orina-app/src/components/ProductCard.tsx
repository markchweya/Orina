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
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(99,102,241,0.10),rgba(251,191,36,0.16),rgba(244,63,94,0.08))]">
        <button
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow"
          aria-label="Favorite"
          title="Favorite"
        >
          ❤️
        </button>

        <div className="grid h-40 w-full place-items-center">
          <div className="text-6xl">🥚</div>
        </div>
      </div>

      {/* Text */}
      <div className="mt-4">
        <div className="text-xs font-semibold text-slate-500">Orina</div>

        <div className="mt-1 line-clamp-1 text-lg font-extrabold text-slate-900">
          {product.name}
        </div>

        <div className="mt-1 line-clamp-2 text-sm text-slate-600">
          {product.description ?? "Fresh groceries, delivered fast."}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Price</div>
            <div className="text-lg font-extrabold text-slate-900">
              KES {product.price_kes}
            </div>
          </div>

          <button
            onClick={() => add(product)}
            className="rounded-2xl bg-amber-400 px-4 py-3 text-sm font-extrabold text-slate-900 shadow-[0_12px_26px_rgba(251,191,36,0.30)] transition hover:opacity-95 active:translate-y-[1px]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
