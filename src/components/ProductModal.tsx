import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IProduct } from "../interfaces/IProduct";

interface ProductModalProps {
  product: IProduct;
  show: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  show,
  onClose,
}: ProductModalProps) {
  if (!show) return null;

  return (
    <div
      className={`modal fade show ${show ? "d-block" : ""} modal-xl`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {product.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column flex-md-row">
            <div className="col-md-8">
              <img
                src={product.images[0]}
                className="card-img-top object-fit-scale-down "
                alt={product.title}
                style={{ width: "100%", height: "500px" }}
              />
              <div className="my-4">
                <h4 className="text-primary fw-semibold font-heading mb-0">
                  Details
                </h4>
                <div className="mt-3">
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Product Name</span>:{" "}
                    {product.title}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Description</span>:{" "}
                    {product.description}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Category</span>:{" "}
                    {product.category}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Price</span>: ₹{product.price}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Rating</span>:{" "}
                    {product.rating}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Stock</span>: {product.stock}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Brand</span>: {product.brand}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">SKU</span>: {product.sku}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Dimensions</span>:{" "}
                    {product.dimensions.width} x {product.dimensions.height} x{" "}
                    {product.dimensions.depth} cm
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Warranty Information</span>:{" "}
                    {product.warrantyInformation}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Shipping Information</span>:{" "}
                    {product.shippingInformation}
                  </p>
                  <p className="text-primary font-subheading mb-2 text-wrap">
                    <span className="fw-semibold">Availability Status</span>:{" "}
                    {product.availabilityStatus}
                  </p>
                  <div>
                    <h5>Reviews</h5>
                    {product.reviews.map((review: any, index: number) => (
                      <div key={index} className="mb-2">
                        <p>
                          <strong>{review.reviewerName}</strong> (
                          {review.rating} stars): {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body  bg-light-subtle rounded-3 p-3">
                <div className="">
                  <h5
                    className="text-primary fw-bold mb-2 mb-5"
                    style={{ cursor: "pointer" }}
                  >
                    {product.title}
                  </h5>

                  <div className="d-flex justify-content-between align-items-center gap-1">
                    <button
                      type="button"
                      className="p-2 p-md-3 btn btn-outline-secondary"
                      onClick={() => {
                        alert("clicked add to cart");
                      }}
                    >
                      <div className=" fw-bold text-body-secondary">
                        Add to cart
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
