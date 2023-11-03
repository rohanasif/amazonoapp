import { Link, useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalf as halfStar } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const ProductDetail = () => {
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => {
    return p.id === Number(id);
  });

  const isInStock = product.countInStock > 0;

  const hasHalf = (rating) => {
    return !Number.isInteger(rating);
  };
  const renderStars = (rating) => {
    const maxStars = 5;
    const starArray = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        starArray.push(
          <FontAwesomeIcon key={i} icon={solidStar} color="gold" />
        );
      } else if (hasHalf(rating) && i === Math.ceil(rating)) {
        starArray.push(
          <FontAwesomeIcon key={i} icon={halfStar} color="gold" />
        );
      } else {
        starArray.push(
          <FontAwesomeIcon key={i} icon={emptyStar} color="gold" />
        );
      }
    }
    return starArray;
  };

  return (
    <div>
      <Link to="/">Go Back</Link>
      <div className="d-flex">
        <img src={product.image} />
        <div>
          <p>{product.name}</p>
          <p>
            {renderStars(product.rating)}{" "}
            <span>{product.numReviews} Reviews</span>
          </p>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
        <div>
          <p>Price: ${product.price}</p>
          <p>Status: {isInStock ? "In Stock" : "Out of Stock"}</p>
          <Form>
            <Form.Group controlId={id}>
              <Form.Label>Qty</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
