import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../global/GlobalContext";
import Admin_Header from "./Admin_Header";

const AdminInfo = () => {
  const { isChecked } = useGlobalContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // confirm_password:"",
    phone: "",
    address: "",
    state: "",
    dist: "",
    tal: "",
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

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/userRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await response.json();
      // console.log("User Registered:", data);
      alert("Registration successful!");
      navigate("/UserLogin");
    } catch (error) {
      console.error("Error Creating User:", error.message);
      alert("Error: " + error.message);
    }
  };

  //////////// Data Store in Excel sheet  ////////////

  // const [formEntries, setFormEntries] = useState([]);

  // // On page load, get data from localStorage
  // useEffect(() => {
  //   const savedEntries =
  //     JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  //   setFormEntries(savedEntries);
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirm_password) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   const updatedEntries = [...formEntries, formData];

  //   setFormEntries(updatedEntries);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));

  //   setFormData({
  //     username: "",
  //     email: "",
  //     password: "",
  //     phone: "",
  //     address: "",
  //     state: "",
  //     dist: "",
  //     tal: "",
  //   });
  // };

  ///////////////////////////////////////////////////////

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      <div className="page-contaiter">
        {/*Breadcrumb*/}
        <section className="breadcrumb">
          <div
            className="background-image"
            data-background="img/bg_img/bg_001.jpg"
            data-bg-posx="center"
            data-bg-posy="center"
            data-bg-overlay={4}
          />
          <div className="breadcrumb-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="breadcrumb-title">My Account</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <a href="/Home">Home</a>
                    </span>
                    <span>My Account</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Breadcrumb*/}
        {/*Content*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-md-6">
                <div className="my-account-box">
                  <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <p className="form-field-wrapper">
                      <label htmlFor="username">
                        Username <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Email */}
                    <p className="form-field-wrapper">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Password */}
                    <p className="form-field-wrapper">
                      <label htmlFor="password">
                        Password <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Confirm Password */}
                    <p className="form-field-wrapper">
                      <label htmlFor="confirm_password">
                        Confirm Password <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Phone */}
                    <p className="form-field-wrapper">
                      <label htmlFor="phone">
                        Phone No <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Address */}
                    <p className="form-field-wrapper">
                      <label htmlFor="address">
                        Address <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* State Dropdown */}
                    <p className="form-field-wrapper">
                      <label htmlFor="state">
                        State <span className="required">*</span>
                      </label>
                      <select
                        className="input--lg form-full"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select State --</option>
                        <option value="maha">-- maha --</option>
                      </select>
                    </p>

                    {/* District */}
                    <p className="form-field-wrapper">
                      <label htmlFor="dist">
                        District <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="text"
                        id="dist"
                        name="dist"
                        value={formData.dist}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Taluka */}
                    <p className="form-field-wrapper">
                      <label htmlFor="tal">
                        Taluka <span className="required">*</span>
                      </label>
                      <input
                        className="input--lg form-full"
                        type="text"
                        id="tal"
                        name="tal"
                        value={formData.tal}
                        onChange={handleInputChange}
                        required
                      />
                    </p>

                    {/* Info Text */}
                    <p className="form-field-wrapper">
                      Your personal data will be used to support your experience
                      throughout this website, to manage access to your account,
                      and for other purposes described in our{" "}
                      <a href="/Home">privacy policy</a>.
                    </p>

                    {/* Submit */}
                    <p className="form-field-wrapper form-row">
                      <button
                        type="submit"
                        className="btn btn--lg btn--primary"
                        name="register"
                        // onClick={handleDownloadExcel}
                      >
                        Register
                      </button>
                    </p>
                  </form>
                </div>
              </div>{" "}
            </div>
          </div>
        </section>
        {/*End Content*/}
      </div>

      <Footer />
    </>
  );
};

export default AdminInfo;
