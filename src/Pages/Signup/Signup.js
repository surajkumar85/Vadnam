import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dName, setDName] = useState("");
  const [error, setError] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { signup, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, dName, thumbnail);
  };

  const handleImgInput = (e) => {
    const imgFile = e.target.files[0];
    setError(null);
    console.log(imgFile);
    if (!imgFile.type.includes("image")) {
      setError("File Must be an Image.");
    }
    if (imgFile.size > 100000) {
      setError("File must be less than 100kb.");
    }
    setThumbnail(imgFile);
  };

  return (
    <div className="login signup">
      <h1 className="login__heading">Signup form</h1>
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
        <div className="login__formGroup">
          <label htmlFor="dName" className="login__label">
            Display Name:
          </label>
          <input
            autoComplete="off"
            type="text"
            required
            className="login__input"
            id="dName"
            value={dName}
            onChange={(e) => setDName(e.target.value)}
          />
        </div>
        <div className="login__formGroup">
          <label htmlFor="avatar" className="login__label">
            Avatar:
          </label>
          <input
            autoComplete="off"
            type="file"
            required
            className="login__input input__file"
            id="avatar"
            onChange={handleImgInput}
          />
        </div>
        {!isPending && (
          <button className="primary__btn" disabled={Boolean(error)}>
            Signup
          </button>
        )}
        {isPending && (
          <button className="primary__btn" disabled>
            Signing...
          </button>
        )}
      </form>
      <p className="login__subheading">
        Allready have an account? <Link to="/login">login</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
