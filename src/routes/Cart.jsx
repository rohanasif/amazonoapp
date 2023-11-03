import { useContext, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    loggedin,
    dispatch,
    removeFromCart,
    cart,
    setCart,
    getLoggedUser,
    getCartItems,
  } = useContext(AppContext);

  const handleRemove = async (productId) => {
    const loggedUser = await getLoggedUser(dispatch);
    if (loggedUser) {
      await removeFromCart(dispatch, loggedUser.id, productId);
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    const displayCart = async () => {
      const loggedUser = await getLoggedUser(dispatch);
      if (loggedUser) {
        const cartItems = await getCartItems(dispatch, loggedUser?.id);
        cartItems.length === 0 || !cartItems ? setCart([]) : setCart(cartItems);
      }
    };
    displayCart();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Shopping Cart</h2>
      {loggedin ? (
        cart.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/">Add Items</Link>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt="" style={{ maxWidth: "80px" }} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      ) : (
        <p>
          You are not logged in. Go to <Link to="/login">Log in</Link>
        </p>
      )}
    </Container>
  );
};

export default Cart;
