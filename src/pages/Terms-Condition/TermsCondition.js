import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useGlobalContext } from "../../global/GlobalContext";
import Admin_Header from "../Admin/Admin_Header";

function TermsCondition() {
  const { isChecked } = useGlobalContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Header />
      {isChecked ? <Admin_Header /> : null}

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
                <h1 className="breadcrumb-title">Shipping Policy</h1>
                <nav className="breadcrumb-link">
                  <span>
                    <a href="/Home">Home</a>
                  </span>
                  <span>Shipping Policy</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policy Section */}
      <section className="sec-padding">
        <div className="container" style={{ border: "0px solid black" }}>
          <div className="row d-flex justify-content-center">
            <div
              className="col-sm-12 col-md-7 col-lg-8 shadow-lg"
              style={{ border: "0px solid red" }}
            >
              <div
                className="align-self-center m-3"
                style={{ maxWidth: "900px", lineHeight: "1.7" }}
              >
                <h2>Terms & Conditions – FashionIsta</h2>
                <p>
                  <strong>Effective Date:</strong> June 14, 2025
                </p>

                <p>
                  Welcome to <strong>FashionIsta</strong>. By using our app or
                  website, you agree to comply with the following Terms &
                  Conditions. Please read them carefully before placing any
                  order or creating an account.
                </p>

                <h4>1. Acceptance of Terms</h4>
                <p>
                  By accessing or using FashionIsta, you acknowledge that you
                  have read, understood, and agree to be bound by these terms,
                  including our Privacy Policy.
                </p>

                <h4>2. Eligibility</h4>
                <p>
                  You must be at least 18 years old to use or make purchases
                  from FashionIsta. By using our app, you represent and warrant
                  that you meet this requirement.
                </p>

                <h4>3. User Account</h4>
                <ul>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your login credentials.
                  </li>
                  <li>
                    You agree not to share your account or impersonate another
                    person.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts
                    involved in fraud or abuse.
                  </li>
                </ul>

                <h4>4. Product Information</h4>
                <ul>
                  <li>
                    All product descriptions, images, and prices are subject to
                    change without notice.
                  </li>
                  <li>
                    We strive for accuracy, but colors or design may vary
                    slightly due to device settings.
                  </li>
                </ul>

                <h4>5. Pricing & Payment</h4>
                <ul>
                  <li>
                    Prices are listed in INR and include applicable taxes unless
                    stated otherwise.
                  </li>
                  <li>
                    Payments are processed via secure gateways (UPI, cards, net
                    banking).
                  </li>
                  <li>
                    We may cancel suspicious or incorrectly priced orders
                    without liability.
                  </li>
                </ul>

                <h4>6. Shipping & Delivery</h4>
                <ul>
                  <li>
                    We ship within estimated delivery times shown at checkout.
                  </li>
                  <li>
                    Delays due to courier or external issues are beyond our
                    control.
                  </li>
                  <li>
                    Please ensure accurate shipping details to avoid delays or
                    returns.
                  </li>
                </ul>

                <h4>7. Returns & Refunds</h4>
                <ul>
                  <li>
                    Returns accepted within 7 days for unused products with
                    original tags.
                  </li>
                  <li>
                    <strong>Personal items</strong> like intimate wear or
                    hygiene products are not returnable for safety reasons.
                  </li>
                  <li>
                    Refunds are processed within 5–7 working days post return
                    approval.
                  </li>
                </ul>

                <h4>8. Use of the App</h4>
                <p>You agree not to:</p>
                <ul>
                  <li>Upload viruses or malicious scripts.</li>
                  <li>Engage in fraudulent transactions.</li>
                  <li>Abuse discounts, reviews, or promotions.</li>
                </ul>

                <h4>9. Intellectual Property</h4>
                <p>
                  All logos, images, text, and content belong to FashionIsta or
                  partners. Unauthorized use is prohibited.
                </p>

                <h4>10. Termination</h4>
                <p>
                  We may suspend or terminate access for users violating our
                  Terms without prior notice.
                </p>

                <h4>11. Limitation of Liability</h4>
                <p>
                  FashionIsta is not liable for indirect or incidental damages
                  related to your use of the app, services, or delays in
                  delivery.
                </p>

                <h4>12. Governing Law</h4>
                <p>
                  These Terms are governed by Indian laws. Legal disputes shall
                  be handled in the jurisdiction of [Your City, e.g., Mumbai].
                </p>

                <h4>13. Changes to Terms</h4>
                <p>
                  We may update these Terms occasionally. Continued use means
                  you accept the latest version.
                </p>

                <h4>14. Contact Us</h4>
                <ul>
                  <li>
                    📧 Email:{" "}
                    <a href="mailto:naikaredhanashree@gmail.com">
                      naikaredhanashree@gmail.com
                    </a>
                  </li>
                  <li>📞 Phone: +91 8308675202</li>
                  <li>🏢 Address: [Insert Official Address]</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TermsCondition;
