import axios from "axios";
import {
  USERSURL,
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
} from "../constants";

export const getUsers = async (dispatch) => {
  try {
    const response = await axios.get(USERSURL);
    const users = response.data;
    dispatch({ type: GET_USERS, payload: users });
    return users;
  } catch (e) {
    console.error(e);
  }
};

export const registerUser = async (user, dispatch) => {
  const { repeatPassword, ...userToRegister } = user;
  const allUsers = await getUsers(dispatch);
  let error = null;
  if (user.password !== user.repeatPassword) {
    error = "Passwords don't match";
  }
  if (allUsers.length === 0 || !allUsers.find((u) => u.email === user.email)) {
    try {
      const response = await axios.post(USERSURL, userToRegister);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (e) {
      error = "Registration failed. Please try again later.";
      console.error(e);
    }
  } else {
    error = "User already registered";
  }
  if (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
  }
};

export const loginUser = async (user, dispatch) => {
  const allUsers = await getUsers(dispatch);
  const userLoggingIn = allUsers.find(
    (u) =>
      u.password === user.password &&
      (u.name === user.name || u.email === user.email)
  );
  if (user.isLoggedin) {
    dispatch({
      type: LOGIN_ERROR,
      payload: `${user.name} is already logged in!. Go to <Link to={"/"}>Home</Link>`,
    });
  }
  if (userLoggingIn) {
    try {
      const response = await axios.patch(`${USERSURL}/${userLoggingIn.id}`, {
        ...user,
        isLoggedin: true,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      console.error(e);
    }
  } else {
    dispatch({ type: "LOGIN_ERROR", payload: "Invalid Credentials" });
  }
};

export const getLoggedUser = async (dispatch) => {
  try {
    const response = await axios.get(`${USERSURL}?isLoggedin=true`);
    const userArr = response.data;
    const user = userArr[0];
    return user;
  } catch (e) {
    console.error(e);
  }
};

export const logoutUser = async (user, dispatch) => {
  let error = null;
  try {
    if (user.isLoggedin) {
      const response = await axios.patch(`${USERSURL}/${user.id}`, {
        isLoggedin: false,
      });
      dispatch({ type: LOGOUT, payload: response.data });
    } else {
      error = "User not logged in! Please refresh!";
      console.log(error);
    }
  } catch (e) {
    console.error(e);
  }
};

export const editUserDetails = async () => {};
