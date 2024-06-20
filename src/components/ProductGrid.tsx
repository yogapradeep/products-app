import React from "react";
import { useProductContext } from "../context/ProductContext";
import { Table, Button } from "react-bootstrap";

const ProductGrid: React.FC = () => {
  const { products, fetchProducts } = useProductContext();

  const handlePageChange = (newSkip: number) => {
    fetchProducts(10, newSkip);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Availability Status</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <a href="#">{product.title}</a>
              </td>
              <td>{product.category}</td>
              <td>{product.availabilityStatus}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} width="50" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button as="button" type="button" onClick={() => handlePageChange(0)}>
        Page 1
      </Button>
      <Button as="button" type="button" onClick={() => handlePageChange(10)}>
        Page 2
      </Button>
    </div>
  );
};

export default ProductGrid;
