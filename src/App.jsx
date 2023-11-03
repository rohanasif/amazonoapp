import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Homepage from "./routes/Homepage";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import ProductDetail from "./routes/ProductDetail";
import SearchedProducts from "./routes/SearchedProducts";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

const App = () => {
  return (
    <AppProvider>
      <div className="min-vh-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchedProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </AppProvider>
  );
};
export default App;
