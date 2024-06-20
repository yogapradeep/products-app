import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import { ProductProvider } from "./context/ProductContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="container my-5">
          <h1 className="my-5 text-center">Products</h1>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
          </Routes>
        </div>
      </ProductProvider>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
