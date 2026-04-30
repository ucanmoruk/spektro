import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  shortDescription: string;
  description: string;
  imageUrls: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  price: number | null;
  discountedPrice: number | null;
  sku: string;
  stock: number;
  isDirectSale: boolean;
  isActive: boolean;
};

type AdminProductsState = {
  products: AdminProduct[];
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, payload: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
};

const seedProducts: AdminProduct[] = [
  {
    id: "knauer-azura-hplc",
    name: "Knauer AZURA HPLC",
    slug: "knauer-azura-hplc",
    brand: "Knauer",
    category: "Sistemler",
    shortDescription: "Modüler analitik HPLC platformu",
    description:
      "Yüksek doğruluk ve esnek modüler mimari sunan AZURA HPLC sistemi; kalite kontrol ve Ar-Ge laboratuvarları için uygundur.",
    imageUrls: [],
    seoTitle: "Knauer AZURA HPLC | Spektrotek",
    seoDescription: "Modüler Knauer AZURA HPLC sistemleri hakkında ürün ve teklif bilgileri.",
    seoKeywords: "knauer,hplc,azura,analitik cihaz",
    price: null,
    discountedPrice: null,
    sku: "KNA-AZU-HPLC-001",
    stock: 0,
    isDirectSale: false,
    isActive: true,
  },
  {
    id: "sielc-primesep-kolon",
    name: "SIELC Primesep Kolon",
    slug: "sielc-primesep-kolon",
    brand: "SIELC",
    category: "Kolonlar",
    shortDescription: "Mixed-mode HPLC kolon",
    description:
      "İyonik ve non-polar bileşiklerde güçlü ayrım kabiliyeti sağlayan SIELC Primesep kolon serisi.",
    imageUrls: [],
    seoTitle: "SIELC Primesep Kolon | Spektrotek",
    seoDescription: "SIELC Primesep kolon ürün detayları, fiyat ve teknik özellikler.",
    seoKeywords: "sielc,primesep,kolon,hplc",
    price: 850,
    discountedPrice: null,
    sku: "SIE-PRI-COL-001",
    stock: 12,
    isDirectSale: true,
    isActive: true,
  },
];

export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set) => ({
      products: seedProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),
      updateProduct: (id, payload) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...payload } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "spektrotek-admin-products",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

