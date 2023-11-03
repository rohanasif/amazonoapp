import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate("/login");
  };

  return (
    <Button variant="outline-success" onClick={() => handleClick()}>
      Login
    </Button>
  );
};
export default LoginBtn;
