import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import backendApi from "../../BackendApi/backendApi";
import "../FormStyles/RegisterForm.css";
function RegisterForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    gender: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const nextStep = () => {
    // Validation for Step 1
    if (currentStep === 1 && !input.email) {
      setErrors({ email: "Please enter your email address" });
      return;
    }

    // Validation for Step 2
    if (currentStep === 2 && !input.password) {
      setErrors({ password: "Please enter a password" });
      return;
    }

    setCurrentStep(currentStep + 1);
    if (currentStep >= 4) {
      setCurrentStep(3);
    }
  };

  const backStep = () => {
    setCurrentStep(currentStep - 1);
    if (currentStep <= 0) {
      setCurrentStep(1);
    }
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    // Validation for Step 3
    if (currentStep === 3) {
      const newErrors = {};
      if (!input.name) {
        newErrors.name = "Please enter your name";
      }
      if (!input.dateOfBirth) {
        newErrors.dateOfBirth = "Please enter your date of birth";
      }
      if (!input.gender) {
        newErrors.gender = "Please select your gender";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    // Reset errors
    setErrors({});

    try {
      const response = await axios.post(`${backendApi}/user/register`, input);
      if (response.status === 400) {
        toast.error("Email already registered");
      }
      if (response.status === 200) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Internal Server Error");
      toast.error("Internal Server Error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setInput({ ...input, [name]: checked ? "male" : "female" });
    } else {
      setInput({ ...input, [name]: value });
    }

    // Clear related errors when input changes
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  return (
    <div className="container">
      <h1 className="text-left" style={{ color: "green" }}>
        <i class="fa-brands fa-spotify"></i>Spotify
      </h1>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form className="card p-3">
            {currentStep === 1 && (
              <>
                <h1 className="mb-4">
                  Sign Up to start Listening <br /> genre{" "}
                  <i className="fa-solid fa-genre"></i>
                </h1>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  placeholder="name@example.com"
                  className={`form-control mb-3 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
                <p className="text-center">
                  Already a user? <Link to="/login">Log in here</Link>
                </p>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h3 className="mb-4">
                  <i
                    className="fa-solid fa-chevron-left"
                    onClick={backStep}
                  ></i>{" "}
                  Step 1 of 3 <br />
                  <span className="fw-bold">Create Password</span>
                </h3>
                <label htmlFor="password" className="form-label">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={`form-control mb-3 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={input.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                <p>
                  The password contains 1 special character <br />1 numeric and
                  1 UpperCase
                </p>
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              </>
            )}
            {currentStep === 3 && (
              <>
                <h3 className="mb-4">
                  <i
                    className="fa-solid fa-chevron-left"
                    onClick={backStep}
                  ></i>{" "}
                  Step 2 of 3 <br />
                  <span className="fw-bold">Tell us about yourself</span>
                </h3>
                <label htmlFor="name" className="form-label">
                  Name <br />
                  This name will appear on your profile
                </label>
                <input
                  type="text"
                  className={`form-control mb-3 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                <label htmlFor="dateOfBirth" className="form-label">
                  DOB
                </label>
                <input
                  type="date"
                  className={`form-control mb-3 ${
                    errors.dateOfBirth ? "is-invalid" : ""
                  }`}
                  name="dateOfBirth"
                  value={input.dateOfBirth}
                  onChange={handleInputChange}
                />
                {errors.dateOfBirth && (
                  <div className="invalid-feedback">{errors.dateOfBirth}</div>
                )}
                <label className="form-label">Gender</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="male"
                    checked={input.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="female"
                    checked={input.gender === "female"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleRegisterForm}
                >
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterForm;
