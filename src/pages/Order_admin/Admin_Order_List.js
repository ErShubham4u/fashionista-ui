import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import Admin_Header from "../Admin/Admin_Header";
import { authService_OrderHistry } from "../../data-services/authService_OrderHistry";
import { authService_cart } from "../../data-services/authService_cart";
import { authService_user } from "../../data-services/authService_user";

function Admin_Order_List() {
  const navigate = useNavigate();
  const { user, admin } = useAuth();
  const u_id = user?.id;
  // console.log(user);

  const [orderHistory, setOrderHistory] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [groupedOrders, setGroupedOrders] = useState([]);

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  const fetchAndGroupOrders = async () => {
    const orderData = await authService_OrderHistry.getAllData();

    const uniqueOrderIds = [...new Set(orderData.map((item) => item.order_id))];

    const grouped = [];

    for (let i = 0; i < uniqueOrderIds.length; i++) {
      const orders = await authService_OrderHistry.getDataByOrderId(
        uniqueOrderIds[i]
      );

      if (orders && orders.length > 0) {
        const firstOrder = orders[0]; // assuming all orders with same order_id have same u_id and date
        const userInfo = await authService_user.getUserById(firstOrder.u_id);
        const user = userInfo[0];

        grouped.push({
          date: firstOrder.date,
          u_id: firstOrder.u_id,
          order_id: firstOrder.order_id,
          username: user?.username,
          email: user?.email || "N/A",
          phone: user?.phone || "N/A",
        });
      }
    }

  const parseDate = (str) => {
  const [day, month, year] = str.split("/");
  return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
};

const sortedGrouped = grouped.sort(
  (a, b) => parseDate(b.date) - parseDate(a.date)
);
    setGroupedOrders(sortedGrouped);
  };

  useEffect(() => {
    fetchAndGroupOrders();
  }, []);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = async (product) => {
    try {
      const result = await authService_OrderHistry.getDataByOrderId(
        product.order_id
      );
      if (result && result[0]) {
        console.log(result[0]);
        setSelectedProduct(result[0]);
        setShowModal(true);
      } else {
        alert("❌ Could not fetch order details.");
      }
    } catch (error) {
      console.error("❌ Error fetching order data:", error);
      alert("❌ Server error while opening modal.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const updateOrderStatus = async (order_id, newStatus) => {
    try {
      const order_Data = await authService_OrderHistry.getDataByOrderId(
        order_id
      );

      for (let data of order_Data) {
        // console.log(data.order_id)
        const response = await authService_OrderHistry.pushTrackStatus(
          data.id,
          newStatus
        );
        console.log("Status update response:", response);

        if (response?.success) {
          const user = await authService_user.getUserById(data.u_id);
          const email = user?.[0]?.email;
          // console.log(email);
          sendEmail(newStatus, email, order_id);
          alert("✅ Status Updated!");
          // ✅ Refresh orders list in parent
          fetchAndGroupOrders();

          // ✅ Refetch the updated order to sync modal
          const updated = await authService_OrderHistry.getDataByOrderId(
            order_id
          );
          if (updated && updated[0]) {
            setSelectedProduct(updated[0]); // <-- now shows updated 'track'
          }
        } else {
          alert("❌ Failed to update status.");
        }
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("❌ Server error while updating status.");
    }
  };

  //////////////// Send Track Mail //////////////////////////

  async function sendEmail(newStatus, user_email, order_id) {
    console.log("Sending to:", user_email);
    try {
      const data = await authService_user.checkEmail(admin.email);
      if (data && admin?.email && admin?.email_pass) {
        const res = await fetch("http://localhost:5000/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: user_email,
            adminEmail: admin.email,
            email_pass: admin.email_pass,
            track_no: newStatus,
            orderId: order_id,
          }),
        });

        const result = await res.json();

        if (result.success) {
          alert("✅ Email sent to user.");
        } else {
          alert(`❌ Email failed: ${result.message}`);
          console.error("❌ Backend error:", result.error);
        }
      } else {
        alert("❌ Invalid Admin Email/Password.");
      }
    } catch (err) {
      console.error("❌ Client-side error:", err);
      alert("❌ Email sending failed.");
    }
  }

  /////////////// Send Cancel order email /////////////////

  async function sendOrderCancelEmail(order_id) {
    // console.log("Sending to:", user_email);
    try {
      const orderData = await authService_OrderHistry.getDataByOrderId(
        order_id
      );
      const user = await authService_user.getUserById(orderData.u_id);

      if (admin?.email && admin?.email_pass) {
        const res = await fetch("http://localhost:5000/send-cancel-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: user.email,
            adminEmail: admin.email,
            email_pass: admin.email_pass,
            orderId: order_id,
          }),
        });

        const result = await res.json();

        if (result.success) {
          alert("✅ Email sent to user.");
        } else {
          alert(`❌ Email failed: ${result.message}`);
          // console.error("❌ Backend error:", result.error);
        }
      } else {
        alert("❌ Invalid Admin Email/Password.");
      }
    } catch (err) {
      // console.error("❌ Client-side error:", err);
      alert("❌ Email sending failed.");
    }
  }

  //////////////////////////////////////////////////////////

  const delete_order = async (order_id) => {
    try {
      setLoading(true);
      const response = await authService_OrderHistry.deleteDataByOrderId(
        order_id
      );

      if (response?.success || response?.status === 200) {
        sendOrderCancelEmail(order_id);
        alert("❌ Order Cancelled.");
        fetchAndGroupOrders(); // Refresh data
        closeModal();
      } else {
        alert("❌ Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("❌ Server error while cancelling the order.");
    } finally {
      setLoading(false);
    }
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
                  <h1 className="breadcrumb-title">Order'S</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    <span>Order's</span>
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
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="my-account-box mb-4 rounded-4 shadow p-3">
                  <div className="table-responsive">
                    <table className="table align-middle">
                      {groupedOrders?.length > 0 ? (
                        <>
                          <thead className="table">
                            <tr>
                              <th>#</th>
                              <th>Order Id</th>
                              <th>Date</th>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Detail's</th>
                              <th>Track Order</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupedOrders.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.order_id}</td>
                                <td>{data.date}</td>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>
                                  <Link
                                    to={`/show_products/${
                                      data.u_id
                                    }/${encodeURIComponent(data.date)}/${
                                      data.order_id
                                    }`} // ✅ encodes `/`
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    View Details
                                  </Link>
                                </td>
                                <td>
                                  <a
                                    onClick={() => openModal(data)}
                                    className="btn btn-sm btn-outline-info"
                                  >
                                    Track Order
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center">
                              <h5 className="text-muted mt-3">
                                Customer order list is empty...!
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                    {showModal && selectedProduct && (
                      <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Track Detail's</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                            <div className="modal-body">
                              {/* Order Tracking Steps */}
                              <div className="d-flex flex-wrap justify-content-center gap-2 text-center mb-4">
                                {[
                                  "Order Placed 🎉",
                                  "Ready to Ship 📦",
                                  "Shipped 🚚",
                                  "Out for Delivery 📍",
                                  "Delivered ✅",
                                ].map((label, idx) => {
                                  const isDone =
                                    selectedProduct.track?.includes(idx + 1);

                                  return (
                                    <span
                                      key={idx}
                                      onClick={
                                        isDone
                                          ? null
                                          : () =>
                                              updateOrderStatus(
                                                selectedProduct.order_id,
                                                idx + 1
                                              )
                                      }
                                      className={`btn btn-sm px-3 text-nowrap ${
                                        isDone
                                          ? "btn-success"
                                          : "btn-outline-secondary"
                                      }`}
                                      style={{
                                        minWidth: "120px",
                                        cursor: isDone
                                          ? "not-allowed"
                                          : "pointer",
                                        pointerEvents: isDone ? "none" : "auto", // ⛔ prevent clicking
                                        opacity: isDone ? 0.8 : 1, // 👀 subtle visual cue
                                      }}
                                    >
                                      {label}
                                    </span>
                                  );
                                })}
                              </div>

                              {/* Cancel Button */}
                              {/* Cancel Button - Hide if Delivered ✅ */}
                              {!selectedProduct.track?.includes(5) && (
                                <div className="mt-4 text-center">
                                  <button
                                    onClick={() =>
                                      delete_order(selectedProduct.order_id)
                                    }
                                    className="btn btn-sm px-3 btn-outline-danger"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Cancel Order..!
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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

export default Admin_Order_List;
