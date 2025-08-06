import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { useAuth } from "../../global/AuthContext";
import { authService_cart } from "../../data-services/authService_cart";
// import PageLoding from "../loding-page/PageLoding";

const Cart = () => {
  const { user } = useAuth();
  const u_id = user?.id;

  const navigate = useNavigate();

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  const [cartData, setCartData] = useState([]);

  const [quantity, setQuantity] = useState(0);

  const { isChecked } = useGlobalContext();

  console.log(cartData);

  const changeQuantity = (delta) => {
    setQuantity((prev) => {
      const newQty = Math.min(8, Math.max(1, prev + delta));
      return newQty;
    });
  };

  useEffect(() => {
    if (!u_id) return;

    async function cartData() {
      const data = await authService_cart.getCartDataByU_id(u_id);
      // console.log(data.length);
      setCartData(data);
    }

    cartData();
  }, [u_id]);

  const grandTotal = cartData.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const total = cartData.reduce((sum, item) => {
    return (
      sum + (+item.preDrape || 0) + (+item.fall || 0) + (+item.blouse || 0)
    );
  }, 0);

  const finalAmount = grandTotal + total;
  // console.log(finalAmount)
  const NewArivals = "New Arrivals";
  const deleteCartData = async (id) => {
    // console.log(id);
    const out = await authService_cart.deleteCartData(id);
    if (out) {
      alert("Delete Cart Data...!");
    }
    // ✅ Re-fetch updated cart data
    const updatedData = await authService_cart.getCartDataByU_id(u_id);
    setCartData(updatedData);
    if (updatedData) {
      navigate(`/cart`);
    } else {
      navigate(`/product_listing/${NewArivals}`);
    } // update state
  };

  const checkOut = (id) => {
    // alert("set Order");
    navigate(`/checkout/${id}`);
  };

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
                  <h1 className="breadcrumb-title">Cart</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    <span>Cart</span>
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
            <div className="row">
              <div className="col-12">
                <article>
                  <form className="cart-form">
                    <div className="cart-product-table-wrap responsive-table">
                      <table>
                        {cartData.length > 0 ? (
                          <thead>
                            <tr>
                              <th className="product-remove" />
                              <th className="product-thumbnail" />
                              <th className="product-name">Product</th>
                              <th className="product-name"></th>
                              <th className="product-price">Price</th>
                              <th className="product-price">Total</th>
                              <th className="product-qty">Quantity</th>
                              <th className="product-subtotal">Sub Total</th>
                            </tr>
                          </thead>
                        ) : (
                          <thead>
                            <tr>
                              <p className="text-center text-muted mt-3">
                                <h1>Your cart is empty...!</h1>
                              </p>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {cartData.map((data) => (
                            <tr key={data.id} onClick={() => checkOut(data.id)}>
                              <td className="product-remove">
                                <a onClick={() => deleteCartData(data.id)}>
                                  <i
                                    className="fa fa-times-circle"
                                    aria-hidden="true"
                                  />
                                </a>
                              </td>
                              <td className="product-thumbnail">
                                <a>
                                  <img
                                    src={data.mainImage}
                                    alt={data.name || "Product"}
                                  />
                                </a>
                              </td>

                              <td className="product-name">
                                <a>{data.name}</a>
                              </td>

                              {[data.preDrape, data.fall, data.blouse].filter(
                                Boolean
                              ).length > 0 ? (
                                <td className="product-name">
                                  <a className="small text-muted">
                                    {[
                                      data.preDrape &&
                                        `preDrape: ${data.preDrape}`,
                                      data.fall && `fall: ${data.fall}`,
                                      data.blouse && `blouse: ${data.blouse}`,
                                    ]
                                      .filter(Boolean)
                                      .map((item, index) => (
                                        <div key={index}>{item}</div>
                                      ))}
                                  </a>
                                </td>
                              ) : data?.size ? (
                                <td className="product-name">
                                  <a className="small text-muted">
                                   Size : {data?.size}
                                  </a>
                                </td>
                              ) : (
                                <td className="product-name"></td>
                              )}

                              <td className="product-price">
                                <span className="product-price-amount amount">
                                  <span className="currency-sign"></span>₹{" "}
                                  <a>
                                    {(+data.price || 0).toLocaleString("en-IN")}
                                    .00
                                  </a>
                                </span>
                              </td>
                              <td className="product-price">
                                <span className="product-price-amount amount">
                                  <span className="currency-sign"></span>₹{" "}
                                  <a>
                                    {(
                                      (+data.price || 0) +
                                      (+data.preDrape || 0) +
                                      (+data.fall || 0) +
                                      (+data.blouse || 0)
                                    ).toLocaleString("en-IN")}
                                    .00
                                  </a>
                                </span>
                              </td>
                              <td>
                                {data.quantity}
                                {/* <div
                                  className="d-flex align-items-center justify-content-between"
                                  style={{
                                    border: "1px solid #ccc",
                                    width: "120px",
                                    padding: "5px 10px",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    style={{
                                      fontSize: "1.5rem",
                                      textDecoration: "none",
                                    }}
                                    onClick={() => changeQuantity(-1)}
                                  >
                                    −
                                  </button>
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                      minWidth: "20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <input
                                      type="hidden"
                                      name="quantity"
                                      value={quantity}
                                    />
                                    {quantity}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    style={{
                                      fontSize: "1.5rem",
                                      textDecoration: "none",
                                    }}
                                    onClick={() => changeQuantity(1)}
                                  >
                                    +
                                  </button>
                                </div> */}
                              </td>
                              <td className="product-subtotal">
                                <span className="product-price-sub_totle amount">
                                  <span className="currency-sign"></span>₹{" "}
                                  <a>
                                    {(
                                      (Number(data.price || 0) +
                                        Number(data.preDrape || 0) +
                                        Number(data.fall || 0) +
                                        Number(data.blouse || 0)) *
                                      Number(data.quantity || 1)
                                    ).toLocaleString("en-IN", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </a>
                                </span>
                              </td>
                            </tr>
                          ))}

                          {/* /////////////// */}
                          <tr>
                            <td colSpan={6}>
                              {/* <div className="coupon">
                                <input
                                  name="coupon_code"
                                  className="input--lg"
                                  id="coupon_code"
                                  defaultValue
                                  placeholder="Coupon code"
                                  type="text"
                                />
                                <button
                                  type="submit"
                                  className="btn btn--lg btn--secondary"
                                  name="apply_coupon"
                                  value="Apply Coupon"
                                >
                                  Apply Coupon
                                </button>
                              </div> */}
                              {/* <button
                                type="submit"
                                className="update-cart btn btn--lg btn--secondary"
                                name="update_cart"
                                value="Update Cart"
                                // disabled
                              >
                                Update Cart
                              </button> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </form>
                  <div className="cart-collaterals">
                    <div className="cart_totals">
                      <h3>Cart Totals</h3>
                      <table>
                        <tbody>
                          <tr>
                            <th data-title="Subtotal">Subtotal</th>
                            <td>
                              <span className="price-amount amount">
                                <span className="currencySymbol"></span>₹{" "}
                                {finalAmount}.00
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th data-title="Shipping">Shipping</th>
                            <td>
                              <ul id="shipping_method">
                                {/* <li>
                                  
                                  <label htmlFor="shipping_method_0_flat_rate2">
                                    Flat rate:{" "}
                                    <span className="price-amount amount">
                                      <span className="currencySymbol"></span>
                                      10.00
                                    </span>
                                  </label>
                                </li> */}
                                <li>
                                  <label htmlFor="shipping_method_0_free_shipping3">
                                    Free shipping
                                  </label>
                                </li>
                                <li>
                                  {/* <input
                                    name="shipping_method[0]"
                                    data-index={0}
                                    id="shipping_method_0_local_pickup4"
                                    defaultValue="local_pickup:4"
                                    className="shipping_method"
                                    type="radio"
                                  />
                                  <label htmlFor="shipping_method_0_local_pickup4">
                                    Local pickup:{" "}
                                    <span className="price-amount amount">
                                      <span className="currencySymbol">£</span>
                                      0.00
                                    </span>
                                  </label> */}
                                </li>
                              </ul>
                              <form>
                                <a href="javascript:void(0)">
                                  Calculate Shipping
                                </a>
                              </form>
                            </td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              <span className="price-amount amount">
                                <span className="currencySymbol"></span> ₹{" "}
                                {finalAmount}.00
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="proceed-to-checkout">
                        {finalAmount > 0 ? (
                          <Link
                            to={"/checkout"}
                            className="checkout-button btn btn-outline-primary button full-width"
                          >
                            Proceed to checkout
                          </Link>
                        ) : (
                          <p className="text-center text-muted mt-3">
                            Your cart is empty.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        {/*End Content*/}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
