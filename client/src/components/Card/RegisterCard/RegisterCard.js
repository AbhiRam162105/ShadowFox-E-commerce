import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css"; // Make sure this file exists and is properly styled

const RegisterCard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior

    // Collect form data
    const formData = {
      FirstName: firstName,
      LastName: lastName,
      email: email,
      password: password,
    };
    console.log("Form data:", formData);
    try {
      // Send POST request to the register route
      const response = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Redirect to the home page
      window.location.href = "/account/login";
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="register__inputs">
          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">First name</label>
            <input
              type="text"
              className="fname__input register__input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="lname__input__container reg__input__container">
            <label className="lname__label input__label">Last name</label>
            <input
              type="text"
              className="lname__input register__input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="email__input__container reg__input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input register__input"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password__input__container reg__input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input register__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register__button__container">
            <button type="submit" className="register__button">
              Create Account
            </button>
          </div>
        </form>
        <div className="register__other__actions">
          <div className="register__login__account">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
