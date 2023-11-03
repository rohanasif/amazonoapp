import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";

const LogoutBtn = () => {
  const { dispatch, logoutUser, setLoggedin, getLoggedUser } =
    useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const loggedUser = await getLoggedUser(dispatch);
      if (loggedUser) {
        await logoutUser(loggedUser, dispatch);
        alert("You are logged out!");
        setLoggedin(false);
        navigate("/login");
      } else {
        alert("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };
  return (
    <Button variant="outline-danger" onClick={() => handleClick()}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
