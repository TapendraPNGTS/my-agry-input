import Cookies from "js-cookie";
// import { useState } from "react";
// const [isLoggedIn, setIsLoggedIn] = useState(false);

export const getTokenLocal = () => {
  
  return Cookies.get("x_auth_token");
};

export const getUserLocal = () => {
  const user = Cookies.get("x_ufo");

  if (user) {
    return JSON.parse(user);
    // setIsLoggedIn(true);
  } else {
    return null;
    // setIsLoggedIn(false);
  }
};

export const getCartLocal = () => {
  const cart = Cookies.get("x_cart");

  if (cart) {
    return JSON.parse(cart);
    // setIsLoggedIn(true);
  } else {
    return null;
    // setIsLoggedIn(false);
  }
};

export const getPriceLocal = () => {
  return parseFloat(Cookies.get("x_total_price"));
};

export const setTokenLocal = (token) => {
  Cookies.set("x_auth_token", token, { expires: 1 });
};

export const setUserLocal = (user) => {
  Cookies.set("x_ufo", JSON.stringify(user), { expires: 1 });
};

export const setCartLocal = (cart) => {
  Cookies.set("x_cart", JSON.stringify(cart), { expires: 28 });
};

export const setPriceLocal = (price) => {
  Cookies.set("x_total_price",price , { expires: 28 });
};

export const setGSTLocal = (price) => {
  Cookies.set("x_gst_price",price , { expires: 28 });
};


export const getGSTLocal = () => {
  return parseFloat(Cookies.get("x_gst_price"));
};