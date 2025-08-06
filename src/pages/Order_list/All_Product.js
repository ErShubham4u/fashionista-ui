import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useGlobalContext } from "../../global/GlobalContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import Admin_Header from "../Admin/Admin_Header";
import { authService_OrderHistry } from "../../data-services/authService_OrderHistry";

function All_Product() {
  const { user } = useAuth();
  const u_id = user?.id;
  const { date } = useParams();
  const decodedDate = decodeURIComponent(date);

  //   console.log(decodedDate);
  const navigate = useNavigate();
  // ✅ Protect route: redirect if not logged in
  const [orderHistory, setOrderHistory] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  useEffect(() => {
    const autoCallFunction = async () => {
      try {
        const data = await authService_OrderHistry.getDataByDate(decodedDate);
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    autoCallFunction();
  }, [decodedDate]);

  console.log(orderHistory);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const { isChecked } = useGlobalContext();

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
                  <h1 className="breadcrumb-title">Order Product's</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    <span>
                      <Link to={"/orderList"}>Order History</Link>
                    </span>
                    <span>Order Product's</span>
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
                    <div className="table-responsive">
                      <table className="table text-center align-middle">
                        {orderHistory?.length > 0 ? (
                          <>
                            <thead className="table">
                              <tr>
                                <th></th>

                                <th>Image</th>
                                <th></th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Quantity</th>
                                <th>Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderHistory.map((data, index) => (
                                <tr
                                  key={index}
                                  className="align-middle text-center"
                                >
                                  <td className="align-middle">{index + 1}</td>

                                  <td>
                                    <img
                                      src={data.mainImage}
                                      onClick={() => openModal(data)}
                                      alt={data.name || "Product"}
                                      className="img-fluid"
                                      style={{
                                        maxWidth: "80px",
                                        height: "auto",
                                      }}
                                    />
                                  </td>
                                  {[
                                    data.preDrape,
                                    data.fall,
                                    data.blouse,
                                  ].filter(Boolean).length > 0 ? (
                                    <td className="align-middle">
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
                                    </td>
                                  ) : data?.size ? (
                                    <td className="align-middle">
                                      Size : {data?.size}
                                    </td>
                                  ) : (
                                    <td className="product-name"></td>
                                  )}
                                  {/* <td>{data.name}</td> */}
                                  <td className="align-middle">
                                    {(+data.price || 0).toLocaleString("en-IN")}
                                    .00
                                  </td>
                                  <td className="align-middle">
                                    {(
                                      (+data.price || 0) +
                                      (+data.preDrape || 0) +
                                      (+data.fall || 0) +
                                      (+data.blouse || 0)
                                    ).toLocaleString("en-IN")}
                                    .00
                                  </td>
                                  <td className="align-middle">
                                    {data.quantity}
                                  </td>
                                  <td className="align-middle">
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
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        ) : (
                          <tbody>
                            <tr>
                              <td colSpan="5" className="text-center">
                                <h4 className="text-muted mt-3">
                                  Your order history list is empty...!
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                      {/* 🪟 Modal (Outside the map) */}
                      {showModal && selectedProduct && (
                        <div
                          className="modal fade show d-block"
                          tabIndex="-1"
                          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Product Details</h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={closeModal}
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div
                                  style={{
                                    height: "500px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <img
                                    src={selectedProduct?.mainImage}
                                    alt="product"
                                    style={{
                                      height: "100%",
                                      width: "auto",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
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
}

export default All_Product;
