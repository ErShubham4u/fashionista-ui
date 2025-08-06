import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import { authService_user } from "../../data-services/user-services";
import { useGlobalContext } from "../../global/GlobalContext";
// import Admin_Header from "./Admin_Header";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import Admin_Header from "../Admin/Admin_Header";
import { authService_OrderHistry } from "../../data-services/authService_OrderHistry";
import InvoiceTemplate from "./InvoiceTemplate ";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { authService_cart } from "../../data-services/authService_cart";

function Order_list() {
  const navigate = useNavigate();
  const { user, admin } = useAuth();
  const u_id = user?.id;
  // console.log(u_id);

  const [orderHistory, setOrderHistory] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [groupedOrders, setGroupedOrders] = useState([]);

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  useEffect(() => {
    const fetchAndGroupOrders = async () => {
      const data = await authService_OrderHistry.getDataByU_id(u_id);
      // console.log(data)
      // Group by date
      const grouped = [];

      const uniqueDates = [...new Set(data.map((item) => item.date))];

      uniqueDates.forEach((date) => {
        const ordersOnDate = data.filter((item) => item.date === date);
        const order_id = ordersOnDate[0]?.order_id;
        const totalProducts = ordersOnDate.length;
        const totalQuantity = ordersOnDate.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const track = ordersOnDate[0]?.track;

        grouped.push({
          date,
          order_id,
          totalProducts,
          totalQuantity,
          items: ordersOnDate,
          track,
        });
      });

      const parseDate = (str) => {
        const [day, month, year] = str.split("/");
        return new Date(
          `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
        );
      };

      const sortedGrouped = grouped.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );
      setGroupedOrders(sortedGrouped); // assume you have a state `const [groupedOrders, setGroupedOrders] = useState([])`
    };

    fetchAndGroupOrders();
  }, [user]);

  console.log(groupedOrders);

  const grandTotal = orderHistory.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

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

  // invoice

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const invoiceRef = useRef();

  const openInvoiceModal = (orderData) => {
    setSelectedOrder(orderData);
    setShowInvoice(true);
  };

  const closeInvoiceModal = () => {
    setShowInvoice(false);
    setSelectedOrder(null);
  };

  const downloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${selectedOrder.order_id}.pdf`);
  };
  /////////////
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
                  <h1 className="breadcrumb-title">Order History</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    <span>Order History</span>
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
                              <th scope="col">#</th>
                              <th scope="col">Date</th>
                              <th scope="col">Order Id</th>
                              <th scope="col">Total Product's</th>
                              <th scope="col">Total Qty</th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                              {/* <th scope="col"></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {groupedOrders.map((data, index) => (
                              <tr key={data.date}>
                                <td>{index + 1}</td>
                                <td>{data.date}</td>
                                <td>{data.order_id}</td>
                                <td>{data.totalProducts}</td>
                                <td>{data.totalQuantity}</td>
                                <td>
                                  <Link
                                    to={`/all_products/${encodeURIComponent(
                                      data.date
                                    )}`}
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    View Details
                                  </Link>
                                </td>
                                <td>
                                  {Array.isArray(data.track) &&
                                  data.track.map(Number).includes(5) ? (
                                    <button
                                      onClick={() => openInvoiceModal(data)}
                                      className="btn btn-sm btn-outline-success"
                                    >
                                      Invoice...!
                                    </button>
                                  ) : (
                                    <a
                                      onClick={() => openModal(data)}
                                      className="btn btn-sm btn-outline-danger"
                                    >
                                      Cancel Order
                                    </a>
                                  )}
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
                                Your order history list is empty...!
                              </h5>
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
                              <h5 className="modal-title">
                                Order Delete Details
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                            <div className="modal-body">
                              {/* Your existing product image or details here */}

                              <div className="mt-4 text-center">
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "#444",
                                  }}
                                >
                                  To cancel this order, please contact admin at
                                  <br />
                                  <a
                                    href={`mailto:${admin?.email}`}
                                    style={{ color: "#007bff" }}
                                  >
                                    {admin?.email}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 🪟 Modal (Invoice ) */}
                    {/* Modal */}
                    {showInvoice && selectedOrder && (
                      <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="modal-dialog modal-dialog-centered modal-lg w-100 mx-auto">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Order Invoice</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeInvoiceModal}
                              ></button>
                            </div>
                            <div
                              className="modal-body"
                              style={{ overflowX: "auto" }}
                            >
                              <div className="text-center my-3">
                                <button
                                  onClick={downloadPDF}
                                  className="btn btn-primary"
                                >
                                  Download Invoice PDF
                                </button>
                              </div>

                              {/* Hidden invoice for PDF rendering */}
                              <div className="invoice-pdf-container">
                                <InvoiceTemplate
                                  ref={invoiceRef}
                                  order={selectedOrder}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scoped style for hiding in mobile view */}
                        <style>
                          {`
        @media (max-width: 768px) {
          .invoice-pdf-container {
            display: none;
          }
        }
      `}
                        </style>
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

export default Order_list;
