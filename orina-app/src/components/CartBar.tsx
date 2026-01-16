"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function CartBar() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total);

  const count = items.reduce((n, x) => n + x.qty, 0);
  if (count === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(760px,calc(100%-2rem))] -translate-x-1/2">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-orina-accent/20 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="text-sm text-orina-cream/80">
            <span className="font-semibold text-orina-cream">{count} item(s)</span>
            <span className="mx-2 opacity-40">•</span>
            <span className="opacity-80">Total:</span>{" "}
            <span className="font-semibold text-orina-cream">KES {total()}</span>
          </div>

          <Link
            href="/checkout"
            className="rounded-2xl bg-orina-accent px-5 py-3 text-sm font-semibold text-orina-ink shadow-[0_10px_30px_rgba(244,182,58,0.22)] transition hover:translate-y-[-1px] hover:opacity-95 active:translate-y-0"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
