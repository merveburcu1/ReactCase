import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../../types/Product";

interface ProductState {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (id: number, patch: Partial<Product>) => void;
  removeProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (p) =>
        set((s) => ({ products: [...s.products, p] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((pr) =>
            pr.id === id ? { ...pr, ...patch } : pr
          )
        })),
      removeProduct: (id) =>
        set((s) => ({
          products: s.products.filter((pr) => pr.id !== id)
        })),
    }),
    { name: "products" }
  )
);
