// Uygulama genelinde kullanılan alan (domain) tipleri.
// DB satırları repository katmanında bu camelCase tiplere dönüştürülür.

export type UserRole = "customer" | "admin";

export type User = {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  invoiceType: "individual" | "corporate";
  company: string | null;
  taxOffice: string | null;
  taxNumber: string | null;
  address: string | null;
  city: string | null;
  district: string | null;
  role: UserRole;
  createdAt: string;
};

export type Brand = {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number;
};

export type ProductImage = {
  id: number;
  url: string;
  alt: string | null;
  sortOrder: number;
};

export type ProductSpec = {
  slug: string;
  label: string;
  value: string;
};

export type FeaturedSlot = "best-discount" | "weekly-product" | "new-arrival";

export type Product = {
  id: number;
  slug: string;
  name: string;
  brandId: number | null;
  brandName: string | null;
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  sku: string | null;
  shortDescription: string | null;
  description: string | null;
  shippingInfo: string | null;
  price: number | null;
  discountedPrice: number | null;
  currency: string;
  stock: number;
  isDirectSale: boolean;
  isActive: boolean;
  featuredSlot: FeaturedSlot | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  primaryImage: string | null;
  images: ProductImage[];
  specs: ProductSpec[];
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

export type OrderItem = {
  id: number;
  productId: number | null;
  name: string;
  sku: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: number;
  orderNumber: string;
  userId: number | null;
  status: OrderStatus;
  currency: string;
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  invoiceType: "individual" | "corporate";
  company: string | null;
  taxOffice: string | null;
  taxNumber: string | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingCountry: string | null;
  notes: string | null;
  paymentProvider: string | null;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

export type QuoteStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type QuoteRequest = {
  id: number;
  userId: number | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  status: QuoteStatus;
  createdAt: string;
  items: { id: number; name: string; brand: string | null; quantity: number }[];
};
