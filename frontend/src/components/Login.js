import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props)  => {
  const { onSubmit } = props;
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: values.email, password: values.password });
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          className="auth__input"
          placeholder="Email"
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        ></input>
        <input
          className="auth__input"
          placeholder="Password"
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        ></input>
        <button className="auth__button" type="submit">
          Log in
        </button>
      </form>
      <Link to="/signup" className="auth__message">
        Not a member yet? Sign up here!
      </Link>
    </div>
  );
}

export default Login;
