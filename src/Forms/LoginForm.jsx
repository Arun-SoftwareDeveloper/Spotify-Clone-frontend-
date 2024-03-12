import axios from "axios";
import React, { useState } from "react";
import backendApi from "../../BackendApi/backendApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../FormStyles/LoginForm.css";

function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendApi}/user/login`, input);

      if (response.status === 203) {
        navigate("/songsList");
        toast.success("Login Successful");
      } else if (response.status === 403) {
        toast.error("Error in Login");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="container">
      <h1 className="text-left text-success">
        <i className="fab fa-ARRA"></i> ARRA
      </h1>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1>
            Login to enjoy Unlimited happiness
            <br /> with genre <i className="fa-solid fa-genre"></i>
          </h1>
          <form className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="form-label mt-3">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary mt-3" onClick={handleLoginForm}>
              Submit
            </button>
            <div className="text-center mt-3">
              <p>
                <Link to="/">Forgot Password?</Link>
              </p>
              <p>
                Don't have an account? <Link to="/">Sign up for ARRA</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
