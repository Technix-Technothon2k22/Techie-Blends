import { API } from "../../backend";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const signup = (user) => {
  return fetch(`${API}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const verify = (user) => {
  return fetch(`${API}/user/verify`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("_access_token");
    next();
    return fetch(`${API}/user/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("_access_token")
        )}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};

export const editDetails = (user) => {
  return fetch(`${API}/user/addDetails`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("_access_token")
      )}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("_access_token")) {
    return jwtDecode(localStorage.getItem("_access_token"));
  } else {
    return false;
  }
};

export const isVerfied = () => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("_access_token")
      )}`,
    },
  };

  return fetch(`${API}/user/verified`, config).then((response) => {
    console.log(response, "res");
    return response.json();
  });
};
