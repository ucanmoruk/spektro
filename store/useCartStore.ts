import { create } from "zustand";
import { Product } from "@/data/mockProducts";

type DirectSaleItem = Product & { quantity: number };

type CartState = {
  directSaleItems: DirectSaleItem[];
  quoteItems: Product[];
  addProduct: (product: Product) => void;
  removeDirectSaleItem: (productId: string) => void;
  removeQuoteItem: (productId: string) => void;
  clearDirectSale: () => void;
  clearQuote: () => void;
  directSaleTotal: () => number;
  totalCount: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  directSaleItems: [],
  quoteItems: [],

  addProduct: (product) => {
    if (product.isDirectSale) {
      set((state) => {
        const existing = state.directSaleItems.find((item) => item.id === product.id);
        if (existing) {
          return {
            directSaleItems: state.directSaleItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          };
        }
        return {
          directSaleItems: [...state.directSaleItems, { ...product, quantity: 1 }],
        };
      });
      return;
    }

    set((state) => {
      if (state.quoteItems.some((item) => item.id === product.id)) {
        return state;
      }
      return { quoteItems: [...state.quoteItems, product] };
    });
  },

  removeDirectSaleItem: (productId) =>
    set((state) => ({
      directSaleItems: state.directSaleItems.filter((item) => item.id !== productId),
    })),

  removeQuoteItem: (productId) =>
    set((state) => ({
      quoteItems: state.quoteItems.filter((item) => item.id !== productId),
    })),

  clearDirectSale: () => set({ directSaleItems: [] }),
  clearQuote: () => set({ quoteItems: [] }),

  directSaleTotal: () =>
    get().directSaleItems.reduce((sum, item) => {
      if (item.price === null) return sum;
      return sum + item.price * item.quantity;
    }, 0),

  totalCount: () => {
    const directCount = get().directSaleItems.reduce((sum, item) => sum + item.quantity, 0);
    const quoteCount = get().quoteItems.length;
    return directCount + quoteCount;
  },
}));

