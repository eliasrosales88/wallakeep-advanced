import React from "react";

// const isAuthenticated = () => localStorage.getItem("name") && localStorage.getItem("lastname") ? true : false;


const authContext = React.createContext({
  name: localStorage.getItem("name") || "",
  lastname: localStorage.getItem("lastname") || "",
  authenticated: localStorage.getItem("authenticated") || false,
  login: () => {}
});

export default authContext;