import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IProduct } from "../interfaces/IProduct";

interface ProductContextProps {
  products: IProduct[];
  fetchProducts: (limit: number, skip: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async (limit: number, skip: number) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts(10, 0); // Initial fetch
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export { ProductProvider, useProductContext };
