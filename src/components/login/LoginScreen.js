import React from "react";

export const LoginScreen = ({ history }) => {
  const handleLogin = () => {
    //this replace my navigation if i want save my navigation should use push no replace
    history.replace("/");
  };
  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
};
