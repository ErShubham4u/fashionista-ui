import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";
import IndiaData from "./IndiaData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../global/AuthContext.js";

const UserLogReg = () => {
  const { admin } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    state: "",
    dist: "",
    street_address: "",
    city: "",
    sub_district: "",
    zip: "",
  });

  //////////// excel ////////////

  ////////////////////

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    insertData();
    // const res = await fetch("http://localhost:5000/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, adminEmail: admin.email }),
    // });

    // const data = await res.json();
    // console.log("Server response:", data); // 👈 Yeh line add karo
    // if (data.success) {
    //   // insertData();
    // } else {
    //   alert(data.message || "Registration failed");
    // }
  };

  function insertData() {
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    const result = authService_user.register(formData);
    if (result) {
      alert("Registered successfully!");
      navigate("/UserLogin");
      
    } else {
      alert("User already exists!");
    }
  }


  const fields = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "User Name",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Email Address",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
      placeholder: "Confirm Password",
    },
    { label: "Phone No", name: "phone", type: "text", placeholder: "Phone No" },
    // // { label: "District", name: "dist", type: "text", placeholder: "District" },
    // // { label: "Sub District", name: "sub_district", type: "text", placeholder: "Sub District" },
    // // { label: "City", name: "city", type: "text", placeholder: "City" },
    // // { label: "ZIP", name: "zip", type: "text", placeholder: "ZIP" },
    // { label: "Street Address", name: "street_address", type: "text", placeholder: "Street Address" },
  ];

  // Group into pairs
  const fieldPairs = [];
  for (let i = 0; i < fields.length; i += 2) {
    fieldPairs.push(fields.slice(i, i + 2));
  }

  ///////////////

  const { isChecked } = useGlobalContext();

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      {/* <div className="page-container"> */}

      <div className="page-contaiter ">
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow rounded-4 p-4">
                  <h3 className="text-center mb-4 fw-bold text-primary">
                    🔒 Register
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {fieldPairs.map((pair, rowIndex) => (
                      <div className="row" key={rowIndex}>
                        {pair.map((field, index) => (
                          <div className="col-md-10 mb-3 mx-auto" key={index}>
                            <label
                              htmlFor={field.name}
                              className="form-label  d-block"
                            >
                              {field.label}{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type={field.type}
                              className="form-control form-control-lg shadow"
                              id={field.name}
                              name={field.name}
                              value={formData[field.name] ?? ""}
                              // placeholder={field.placeholder}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                    {/* <div className="row" */}
                    <p className="text-muted small mb-4">
                      Your personal data will be used to support your experience
                      on this website and for purposes described in our{" "}
                      <a href="/Home">privacy policy</a>.
                    </p>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-primary btn-lg px-5"
                      >
                        Register
                      </button>
                    </div>
                    <br />
                    <div className="text-center">
                      <p className="mb-1">
                        <a href="UserLogin" className="text-decoration-none">
                          Login Here..!
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default UserLogReg;
