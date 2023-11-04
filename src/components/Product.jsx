import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";

const Product = ({ product, i }) => {
  const { dispatch, addToCart, getLoggedUser } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async (i) => {
    const loggedUser = await getLoggedUser(dispatch);
    await addToCart(dispatch, loggedUser.id, i, quantity);
  };

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
    <div style={{ width: "25%" }}>
      <Link style={{ textDecoration: "none" }} to={`/product/${product.id}`}>
        <Card>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Text>{product.name}</Card.Text>
            <Card.Text>
              {renderStars(product.rating)}
              <span>{product.numReviews} Reviews</span>
            </Card.Text>
            <Card.Title>${product.price}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
      <div className="d-flex">
        <Button onClick={() => handleAdd(product.id)}>Add to Cart</Button>
        <Form style={{ width: "fit-content" }}>
          <Form.Group controlId={i} className="d-flex align-items-center">
            <Form.Control
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Form.Label>Quantity</Form.Label>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Product;
