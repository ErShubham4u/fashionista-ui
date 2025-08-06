import React, { useState } from "react";
import "./UserLogin.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
// import { authService_user } from "../../data-services/user-services";
import { useAuth } from "../../global/AuthContext";
import { authService_user } from "../../data-services/authService_user";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await authService_user.login(
      formData.email,
      formData.password
    );
    // console.log(user)
    if (user) {
      login(user);
      alert("Login successful!");
      navigate("/Home");
    } else {
      alert("Invalid credentials");
    }
  };

  const { isChecked } = useGlobalContext();
  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      <div className="d-flex justify-content-center align-items-center bg-light m-4">
        <div
          className="bg-white p-5 rounded shadow"
          style={{ width: "100%", maxWidth: "420px" }}
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center fw-bold text-primary mb-4">🔒 Login</h3>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email address <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-lg shadow-sm"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-lg shadow-sm"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Remember me */}
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-3">
              <button
                type="submit"
                disabled={!agree}
                className="btn btn-outline-primary btn-lg shadow"
              >
                Log In
              </button>
            </div>

            {/* Links */}
            <div className="text-center">
              <p className="mb-1">
                <a href="login_register" className="text-decoration-none">
                  Register Here..!
                </a>
              </p>
              <p>
                <a href="/Reset" className="text-decoration-none text-muted">
                  Lost your password..?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserLogin;
