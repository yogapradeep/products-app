import { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { IProduct } from "../interfaces/IProduct";
import ProductModal from "./ProductModal";

export function StockBadge({
  availabilityStatus,
  stock,
}: {
  availabilityStatus: string;
  stock: number;
}) {
  let badgeClass = "";

  if (availabilityStatus === "In Stock") {
    badgeClass = "text-bg-success";
  } else if (availabilityStatus === "Low Stock") {
    badgeClass = "text-bg-warning";
  } else if (availabilityStatus === "Out of Stock") {
    badgeClass = "text-bg-danger";
  } else {
    badgeClass = "text-bg-primary";
  }

  return (
    <div
      className={`position-absolute rounded-1 p-1 d-flex align-items-center fs_12 ${badgeClass} stock-badge`}
    >
      <p className="ms-1 mb-0 fw-medium font-small">{availabilityStatus}</p>
    </div>
  );
}

export default function ProductGrid() {
  const { products, fetchProducts, currentPage, totalPages } =
    useProductContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      fetchProducts(Number(page));
    } else {
      setSearchParams({ page: "1" });
      fetchProducts(1);
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: String(page) });
      fetchProducts(page);
    }
  };

  const handleMoreInfoClick = (product: IProduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const renderPagination = () => {
    let pages = [];
    const pageRange = 3;
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(
      totalPages,
      currentPage + Math.floor(pageRange / 2)
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-outline-secondary mx-1 ${
            i === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card border-0 shadow-lg h-100">
                <div className=" position-relative">
                  <img
                    src={product.thumbnail}
                    className="card-img-top object-fit-fill card-img object-fit-scale"
                    alt={product.title}
                  />
                  <div className=" position-absolute  bg-primary text-gray-light  rounded-1 p-1 rating-badge d-flex align-items-center fs_12">
                    <TiStarFullOutline size={12} className="yellow-icon" />
                    <p className=" ms-1 mb-0  yellow-icon fw-medium font-small">
                      {product.rating}
                    </p>
                  </div>

                  <StockBadge
                    availabilityStatus={product.availabilityStatus}
                    stock={product.stock}
                  />
                </div>
                <div className="card-body  bg-light-subtle rounded-3 p-3">
                  <div className="">
                    <h5
                      className="text-primary fw-bold mb-2 mb-5"
                      onClick={() => handleMoreInfoClick(product)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.title}
                    </h5>

                    <div className="d-flex justify-content-between align-items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoreInfoClick(product)}
                        className="p-2 p-md-3 btn btn-outline-secondary"
                      >
                        <div className=" fw-bold text-body-secondary">
                          More Info
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          alert("clicked to buy");
                        }}
                        className="d-flex align-items-center justify-content-between p-2 p-md-3 bg-yellow-1 border-primary-btn buy-button position-relative btn"
                      >
                        <div className=" fw-bold">
                          <p className="mb-0">₹ {product.price}</p>
                        </div>
                        <div className="">
                          <MdOutlineKeyboardDoubleArrowRight size={24} />
                        </div>
                        <div className=" position-absolute  bg-primary text-gray-light  rounded-1 p-1 discount-badge">
                          <p className="mb-0 fs_12">
                            {Math.round(product.discountPercentage)}% off
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => handlePageChange(1)}
        >
          &lt;&lt;
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {renderPagination()}
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => handlePageChange(totalPages)}
        >
          &gt;&gt;
        </button>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
