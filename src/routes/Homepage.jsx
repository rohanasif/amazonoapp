import { Container } from "react-bootstrap";
import ProductsCarousel from "../components/ProductsCarousel";
import Products from "../components/Products";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const Homepage = () => {
  const { state, getAllProducts, setProducts, dispatch } =
    useContext(AppContext);
  useEffect(() => {
    const showProducts = async () => {
      const allProducts = await getAllProducts(dispatch);
      setProducts(allProducts);
    };
    showProducts();
  }, []);
  return (
    <Container style={{ height: "60vh" }}>
      <ProductsCarousel />
      <h1 className="mt-2">LATEST PRODUCTS</h1>
      {state.message.text ? (
        <p className="text-danger">{state.message.text}</p>
      ) : null}
      <Products />
      <footer className="d-flex justify-content-center py-4">
        Copyright &copy; Amazona
      </footer>
    </Container>
  );
};
export default Homepage;
