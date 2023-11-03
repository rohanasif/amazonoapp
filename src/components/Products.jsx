import Product from "./Product";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
const Products = () => {
  const { products } = useContext(AppContext);
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {products.map((product, index) => {
        return <Product key={index} product={product} i={index} />;
      })}
    </div>
  );
};

export default Products;
