import { Form, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Signup = () => {
  const {
    registerUser,
    dispatch,
    state,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.message.text === "Registration successful") {
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      alert("Registration successful!");
      state.message.text = "";
      navigate("/login");
    }
  }, [state.message]);

  const handleSignup = async () => {
    await registerUser(
      { name, email, password, repeatPassword, cart: [] },
      dispatch
    );
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h2>Sign Up!</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            autoComplete="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="repeatpassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </Form.Group>
        {
          <p
            className={
              state.message.text === "Registration successful"
                ? "text-success"
                : "text-danger"
            }
          >
            {state.message.text}
          </p>
        }
        <Button type="submit">Sign up</Button>
      </Form>
      <p className="mt-3">
        Already Registered? <Link to={"/login"}>Log in!</Link>
      </p>
    </div>
  );
};
export default Signup;
