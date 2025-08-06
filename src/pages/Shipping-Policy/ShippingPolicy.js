import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useGlobalContext } from "../../global/GlobalContext";
import Admin_Header from "../Admin/Admin_Header";

function ShippingPolicy() {
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
        <div className="container" style={{border:"0px solid black"}} >
          <div className="row d-flex justify-content-center" >
            <div className="col-sm-12 col-md-7 col-lg-8 shadow-lg" style={{border:"0px solid red"}}>
              <div className="align-self-center m-3 ">
                {/* <div className="row mt-5">
  <div className="col-12"> */}
                {/* <h3 className="mb-3">Shipping Policy</h3>    */}
              
                <p>
                  At <strong>Fashionista</strong>, we are committed to
                  delivering your favorite fashion picks quickly, safely, and
                  reliably. Please read our shipping policy to understand how we
                  handle orders and deliveries.
                </p>

                <p>
                  📦 <strong>Order Processing</strong>
                  <br />
                  All orders are processed within 1–2 business days.
                  <br />
                  You will receive an email or SMS confirmation once your order
                  is placed and another once it's shipped, including tracking
                  details.
                </p>

                <p>
                  🚚 <strong>Shipping Time</strong>
                  <br />
                  Standard Delivery: 3–7 business days (depending on your
                  location).
                  <br />
                  Express Delivery (if available): 1–3 business days.
                </p>

                <p>
                  🌍 <strong>Shipping Areas</strong>
                  <br />
                  We currently ship across India.
                  <br />
                  For international orders, please contact our support team for
                  availability.
                </p>

                <p>
                  💰 <strong>Shipping Charges</strong>
                  <br />
                  Free Shipping on all orders above ₹999.
                  <br />A standard shipping fee of ₹50 will be applied to orders
                  below ₹999.
                </p>

                <p>
                  🚫 <strong>Delays & Exceptions</strong>
                  <br />
                  Delays may occur during festivals, natural events, or due to
                  courier service issues.
                  <br />
                  We will notify you promptly in case of any delay or issue with
                  your order.
                </p>

                <p>
                  ❓ <strong>Need Help?</strong>
                  <br />
                  If you have any questions about your shipment, feel free to
                  contact us at:
                  <br />
                  📧{" "}
                  <a href="mailto:naikaredhanashree@gmail.com">
                     naikaredhanashree@gmail.com
                  </a>
                  <br />
                  📞 +91 8308675202
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ShippingPolicy;
