import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price_kes: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (p: { id: string; name: string; price_kes: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (p) =>
    set((s) => {
      const existing = s.items.find((x) => x.id === p.id);
      if (existing) {
        return {
          items: s.items.map((x) =>
            x.id === p.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      }
      return { items: [...s.items, { ...p, qty: 1 }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  setQty: (id, qty) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === id ? { ...x, qty } : x)),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, x) => sum + x.price_kes * x.qty, 0),
}));
