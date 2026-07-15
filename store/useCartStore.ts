import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// DB'den bağımsız, hafif sepet kalemi (client tarafı).
export type CartLine = {
  id: number;
  slug: string;
  name: string;
  brand: string | null;
  price: number | null;
  currency: string;
  image: string | null;
  isDirectSale: boolean;
  quantity: number;
};

export type CartInput = Omit<CartLine, "quantity">;

export type CartNotice = {
  name: string;
  image: string | null;
  kind: "buy" | "quote";
  ts: number;
};

type CartState = {
  buyItems: CartLine[]; // doğrudan satış (sepet)
  quoteItems: CartLine[]; // teklif talep edilecek sistemler
  notice: CartNotice | null; // son eklenen ürün bildirimi (toast)
  clearNotice: () => void;
  addProduct: (product: CartInput, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  removeBuyItem: (id: number) => void;
  removeQuoteItem: (id: number) => void;
  clearBuy: () => void;
  clearQuote: () => void;
  clearAll: () => void;
  buyTotal: () => number;
  totalCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      buyItems: [],
      quoteItems: [],
      notice: null,

      clearNotice: () => set({ notice: null }),

      addProduct: (product, quantity = 1) => {
        set({
          notice: {
            name: product.name,
            image: product.image,
            kind: product.isDirectSale ? "buy" : "quote",
            ts: Date.now(),
          },
        });
        if (product.isDirectSale) {
          set((state) => {
            const existing = state.buyItems.find((i) => i.id === product.id);
            if (existing) {
              return {
                buyItems: state.buyItems.map((i) =>
                  i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
                ),
              };
            }
            return { buyItems: [...state.buyItems, { ...product, quantity }] };
          });
          return;
        }
        set((state) => {
          if (state.quoteItems.some((i) => i.id === product.id)) return state;
          return { quoteItems: [...state.quoteItems, { ...product, quantity: 1 }] };
        });
      },

      setQuantity: (id, quantity) =>
        set((state) => ({
          buyItems: state.buyItems
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
            .filter((i) => i.quantity > 0),
        })),

      removeBuyItem: (id) =>
        set((state) => ({ buyItems: state.buyItems.filter((i) => i.id !== id) })),
      removeQuoteItem: (id) =>
        set((state) => ({ quoteItems: state.quoteItems.filter((i) => i.id !== id) })),

      clearBuy: () => set({ buyItems: [] }),
      clearQuote: () => set({ quoteItems: [] }),
      clearAll: () => set({ buyItems: [], quoteItems: [] }),

      buyTotal: () =>
        get().buyItems.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0),

      totalCount: () => {
        const buy = get().buyItems.reduce((s, i) => s + i.quantity, 0);
        return buy + get().quoteItems.length;
      },
    }),
    {
      name: "spektrotek-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ buyItems: state.buyItems, quoteItems: state.quoteItems }),
    },
  ),
);
