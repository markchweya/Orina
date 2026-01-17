"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function CartBar() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total);

  const count = items.reduce((n, x) => n + x.qty, 0);
  if (count === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(860px,calc(100%-2rem))] -translate-x-1/2">
      <div className="flex items-center justify-between gap-3 rounded-3xl border border-orina-line bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur">
        <div className="text-sm">
          <span className="font-extrabold text-orina-ink">{count} item(s)</span>
          <span className="mx-2 text-orina-slate">•</span>
          <span className="text-orina-slate">Total</span>{" "}
          <span className="font-extrabold text-orina-ink">KES {total()}</span>
        </div>

        <Link
          href="/checkout"
          className="rounded-2xl bg-orina-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(79,70,229,0.25)] transition hover:opacity-95 active:translate-y-[1px]"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
