"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function CartDock() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total);
  const count = items.reduce((n, x) => n + x.qty, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="rounded-[28px] border border-slate-200 bg-white/92 px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
                🏠
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
                🔎
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
                ❤️
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
                👤
              </button>
            </div>

            <Link
              href="/checkout"
              className={
                "relative grid h-12 w-12 place-items-center rounded-full font-extrabold shadow-[0_16px_35px_rgba(251,191,36,0.35)] " +
                (count > 0
                  ? "bg-amber-400 text-slate-900"
                  : "bg-slate-200 text-slate-500 pointer-events-none")
              }
              aria-label="Checkout"
              title={count > 0 ? `Checkout (KES ${total()})` : "Cart is empty"}
            >
              🛒
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-6 min-w-[24px] place-items-center rounded-full bg-rose-500 px-2 text-xs text-white">
                  {count}
                </span>
              ) : null}
            </Link>
          </div>

          {count > 0 ? (
            <div className="mt-3 text-sm font-semibold text-slate-900">
              {count} item(s) • Total:{" "}
              <span className="font-extrabold">KES {total()}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
