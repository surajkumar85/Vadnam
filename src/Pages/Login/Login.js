import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login">
      <h1 className="login__heading">Login form</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__formGroup">
          <label htmlFor="email" className="login__label">
            Email:
          </label>
          <input
            type="email"
            autoComplete="off"
            required
            className="login__input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__formGroup">
          <label htmlFor="password" className="login__label">
            Password:
          </label>
          <input
            autoComplete="off"
            type="password"
            required
            className="login__input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isPending && <button className="primary__btn">Login</button>}
        {isPending && (
          <button className="primary__btn" disabled>
            Loging...
          </button>
        )}
      </form>
      {error && <h1 className="error">{error}</h1>}
      <p className="login__subheading">
        Doesn't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
