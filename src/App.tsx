import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import { Container } from "react-bootstrap";
import ProductGrid from "./components/ProductGrid";

function App() {
  return (
    <ProductProvider>
      <Container>
        <h1>Product Management</h1>
        <ProductGrid />
      </Container>
    </ProductProvider>
  );
}

export default App;
