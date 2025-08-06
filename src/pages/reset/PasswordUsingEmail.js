import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { useAuth } from "../../global/AuthContext";
import Footer from "../../components/Footer";
import { authService_user } from "../../data-services/authService_user";
// import axios from "axios";

function PasswordUsingEmail() {
  const { user, admin, setAdmin } = useAuth();
  const email = user?.email;

  const { isChecked } = useGlobalContext();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirm_password: "",
  });
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear message after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Clean up on unmount or message change
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    try {
      const data = await authService_user.checkEmail(formData.email);
      if (data) {
        if (!admin?.email) {
          setMessage("Admin email not found!");
          return;
        }

        const res = await fetch("http://localhost:5000/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            adminEmail: admin.email,
            email_pass: admin.email_pass,
          }),
        });

        const result = await res.json();
        if (result.success) {
          setStep(2);
          setMessage("OTP sent to your email.");
        } else {
          setMessage(result.message || "Failed to send OTP");
        }
      } else {
        setMessage("Invalid Email!");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error sending OTP.");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      // const data = await otp_speshal.verify_OTP(formData.email, formData.otp);

      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(3);
        setMessage("OTP verified.");
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setMessage("Error verifying OTP.");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const data = await authService_user.updatePassword(
        formData.email,
        formData.password
      );

      alert("Password reset successful.");
      navigate("/Home");
    } catch (err) {
      setMessage(err.message || "Failed to reset password.");
    }
  };

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card p-5 shadow-lg rounded-4"
          style={{ width: "400px" }}
        >
          <h3 className="text-center fw-bold text-primary mb-3">
            🔒 Reset Password
          </h3>
          {message && (
            <div
              className="alert alert-info m-2 p-2"
              role="alert"
              style={{ display: "inline-block" }}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={
              step === 1 ? sendOTP : step === 2 ? verifyOTP : resetPassword
            }
          >
            {step === 1 && (
              <div className="mb-3">
                <label>Email address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control shadow"
                  required
                />
                <button
                  type="submit"
                  disabled={!!message}
                  className="btn btn-outline-primary w-50 d-block mx-auto mt-3"
                >
                  Send OTP
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mb-3">
                <label>Enter OTP *</label>
                <input
                  type="number"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="form-control shadow"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-outline-primary w-50 d-block mx-auto mt-3"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="mb-3">
                  <label>New Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-control shadow"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    className="form-control shadow"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-outline-success w-100">
                  Reset Password
                </button>
              </>
            )}
          </form>

          <div className="text-center mt-4">
            <a href="/UserLogin">🔙 Back to Login</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PasswordUsingEmail;
