import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";
import { useAuth } from "../../global/AuthContext";

const UserProfile = () => {
  const { user, admin, setAdmin } = useAuth();
  const email = user?.email;

  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  const { isChecked } = useGlobalContext();

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  // ✅ Fetch user info
  useEffect(() => {
    if (!email) return;
    const fetchUser = async () => {
      const usersData = await authService_user.getUserByemail(email);
      setFormData(usersData);
    };
    fetchUser();
  }, [email]);

  console.log(formData + " " + email);
  useEffect(() => {
    const refreshAdminData = async () => {
      if (user?.email === admin?.email) {
        const updatedAdmin = await authService_user.getAdminData();
        setAdmin(updatedAdmin[0]);
      }
    };

    refreshAdminData();
  }, [user, admin?.email, setAdmin]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await authService_user.userUpdate(email, formData);
    if (result) {
      setFormData(result); // you can also keep as-is, or refetch
      alert("Update successfully!");
    }
  };

  // ✅ Prevent render before auth check
  if (!user) {
    return null; // or loading spinner
  }

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="page-contaiter">
        {/*Breadcrumb*/}
        {/*Breadcrumb*/}
        {/*Content*/}
        <section className="sec-padding">
          <div className="container">
            <div className="row justify-content-around"></div>
            {/*  */}
            <div className="col-md-12">
              <div className="my-account-box mb-4 rounded-4 shadow">
                <h2>My Account</h2>

                {/* <div className="my-account-box"> */}
                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="row">
                    {/** === USER DETAILS INPUTS === */}
                    {[
                      {
                        label: "Username",
                        name: "username",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Email Address",
                        name: "email",
                        type: "email",
                        required: true,
                      },
                      {
                        label: "Password",
                        name: "password",
                        type: "password",
                        required: true,
                        disabled: true,
                      },
                      {
                        label: "Phone No",
                        name: "phone",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "State",
                        name: "state",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "District",
                        name: "dist",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Sub District",
                        name: "sub_district",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Town / City",
                        name: "city",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "ZIP",
                        name: "zip",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Street Address",
                        name: "street_address",
                        type: "text",
                        required: true,
                      },
                    ].map((input, i) => (
                      <div className="col-md-6 mb-3" key={i}>
                        <label htmlFor={input.name}>
                          {input.label}{" "}
                          {input.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <input
                          className="form-control form-control-lg shadow"
                          type={input.type}
                          id={input.name}
                          name={input.name}
                          value={formData[input.name]}
                          onChange={handleInputChange}
                          required={input.required}
                          disabled={input.disabled || false}
                        />
                      </div>
                    ))}

                    {user?.email === admin?.email && (
                      <>
                        <hr />
                        <h3>Social Media </h3>

                        {[
                          {
                            label: "Email Pass",
                            name: "email_pass",
                          },
                          {
                            label: "Instagram User Id",
                            name: "instagram",
                          },
                          {
                            label: "Google Link",
                            name: "google",
                          },
                          {
                            label: "Facebook Link",
                            name: "facebook",
                          },
                        ].map((input, i) => (
                          <div className="col-md-6 mb-3" key={i}>
                            <label htmlFor={input.name}>
                              {input.label}
                              {input.name === "email_pass" && (
                                <span className="required"> *</span>
                              )}
                            </label>
                            <input
                              className="form-control form-control-lg shadow"
                              type="text"
                              name={input.name}
                              value={formData[input.name]}
                              onChange={handleInputChange}
                              required={input.name === "email_pass"}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    {/* Submit */}
                    <p className="form-field-wrapper form-row">
                      <button
                        type="submit"
                        className="btn btn-outline-primary button"
                        name="register"
                        // onClick={handleDownloadExcel}
                      >
                        Update
                      </button>
                    </p>
                  </div>
                </form>
                {/* </div>/ */}
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
export default UserProfile;
