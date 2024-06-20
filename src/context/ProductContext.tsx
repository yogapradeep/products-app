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
  fetchProducts: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const productsPerPage = 12;

  const fetchProducts = async (page: number) => {
    const skip = (page - 1) * productsPerPage;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / productsPerPage));
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, fetchProducts, currentPage, totalPages }}
    >
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
