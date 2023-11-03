import { Form, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
const Login = () => {
  const {
    state,
    dispatch,
    loginUser,
    email,
    setEmail,
    password,
    setPassword,
    loggedin,
    setLoggedin,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.message.text === "Login successful") {
      setEmail("");
      setPassword("");
      setLoggedin(true);
      alert("Login successful!");
      state.message.text = "";
      navigate("/");
    }
  }, [state.message]);

  const handleLogin = async () => {
    await loginUser({ email, password, isLoggedin: loggedin }, dispatch);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h2>Log in!</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
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
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {<p className="text-danger">{state.message.text}</p>}
        <Button type="submit">Login</Button>
      </Form>
      <p className="mt-3">
        New User? <Link to={"/signup"}>Sign up!</Link>
      </p>
    </div>
  );
};
export default Login;
