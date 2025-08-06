import React, { useEffect, useState } from "react";
import "./Contact.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_user } from "../../data-services/authService_user";
import PageLoding from "../loding-page/PageLoding";
import { authService_constUs } from "../../data-services/authService_constUs";
import { useAuth } from "../../global/AuthContext";

const Contact = () => {
  const { admin } = useAuth();
  const [admin1, setAdmin] = useState(null);
  const { isChecked } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function adminData() {
      try {
        const data = await authService_user.getAdminData();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      } finally {
        setLoading(false);
      }
    }

    adminData();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    comment: "",
  });

  const handleInputChange = (ee) => {
    const { name, value } = ee.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const result = authService_constUs.insertContactInfo(formData);

    if (result) {
      alert("Submit successfully!");
    }
    setFormData({ username: "", email: "", subject: "", comment: "" });
  };

  if (loading) return <PageLoding />;

  return (
    <>
      <Header />
      {isChecked && <Admin_Header />}

      <div className="page-contaiter">
        {/* Breadcrumb */}
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
                  <h1 className="breadcrumb-title">Contact Us</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <a href="/Home">Home</a>
                    </span>
                    <span>Contact Us</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="sec-padding">
          <div className="container">
            {/* <div className="row justify-content-center">
              <div className="col-12">
                <div className="my-account-box mb-4 rounded-4 shadow p-3"> */}
            <div className="row justify-content-center">
              {/* Left: Contact Form */}
              <div className="col-12 col-lg-6 mb-4">
                <div className="my-account-box rounded-4 shadow p-3 h-100">
                  <h2 className="page-title">Get in touch</h2>
                  <form className="Contact-form" onSubmit={handelSubmit}>
                    <div className="form-field-wrapper">
                      <label>
                        Your Name<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="username"
                        placeholder="Your Name"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-field-wrapper">
                      <label>
                        Your Email<span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        name="email"
                        placeholder="Email Id"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-field-wrapper">
                      <label>
                        Your Subject<span className="required">*</span>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        name="subject"
                        placeholder="Enter Subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-field-wrapper">
                      <label>
                        Comments<span className="required">*</span>
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        name="comment"
                        placeholder="Message"
                        required
                        value={formData.comment}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-field-wrapper">
                      <input
                        type="submit"
                        className="btn btn-outline-primary btn--sm button"
                        value="Send Message"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Right: Contact Info */}
              <div className="col-12 col-lg-6 mb-4">
                <div className="my-account-box rounded-4 shadow p-3 h-100">
                  <h2 className="page-title">Contact Info</h2>
                  <div className="contact-information">
                    <div className="form-field-wrapper">
                      <label>Postal Address</label>
                      <p>
                        {admin1?.[0]?.address} <br />
                        {admin1?.[0]?.tal}, {admin1?.[0]?.dist}
                      </p>
                    </div>
                    <div className="form-field-wrapper">
                      <label>Shopping Ltd</label>
                      <p>
                        {admin1?.[0]?.address} <br />
                        {admin1?.[0]?.tal}, {admin1?.[0]?.dist}
                      </p>
                    </div>
                    <div className="form-field-wrapper">
                      <label>Contact Information</label>
                      <p>
                        <i className="ti-email left" /> {admin1?.[0]?.email}
                        <br />
                        <i className="ti-headphone-alt left" /> +91{" "}
                        {admin1?.[0]?.phone}
                      </p>
                    </div>
                    <hr />
                    <div className="form-field-wrapper">
                      <label>Follow Us</label>
                      <ul className="social large d-flex gap-3 ps-0">
                        {admin?.facebook?.trim() && (
                          <li style={{ listStyle: "none" }}>
                            <a
                              href={admin.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                        )}
                        {admin?.instagram?.trim() && (
                          <li style={{ listStyle: "none" }}>
                            <a
                              href={`https://www.instagram.com/${admin.instagram}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-instagram" />
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* row end */}
          </div>
          {/* </div>
            </div>
          </div> */}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
