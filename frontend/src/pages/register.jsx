import React, { useState } from "react";
import "../assets/register.css";
import BgImage from "../assets/images/login-main.jpeg"; // your background image
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({})
  const handleChange = (e) => {
    setError((prev) => ({
      ...prev,
      error: ""
    }))
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const validation = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form?.name || form?.name?.trim().length == 0) {
      errors.name = "Enter a Valid user name"
    }
    if (!emailRegex.test(form?.email)) {
      errors.email = "Enter a Valid email address";
    }
    if (!form?.password || form?.password?.trim().length == 0) {
      errors.password = "Enter a Password";
    }
    if (!form?.confirmPassword || form?.password !== form?.confirmPassword) {
      errors.confirmPassword = "Confirm Password should match password"
    }

    return errors;
  }
 console.log({form})
  const handleSubmit = async (e) => {
    const errors = validation();
    console.log({ errors })
    if (Object.keys(errors).length > 1) {
      setError(errors);
      return;
    }
    console.log("Register Payload →", form);
    try {
      const response = await fetch("http://localhost:7000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.status) {
        navigate("/dashboard");
      }
      else {
        setError({
          error: data?.message
        })
      }
      console.log({ data });
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div
      className="register-page"
    // style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="register-card">
        <h2 className="title">CREATE AN ACCOUNT</h2>
        {error.error && <div className="error">{error.error}</div>}
        {error.name && <div className="error">{error.name}</div>}
        <div className="form-control">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onInput={() =>
              setError(prev => ({
                ...prev,
                name: ""
              }))
            }
          />
        </div>
        {error.email && <div className="error">{error.email}</div>}
        <div className="form-control">
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onInput={() =>
              setError(prev => ({
                ...prev,
                email: ""
              }))
            }
          />
        </div>
        {error.password && <div className="error">{error.password}</div>}
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onInput={() =>
              setError(prev => ({
                ...prev,
                password: ""
              }))
            }
          />
        </div>
        {error.confirmPassword && <div className="error">{error.confirmPassword}</div>}
        <div className="form-control">
          <input
            type="password"
            placeholder="Repeat your password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onInput={() =>
              setError(prev => ({
                ...prev,
                confirmPassword: ""
              }))
            }
          />
        </div>

        {/* <div className="form-checkbox">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <span>I agree all statements in <a href="#">Terms of service</a></span>
          </div> */}

        <button className="register-btn" onClick={handleSubmit}>REGISTER</button>
        <p className="login-link">
          Have already an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
