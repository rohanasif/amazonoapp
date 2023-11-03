import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import Product from "../components/Product";
import { Link } from "react-router-dom";
const SearchedProducts = () => {
  const { searchResults, query } = useContext(SearchContext);
  return (
    <div className="mt-4">
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {(searchResults.length === 0 || !query) && <p>No products found!</p>}
        {query &&
          searchResults.map((result, index) => {
            return <Product key={index} product={result} />;
          })}
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/">Back to All Products</Link>
      </div>
    </div>
  );
};
export default SearchedProducts;
