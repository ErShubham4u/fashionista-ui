import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useGlobalContext } from "../../global/GlobalContext";
import Admin_Header from "../Admin/Admin_Header";

function PrivacyPolicy() {
  const { isChecked } = useGlobalContext();
  useEffect(()=>{
     window.scrollTo({ top: 0, behavior: "smooth" });

  },[])
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
                <h1 className="breadcrumb-title">Privacy Policy</h1>
                <nav className="breadcrumb-link">
                  <span>
                    <a href="/Home">Home</a>
                  </span>
                  <span>Privacy Policy</span>
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
                // style={{ maxWidth: "900px", lineHeight: "1.7" }}
              >
                {/* <h2>Privacy Policy</h2> */}
                <p>
                  <strong>Effective Date:</strong> June 14, 2025
                </p>

                <p>
                  Welcome to <strong>FashionIsta</strong>. Your privacy is
                  extremely important to us. This Privacy Policy outlines how we
                  collect, use, protect, and share your personal information
                  when you use our services.
                </p>

                <p>
                  FashionIsta is committed to maintaining the confidentiality
                  and security of our users—especially when it comes to personal
                  products, sensitive shopping preferences, and private purchase
                  history.
                </p>

                <h4>1. Information We Collect</h4>
                <p>
                  We collect the following types of personal data when you
                  interact with our app:
                </p>

                <strong>a) Personal Identification Information</strong>
                <ul>
                  <li>Full Name</li>
                  <li>Phone Number</li>
                  <li>Email Address</li>
                  <li>Billing & Shipping Address</li>
                </ul>

                <strong>b) Account & Login Data</strong>
                <ul>
                  <li>Username and Password (encrypted)</li>
                  <li>Profile photo (optional)</li>
                </ul>

                <strong>c) Order & Purchase History</strong>
                <ul>
                  <li>
                    Product names, categories (including sensitive or personal
                    items)
                  </li>
                  <li>Delivery and return history</li>
                  <li>
                    Payment method (we never store full credit/debit card info)
                  </li>
                </ul>

                <strong>d) Device & Usage Data</strong>
                <ul>
                  <li>Device type, browser, operating system</li>
                  <li>IP address, time zone, language</li>
                  <li>Pages visited, time spent, clicks & app interactions</li>
                </ul>

                <strong>e) Location Information</strong>
                <p>
                  With your permission, we may access location data to suggest
                  nearby products or services.
                </p>

                <h4>2. Why We Collect Your Data</h4>
                <ul>
                  <li>Process orders, returns, and refunds smoothly.</li>
                  <li>
                    Customize your shopping experience (e.g., showing relevant
                    women’s personal items).
                  </li>
                  <li>Provide discreet and secure packaging/delivery.</li>
                  <li>Improve our product catalog based on user interests.</li>
                  <li>
                    Send order updates, security alerts, or promotions (you can
                    opt out).
                  </li>
                  <li>Prevent fraud, abuse, or misuse of our services.</li>
                </ul>

                <h4>3. How We Protect Your Data</h4>
                <ul>
                  <li>Use SSL encryption for all data transfers.</li>
                  <li>Store passwords using secure, hashed algorithms.</li>
                  <li>
                    Never share your order history with third parties without
                    consent.
                  </li>
                  <li>
                    Ensure sensitive purchases (like intimate products) remain
                    private.
                  </li>
                </ul>

                <h4>4. Your Rights and Control</h4>
                <ul>
                  <li>Access or update your account information.</li>
                  <li>Request deletion of your account and data anytime.</li>
                  <li>Opt-out of marketing communications.</li>
                  <li>
                    Restrict data processing or ask us to anonymize purchase
                    history.
                  </li>
                </ul>
                <p>
                  You can email us at{" "}
                  <a href="mailto:support@fashionista.com">
                    support@fashionista.com
                  </a>{" "}
                  for any data-related request.
                </p>

                <h4>5. Who We Share Your Data With</h4>
                <p>
                  We do not sell your personal information. However, we may
                  share data with:
                </p>
                <ul>
                  <li>
                    Delivery partners (only what’s necessary for shipping).
                  </li>
                  <li>Payment processors (e.g., Razorpay, Stripe, etc.).</li>
                  <li>
                    Analytics providers (to improve the app, never linked to
                    names or identities).
                  </li>
                  <li>Legal authorities (only if required by law).</li>
                </ul>
                <p>
                  We require all our partners to follow strict privacy and data
                  protection standards.
                </p>

                <h4>6. Cookies and Tracking</h4>
                <ul>
                  <li>Remember your preferences.</li>
                  <li>Show relevant products or offers.</li>
                  <li>Improve speed and security.</li>
                </ul>
                <p>You can control cookies in your browser settings.</p>

                <h4>7. Sensitive Category Handling</h4>
                <p>
                  Since FashionIsta offers personal and sensitive product
                  categories (e.g., intimate wear, hygiene products, etc.), we
                  ensure:
                </p>
                <ul>
                  <li>
                    Such product orders remain private in all communication.
                  </li>
                  <li>Packaging is discreet and unbranded.</li>
                  <li>
                    Sensitive items are not publicly reviewed or displayed under
                    your account unless you allow it.
                  </li>
                </ul>

                <h4>8. Children’s Privacy</h4>
                <p>
                  We do not knowingly collect or store data from anyone under 13
                  years of age. If you're a parent or guardian and believe we’ve
                  collected data from a minor, please contact us immediately.
                </p>

                <h4>9. Updates to This Policy</h4>
                <p>
                  We may revise this policy from time to time. If there are
                  significant changes, we will notify you via email or in-app
                  alerts.
                </p>

                <h4>10. Contact Us</h4>
                <ul>
                  <li>
                    📧 Email:{" "}
                    <a href="mailto:naikaredhanashree@gmail.com">
                       naikaredhanashree@gmail.com
                    </a>
                  </li>
                  <li>📍 Company Address: [Your Company Address]</li>
                  <li>📞 Phone: +91 8308675202</li>
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

export default PrivacyPolicy;
