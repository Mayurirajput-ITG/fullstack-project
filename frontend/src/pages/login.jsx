import React, { useState } from "react";
import LoginImage from "../assets/images/login-main.jpeg";
import { useNavigate } from "react-router-dom";
import "../assets/main.css";

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({})
  // Input handler
  const handleChange = (e) => {
    setError((prev) => ({
      ...prev,
      error: ""
    })

    )
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // Submit handler
  const validation = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = state.email?.trim();
    const password = state.password?.trim();

    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };
  console.log({ error })
  const handleSubmit = async (e) => {
    const errors = validation();
    console.log(errors)
    if (Object.keys(errors).length > 1) {
      setError(errors);
      return;
    }

    const payload = {
      email: state.email,
      password: state.password,
    };
    try {
      const response = await fetch("http://localhost:7000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", data.token);

        if (data.user.role === 1) {
          navigate("/dashboard");
        } else {
          navigate("/onlinestore")
        }
      } else {
        setError({
          error: data?.message
        })
      }
      // console.log("Login Response:", data);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="main-login-container">
      <div className="login-card">
        <div className="login-left">
          <img src={LoginImage} alt="login" />
        </div>

        <div className="login-right">
          <h2 className="login-title">Admin Login</h2>
          {error.error && <div className="errors">{error.error}</div>}

          {/* Email */}
          <div className="form-control">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Enter your email"
              onInput={() =>
                setError(prev => ({
                  ...prev,
                  email: ""
                }))
              }
            />
          </div>
          {error.email && <div className="errors">{error.email}</div>}
          {/* Password */}
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Enter password"
              onInput={() =>
                setError(prev => ({
                  ...prev,
                  password: ""
                }))
              }
            />
          </div>
          {error.password && <div className="errors">{error.password}</div>}
          <button className="login-btn" onClick={handleSubmit}>Login</button>
          <p className="link">Forgot your password</p>
          <p className="link"><a href="/register">Create an account</a></p>
        </div>
      </div>
    </div>
  );
}

