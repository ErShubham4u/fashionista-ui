import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_cart } from "../../data-services/authService_cart";
import { authService_user } from "../../data-services/authService_user";
import { useAuth } from "../../global/AuthContext";
import { QRCodeSVG } from "qrcode.react";
import { authService_OrderHistry } from "../../data-services/authService_OrderHistry";

const Checkout = () => {
  const { p_id } = useParams();
  const { user } = useAuth();
  const u_id = user?.id;
  const email = user?.email;

  const navigate = useNavigate();

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  const { isChecked } = useGlobalContext();

  const [cartData, setCartData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [agree, setAgree] = useState(false);

  // console.log(cartData)

  useEffect(() => {
    if (!u_id) return;

    const fetchUser = async () => {
      const user = await authService_user.getUserByemail(email);
      // console.log(user);
      setFormData(user);
    };
    fetchUser();

    async function cartData() {
      if (!p_id) {
        const data = await authService_cart.getCartDataByU_id(u_id);
        // console.log(data.length);
        setCartData(data);
      } else {
        const data = await authService_cart.getCartDataByU_idAndP_id(
          u_id,
          p_id
        );
        setCartData(data);
        // console.log(data.length);
      }
    }

    cartData();
  }, [u_id]);

  const grandTotal = cartData.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  ////////////////////

  let updateTimer = null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Local update
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (updateTimer) clearTimeout(updateTimer);

    updateTimer = setTimeout(async () => {
      try {
        const updatedUser = await authService_user.updateSingleUser(
          formData.id,
          name,
          value
        );
        setFormData((prev) => ({
          ...prev,
          ...updatedUser,
        }));
      } catch (error) {
        console.error("Update failed:", error);
      }
    }, 500); // Debounce time in ms
  };

  //////////// Data Send to whatsapp   ////////////

  // const [showQR, setShowQR] = useState(false);
  // const [upiURL, setUpiURL] = useState("");

  const handleOrder = (e) => {
    e.preventDefault();
    // const adminPhoneNumber = "91"+user.phone; // Replace with your own number
    const adminPhoneNumber = "919518511820";

    //     if (cartData.length === 0) {
    //       alert("Your cart is empty.");
    //       return;
    //     }

    //    const total = cartData.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    // // total = 100*2 + 200*1 = 400

    //     // Replace with your UPI ID
    //     const yourUpiID = "anishshitole77-2@okaxis"; // e.g., aniket@oksbi

    //     // Create UPI payment URL
    //     const upiLink = `upi://pay?pa=${yourUpiID}&pn=Aniket%20Store&am=${total}&cu=INR`;

    //     setUpiURL(upiLink);
    //     setShowQR(true);

    ///////////////////

    // let total = 0;
    // let message = `🛒 New Order Request\n\n`;
    // let message = `🛒 *New Order Request*\n\n👤 *Customer Name:* ${user.username}\n📞 *Customer Phone:* ${user.phone}\n\n`;

    // cartData.forEach((item, index) => {
    //   message += `📦 Product ${index + 1}\n`;
    //   message += `ID: ${item.id}\n`;
    //   message += `Name: ${item.name}\n`;
    //   message += `Price: ₹${item.price}\n`;
    //   message += `Quantity: ₹${item.quantity}\n`;

    //   // total += Number(item.price);
    // });

    // const total = cartData.reduce(
    //   (sum, item) => sum + Number(item.price) * item.quantity,
    //   0
    // );

    // message += `🧾 *Total Price:* ₹${total}`;

    // const encodedMessage = encodeURIComponent(message);
    // const whatsappURL = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;

    // window.open(whatsappURL, "_blank");

    // addOrderHistory();

    // navigate("/successfully");

    // navigate("/getWay");

    //////////////////////////////
  };

  async function handlePayment(e) {
    e.preventDefault(); // prevent form submission

    // alert("i am in In..!");
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res || !window.Razorpay) {
      alert("Razorpay SDK failed to load into the window.");
      return;
    }

    // Create Razorpay order
    const orderRes = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: grandTotal }),
    });
    const order = await orderRes.json();

    if (!order.id) {
      alert("Order ID not found.");
      return;
    }

    const options = {
      key: "rzp_test_KhPCVm9NI5tEiu", // ✅ Your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "FashionIsta Store",
      description: "Test Transaction",
      order_id: order.id,

      handler: async function (response) {
        console.log("Razorpay response:", response);

        const verifyRes = await fetch("http://localhost:5000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        console.log("Verify response:", verifyData);

        if (verifyData.success) {
          addOrderHistory(); // ✅ Your custom function
        }

        alert(verifyData.message);
      },

      prefill: {
        name: user?.username || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  async function addOrderHistory() {
    const order_id =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    // console.log(id); // Example: 'l8f4t2xr1'

    for (const item of cartData) {
      const OrderData = {
        u_id: u_id,
        order_id: order_id,
        date: new Date().toLocaleDateString(),
        p_id: item.p_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        track: "",
        size:item.size,

        preDrape: item.preDrape,
        fall: item.fall,
        blouse: item.blouse,

        waist: item.waist,
        hips: item.hips,
        length: item.length,

        mainImage: item.mainImage,
      };
      // console.log("HII");
      // console.log(OrderData);
      const result = await authService_OrderHistry.insertOrderData(OrderData);

      if (result) {
        navigate("/cart");
      }
    }
  }

  const fields = [
    {
      label: "Name",
      name: "username",
      placeholder: "username",
      type: "text",
      col: 12,
    },
    {
      label: "Email Id",
      name: "email",
      placeholder: "Email",
      type: "text",
      col: 12,
    },
    {
      label: "Phone No",
      name: "phone",
      placeholder: "Phone No",
      type: "text",
      col: 12,
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Country",
      type: "text",
      col: 6,
    },
    {
      label: "State",
      name: "state",
      placeholder: "State",
      type: "text",
      col: 6,
    },
    {
      label: "District",
      name: "District",
      placeholder: "District",
      type: "text",
      col: 6,
    },
    {
      label: "Sub-District",
      name: "sub_district",
      placeholder: "Sub-District",
      type: "text",
      col: 6,
    },
    {
      label: "Town / City",
      name: "city",
      placeholder: "Town / City",
      type: "text",
      col: 6,
    },
    { label: "ZIP", name: "zip", placeholder: "ZIP", type: "text", col: 6 },
    {
      label: "Street Address",
      name: "street_address",
      placeholder: "Street Address",
      type: "text",
      col: 12,
    },
  ];

  const isFormValid = () => {
    return fields.every(
      ({ name }) => formData[name] && formData[name].trim() !== ""
    );
  };

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isFormValid()) {
      setErrorMsg("⚠️ Fill all Billing details...!");
    } else if (!agree) {
      setErrorMsg("⚠️ You must Terms and Conditions agree to continue..!");
    } else {
      setErrorMsg("✅ Proceed to payment...!");
    }
  }, [formData, agree]);

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
                  <h1 className="breadcrumb-title">Checkout</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    <span>
                      <Link to={"/cart"}>Cart</Link>
                    </span>
                    <span>Checkout</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Breadcrumb*/}
        {/*Content*/}
        <section className="sec-padding--md">
          <div className="container">
            {/*Alert*/}
            {/* <div className="alert-info" role="alert"> */}
            {/*<a class="button" href="#">View Cart</a>*/}
            {/* Returning customer? <a href="#">Click here to login</a>
            </div> */}
            {/*Alert*/}
            {/*Alert*/}
            {/* <div className="alert-info" role="alert"> */}
            {/*<a class="button" href="#">View Cart</a>*/}
            {/* Have a coupon? <a href="#">Click here to enter your code</a> */}
            {/* </div> */}
            {/*Alert*/}
            <form className="row product-checkout">
              <div className="col-md-6 pr-md-5">
                <div className="product-checkout-customer_details">
                  <h3>Billing Details</h3>
                  <div className="row billing-fields__field-wrapper">
                    {fields.map(({ label, name, placeholder, type, col }) => (
                      <p
                        key={name}
                        className={`form-field-wrapper col-sm-${col}`}
                      >
                        <label htmlFor={name}>
                          {label}&nbsp;
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData[name]}
                          className="form-control form-control-lg"
                          name={name}
                          placeholder={placeholder}
                          required
                          type={type}
                        />
                      </p>
                    ))}

                    <p className="form-field-wrapper col-sm-12">
                      <label htmlFor="order_comments">
                        Order Notes &nbsp;
                        <span className="optional">(optional)</span>
                      </label>
                      <textarea
                        name="order_note"
                        className="form-control form-control-lg"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-checkout-review-order">
                  <h3>Your Order</h3>
                  <div className="order_review">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Price</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartData.map((product) => (
                          <tr key={product.id} className="cart_item">
                            <td className="product-name">
                              {product.name}&nbsp;
                              <strong className="product-qty">
                                {" "}
                                × {product.quantity}
                              </strong>
                            </td>
                            <td className="product-total">
                              <span className="amount">
                                <span className="Price-currencySymbol"></span>
                                {product.price}
                              </span>
                            </td>
                            <td className="product-total">
                              <span className="amount">
                                <span className="Price-currencySymbol"></span>
                                {product.price * product.quantity}.00
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td></td>
                          <td>
                            <span className="woocommerce-Price-amount amount">
                              <span className="woocommerce-Price-currencySymbol"></span>
                              <b> {grandTotal}.00</b>
                            </span>
                          </td>
                        </tr>
                        <tr className="shipping">
                          <th>Shipping</th>
                          <td></td>
                          <td data-title="Shipping">
                            <ul className="shipping_method">
                              {/* <li>
                                <input 
onChange={handleInputChange} 
value={formData. }
                                  name="shipping_method[0]"
                                  data-index={0}
                                  id="shipping_method_0_flat_rate2"
                                  defaultValue="flat_rate:2"
                                  className="shipping_method"
                                  defaultChecked="checked"
                                  type="radio"
                                />
                                <label htmlFor="shipping_method_0_flat_rate2">
                                  Flat rate:{" "}
                                  <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol"></span>
                                    10.00
                                  </span>
                                </label>
                              </li> */}
                              <li>
                                {/* <input 
onChange={handleInputChange} 
value={formData. }
                                  name="shipping_method[0]"
                                  data-index={0}
                                  id="shipping_method_0_free_shipping3"
                                  defaultValue="free_shipping:3"
                                  className="shipping_method"
                                  type="radio"
                                /> */}
                                <label htmlFor="shipping_method_0_free_shipping3">
                                  Free shipping
                                </label>
                              </li>
                              {/* <li>
                                <input 
onChange={handleInputChange} 
value={formData. }
                                  name="shipping_method[0]"
                                  data-index={0}
                                  id="shipping_method_0_local_pickup4"
                                  defaultValue="local_pickup:4"
                                  className="shipping_method"
                                  type="radio"
                                />
                                <label htmlFor="shipping_method_0_local_pickup4">
                                  Local pickup:{" "}
                                  <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">
                                      £
                                    </span>
                                    0.00
                                  </span>
                                </label>
                              </li> */}
                            </ul>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td></td>
                          <td>
                            <strong>
                              <span className="woocommerce-Price-amount amount">
                                <span className="woocommerce-Price-currencySymbol"></span>
                                {grandTotal}.00
                              </span>
                            </strong>{" "}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="checkout-payment">
                      <ul>
                        <li>
                          <label>Check payments</label>
                          <div className="payment_method_cheque">
                            <p>
                              Please send a check to Store Name, Store Street,
                              Store Town, Store State / County, Store Postcode.
                            </p>
                          </div>
                        </li>
                      </ul>
                      <div className="place-order">
                        <div className="terms-and-conditions-wrapper">
                          <p>
                            Your personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our
                            privacy policy.
                          </p>
                          <p>
                            <label>
                              <input
                                // onChange={handleInputChange}
                                className
                                name="terms"
                                id="terms"
                                type="checkbox"
                                onChange={(e) => setAgree(e.target.checked)}
                              />
                              &nbsp;
                              <span className="woocommerce-terms-and-conditions-checkbox-text">
                                I have read and agree to the website{" "}
                                <Link
                                  to={"/terms_condition"}
                                  className="woocommerce-terms-and-conditions-link"
                                  target="_blank"
                                >
                                  Terms and Conditions
                                </Link>
                              </span>
                            </label>
                          </p>
                        </div>
                        <button
                          type="submit"
                          onClick={handlePayment}
                          disabled={!agree || !isFormValid()}
                          className="btn btn--lg btn-outline-primary button btn--full"
                        >
                          Place Order - Pay : {grandTotal}.00
                        </button>

                        {errorMsg && (
                          <p
                            style={{
                              color: errorMsg.includes("✅") ? "green" : "red",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {errorMsg}
                          </p>
                        )}

                        {/* {showQR && (
                          <div style={{ marginTop: "20px" }}>
                            <h4>
                              Scan to Pay ₹
                              {upiURL.split("am=")[1].split("&")[0]}
                            </h4>
                            <QRCodeSVG value={upiURL} size={200} />
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        {/*End Content*/}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
