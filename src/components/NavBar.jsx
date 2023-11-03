import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginBtn from "./LogoutBtn";
import LogoutBtn from "./LoginBtn";

const NavBar = () => {
  const {
    query,
    setQuery,

    cart,

    setSearchResults,

    loggedin,
    setLoggedin,

    searchProducts,

    products,

    getLoggedUser,

    dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const results = searchProducts(query, products);
    setSearchResults(results);
    setQuery("");
    navigate("/search");
  };

  useEffect(() => {
    const checkLogin = async () => {
      const res = await getLoggedUser(dispatch);
      setLoggedin(res?.isLoggedin);
    };
    checkLogin();
  }, []);

  return (
    <Navbar expand="lg" bg="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-light">
            Amazona Shop
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav>
            <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
              <Form.Group controlId="search" className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="outline-success">
                  Search
                </Button>
              </Form.Group>
            </Form>
            <Link
              to="/cart"
              className="navbar-links text-decoration-none text-secondary m-2"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Cart {loggedin ? `(${cart.length})` : null}
            </Link>
            {loggedin ? <LoginBtn /> : <LogoutBtn />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
