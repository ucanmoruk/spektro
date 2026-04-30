export type ProductCategory = "Sistemler" | "Kolonlar" | "Yedek Parçalar";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number | null;
  isDirectSale: boolean;
};

export const mockProducts: Product[] = [
  {
    id: "knauer-azura-hplc",
    name: "Knauer AZURA HPLC",
    brand: "Knauer",
    category: "Sistemler",
    price: null,
    isDirectSale: false,
  },
  {
    id: "sielc-primesep-kolon",
    name: "SIELC Primesep Kolon",
    brand: "SIELC",
    category: "Kolonlar",
    price: 850,
    isDirectSale: true,
  },
  {
    id: "knauer-uhplc-pompa-modulu",
    name: "Knauer UHPLC Pompa Modülü",
    brand: "Knauer",
    category: "Sistemler",
    price: null,
    isDirectSale: false,
  },
  {
    id: "sielc-obelisc-n",
    name: "SIELC Obelisc N Kolon",
    brand: "SIELC",
    category: "Kolonlar",
    price: 990,
    isDirectSale: true,
  },
  {
    id: "hplc-septa-kit",
    name: "HPLC Septa & Kapak Kiti",
    brand: "PreXpert",
    category: "Yedek Parçalar",
    price: 120,
    isDirectSale: true,
  },
  {
    id: "autosampler-seal-kit",
    name: "Autosampler Seal Kit",
    brand: "Knauer",
    category: "Yedek Parçalar",
    price: 180,
    isDirectSale: true,
  },
];

