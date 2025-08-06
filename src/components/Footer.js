import React from "react";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";
import { useAuth } from "../global/AuthContext";
import PageLoding from "../pages/loding-page/PageLoding";

const Footer = () => {
  const { user, admin } = useAuth();
  // console.log(admin);
  if (!admin) {
    return <PageLoding />;
  }
  const NewArivals = "New Arrivals";
  const MyProduct = "FashionIsta Product's";
  const Sadi = "Saree";
  const Accessories = "Accessories";
  return (
    <footer className="footer bg--dark rounded-3">
      {/*Footer Widget Bar*/}
      <section className="footer-widget-area rounded-3">
        <div className="container">
          <div className="row">
            <div className="footer-widget col-lg-5 col-14 mb-lg-0 mb-4 pr-lg-6">
              {/* <img
                className="footer-logo mb-4"
                src="img/logo/fashionIsta_bg.png"
                alt="Mullar" style={{border:"px solid black",height:"600px"}}
              /> */}
              <a
                href="/Home"
                style={{
                  border: "px solid black",
                  height: "60px",
                  textShadow: "inherit",
                }}
              >
                <img src="/img/logo/fashionIsta_bg.png" className="logo-dark" />

                {/* <h3>Shopping</h3> */}
              </a>

              <ul>
                <li>
                  <a href="tel:8308675202">
                    <i className="fa fa-phone" />
                    &nbsp;
                    <span>+91 {admin?.phone}</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:naikaredhanashree@gmail.com">
                    <i className="fa fa-envelope-open" />
                    &nbsp;<span>{admin?.email}</span>
                  </a>
                </li>
                <ul className="social">
                  {/* <li>
                    <a href="/Home">
                      <i className="fa fa-twitter" />
                    </a>
                  </li> */}
                  {admin?.facebook && admin.facebook.trim() !== "" && (
                    <li>
                      <a
                        href={admin.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                  )}

                  {admin?.google && admin.google.trim() !== "" && (
                    <li>
                      <a href={admin?.google}>
                        <i className="fa fa-google" />
                      </a>
                    </li>
                  )}

                  {admin?.instagram && admin.instagram.trim() !== "" && (
                    <li>
                      <a
                        href={`https://www.instagram.com/${admin?.instagram}/`}
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  )}
                </ul>
              </ul>
            </div>
            <div className="footer-widget col-sm-4 col-md-4 col-lg-2 col-12 mb-lg-0 mb-4">
              <ul>
                <h6 className="footer-widget-title">Information</h6>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact Us</Link>
                </li>

                <li>
                  <Link to={"/shipping_policy"}>Shipping Policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget col-sm-4 col-md-4 col-lg-2 col-12 mb-lg-0 mb-4">
              <ul>
                <h6 className="footer-widget-title">Usefull Links</h6>
                <li>
                  <Link to={"/privacy_policy"}>Privacy Policy</Link>
                </li>

                <li>
                  <Link to={"/terms_condition"}>Terms &amp; Condition</Link>
                </li>
                {user?.email !== admin?.email && (
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                )}

                <li>
                  <Link to={"/UserProfile"}>My account</Link>
                </li>
                <li>{/* <a href="/Home">Order Tracking</a> */}</li>
              </ul>
            </div>
            <div className="footer-widget col-sm-4 col-md-4 col-lg-2 col-12 mb-lg-0 mb-4">
              <ul>
                <h6 className="footer-widget-title">Our Link</h6>

                <li>
                  <Link to={`/product_listing/${NewArivals}`}>
                    FashionIsta Product's
                  </Link>
                </li>
                <li>
                  <Link to={`/product_listing/${Sadi}`}>Saree</Link>
                </li>
                <li>
                  <Link to={`/product_listing/${Accessories}`}>
                    Accessories
                  </Link>
                </li>
                <li>{/* <a href="/Home">Fabric</a> */}</li>
                <li>{/* <a href="/Home">Fabric Jewellery</a> */}</li>
              </ul>
            </div>
            {/* <div className="footer-widget col-lg-3 col-12 mb-lg-0 mb-3">
              <h6 className="footer-widget-title">Signup for Newsletter</h6>
              <form className="pt-2">
                <p>
                  Sign up for our newsletter to get the latest news,
                  announcements and special
                </p>
                <div className="form-field-wrapper">
                  <input
                    className="newsletter-input form-full"
                    placeholder="Email Address"
                    type="email"
                  />
                  <button
                    className="newsletter-btn btn btn--primary"
                    type="submit"
                  >
                    Go
                  </button>
                </div>
              </form>
              <ul className="social">
                <li>
                  <a href="/Home">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="/Home">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="/Home">
                    <i className="fa fa-google" />
                  </a>
                </li>
                <li>
                  <a href="/Home">
                    <i className="fa fa-linkedin-square" />
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>
      {/*Footer Copyright Bar*/}
      <section className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-left">
              <p className="footer-copyright">
                <a href="/Home" target="_blank" rel="noopener noreferrer">
                  © 2025 FashionIsta <i className="fa fa-heart" />
                </a>
              </p>
            </div>
            {/* <div className="col-md-6 text-center text-md-right">
          <img src="img/payment_logos.png" alt="payment logos" />
        </div> */}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
