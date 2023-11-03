import { useState, useContext, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { ProductsContext } from "../contexts/ProductsContext";

const ProductsCarousel = () => {
  const { products } = useContext(ProductsContext);
  const [index, setIndex] = useState(0);
  const indices = new Set();
  const [indicesArray, setIndicesArray] = useState([]);

  useEffect(() => {
    while (indices.size !== 3 && products.length > 0) {
      indices.add(Math.floor(Math.random() * products.length));
    }
    setIndicesArray(Array.from(indices));
  }, [products.length]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        className="bg-dark mt-4"
        activeIndex={index}
        onSelect={handleSelect}
        style={{ height: "60vh" }}
      >
        {indicesArray.length === 3 &&
          indicesArray.map((idx) => (
            <Carousel.Item key={idx} style={{ height: "60vh" }}>
              <img src={products[idx].image} alt="carousel-image" />
              <Carousel.Caption>
                <h3 className="text-light">
                  {products[idx].name} (${products[idx].price})
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default ProductsCarousel;
