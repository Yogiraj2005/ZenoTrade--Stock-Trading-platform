import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import API_URL from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => alert(err); // Simple alert for now, can be improved to Toast
  const handleSuccess = (msg) => alert(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        // Store token in localStorage for dashboard authentication
        if (token) {
          localStorage.setItem("token", token);
        }
        setInputValue({
          email: "",
          password: "",
        });
        setTimeout(() => {
          const isLocal =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1";

          const dashboardUrl = isLocal
            ? "http://localhost:3001"
            : "https://zenotrade-dashboard.onrender.com";
          // Pass token as URL parameter to avoid localStorage sync issues
          window.location.href = `${dashboardUrl}?token=${token}`;
        }, 500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Login failed. Please try again.");
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
