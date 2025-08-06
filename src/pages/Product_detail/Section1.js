import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import PageLoding from "../loding-page/PageLoding";
import { useAuth } from "../../global/AuthContext";
import { authService_cart } from "../../data-services/authService_cart";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_accessories } from "../../data-services/authService_accessories";
import { authService_myPro } from "../../data-services/authService_myPro";
import { Switch } from "@mui/material";
import "./Details.css";
import { Button, Modal } from "bootstrap";

const Section1 = ({ data }) => {
  const { admin, user } = useAuth();
  // const { admin } = useGlobalContext();
  const u_id = user?.id;
  const size = data?.sizes;
  const category = data?.category;
  const defult_price = Number(data?.price) + 250;

  const [qty, setQuantity] = useState(1);
  const [activeimg, setactiveimg] = useState(data?.mainImage || "");
  const [allData, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(data?.stock || false);
  const [selectedSize, setSelectedSize] = useState("");

  const [measurements, setMeasurements] = useState({
    waist: "",
    hips: "",
    length: "",
  });

  const [addons, setAddons] = useState({
    preDrape: false,
    fall: false,
    blouse: false,
  });

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [unit, setUnit] = useState("cm"); // 'cm' or 'inches'

  const sizeChartData = {
    cm: {
      bust: [79, 84, 89, 94, 99, 104, 109, 114, 119],
      shoulder: [33, 34, 35, 36, 37, 39, 40, 41, 42],
      armhole: [35.5, 36, 37, 38, 40, 41, 42, 43, 44],
      waist: [61.5, 64, 71, 74, 79, 84, 89, 94, 106],
    },
    inches: {
      bust: [31.1, 33.1, 35, 37, 39, 40.9, 42.9, 44.9, 46.9],
      shoulder: [13, 13.4, 13.8, 14.2, 14.6, 15.4, 15.7, 16.1, 16.5],
      armhole: [14, 14.2, 14.6, 15, 15.7, 16.1, 16.5, 16.9, 17.3],
      waist: [24.2, 25.2, 28, 29.1, 31.1, 33.1, 35, 37, 41.7],
    },
  };

  const sizeLabels = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  // console.log(data);

  // 🔁 REFRESH THE PRODUCT FROM BACKEND
  const fetchLatestProduct = async () => {
    let updatedData = null;
    switch (data.category) {
      case "FashionIsta Product's":
        updatedData = await authService_myPro.getMyProductById(data.id);
        break;
      case "Saree":
        updatedData = await authService_sadee.getSadeeById(data.id);
        break;
      case "Accessories":
        updatedData = await authService_accessories.getAccessoriesById(data.id);
        break;
      default:
        break;
    }

    if (updatedData) {
      setIsChecked(updatedData.stock); // 🟢 Update the toggle with new status
    }
  };

  // 🟢 Toggle Stock Switch
  async function stockManage() {
    const newValue = !isChecked;
    setIsChecked(newValue);

    let result = null;
    switch (data?.category) {
      case "FashionIsta Product's":
        result = await authService_myPro.updateStock(data.id, newValue);
        break;
      case "Saree":
        result = await authService_sadee.updateStock(data.id, newValue);
        break;
      case "Accessories":
        result = await authService_accessories.updateStock(data.id, newValue);
        break;
      default:
        alert("Unknown category.");
        return;
    }

    if (result) {
      alert("Stock status updated!");
      // OPTIONAL: navigate("/Home");
    }
  }

  const changeQuantity = (delta) => {
    setQuantity((prev) => {
      const newQty = Math.min(8, Math.max(1, prev + delta));
      return newQty;
    });
  };

  const prices = {
    preDrape: Number(data?.preDrape),
    fall: Number(data?.fall),
    blouse: Number(data?.blouse),
  };

  const addToCart = async () => {
    console.log("addToCart");
    const cartData = {
      u_id: u_id,
      p_id: data.id,
      name: data.productName,
      price: data.price,
      quantity: qty,
      size: selectedSize,

      preDrape: addons.preDrape ? prices.preDrape : 0,
      fall: addons.fall ? prices.fall : 0,
      blouse: addons.blouse ? prices.blouse : 0,

      waist: measurements.waist,
      hips: measurements.hips,
      length: measurements.length,

      mainImage: data.mainImage,
    };
    const result = await authService_cart.insertCartDetails(cartData, u_id);
    if (result) {
      alert("Added in Cart...!  Cart Product's : " + result.length);
    }
  };

  async function sadeData(color) {
    const Datas = await authService_sadee.getSadeeByColor(color);
    setData(Datas);
  }

  async function accessories(color) {
    const Datas = await authService_accessories.getAccessoriesByColor(color);
    setData(Datas);
  }

  async function fashionIsta(color) {
    const Datas = await authService_myPro.getMyproductByColor(color);
    setData(Datas);
  }

  // const prices = {
  //   preDrape: 500,
  //   fall: 500,
  //   blouse: 500,
  // };

  useEffect(() => {
    if (!data) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchLatestProduct(); // 🔁 get updated stock value from backend

    switch (data.category) {
      case "FashionIsta Product's":
        fashionIsta(data.color);
        break;
      case "Saree":
        sadeData(data.color);
        break;
      case "Accessories":
        accessories(data.color);
        break;
      default:
        break;
    }
  }, [data?.category, data?.id]);

  const notLogin = () => {
    alert("Plz Log-In Your Account...!");
  };

  // const navigate = useNavigate();
  const handleEditProduct = () => {
    // Navigate or open edit form
    navigate(`/edit_product/${data.id}/${data.category}`);
  };

  ////////////////////////////////

  //  const prices = {
  //     preDrape: 500,
  //     fall: 500,
  //     blouse: 500,
  //   };
  const totalPrice =
    (addons.preDrape ? prices.preDrape : 0) +
    (addons.fall ? prices.fall : 0) +
    (addons.blouse ? prices.blouse : 0);

  const handleCheckbox = (option) => {
    setAddons({ ...addons, [option]: !addons[option] });
  };

  /////////////////////////////////

  if (!data) {
    return <PageLoding />;
  }
  return (
    <>
      <section className="sec-padding--md">
        {/* Product */}
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12  mb-2">
              <div
                className="p-3"
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                  height: "700px", // ✅ increased container height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    height: "550px",
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
                    src={activeimg ? activeimg : data?.mainImage}
                    alt="product"
                    style={{
                      height: "100%", // ✅ force image height = container height
                      width: "auto", // ✅ maintain aspect ratio (no stretch)
                      objectFit: "cover", // ✅ if you want it to fill (or use 'contain' if you want full image without cut)
                    }}
                  />
                </div>
                {/* Thumbnails */}
                <div
                  className="d-flex flex-row mt-3"
                  style={{
                    overflowX: "auto",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {[
                    data?.mainImage,
                    data?.firstImage,
                    data?.secondImage,
                    data?.thirdImage,
                    data?.fourthImage,
                  ]
                    .filter(Boolean)
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        onClick={() => setactiveimg(img)}
                        style={{
                          height: "80px",
                          width: "80px",
                          objectFit: "cover",
                          border:
                            activeimg === img
                              ? "2px solid #27af9a"
                              : "1px solid #ccc",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-lg-6 col-md-12">
              <div
                className="p-4"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                }}
              >
                <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
                  {data?.productName}
                </h1>
                <p style={{ fontSize: "22px", color: "#333" }}>
                  <b>₹ {data?.price}</b>
                  <del style={{ marginLeft: "10px", color: "#999" }}>
                    ₹ {defult_price}
                  </del>
                </p>
                <p style={{ color: "#666" }}>
                  Tax included.{" "}
                  <a
                    href="/shipping-policy"
                    style={{ textDecoration: "underline", color: "blue" }}
                  >
                    Shipping
                  </a>{" "}
                  calculated at checkout.
                </p>

                {/* //////////////////// */}
                {category === "Saree" && (
                  <div className="p-3 border rounded">
                    <h5 className="fw-bold">
                      Make it your own{" "}
                      <span className="fw-normal text-muted">
                        (+ ₹ {totalPrice.toLocaleString("en-IN")}.00)
                      </span>
                    </h5>

                    <p className="text-muted small mb-3">
                      {[
                        addons.preDrape && "Pre-drape this Saree",
                        addons.fall && "Fall",
                        addons.blouse && "Unstitched Blouse",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input pink-checkbox"
                        type="checkbox"
                        id="preDrape"
                        checked={addons.preDrape}
                        onChange={() => handleCheckbox("preDrape")}
                      />
                      <label className="form-check-label" htmlFor="preDrape">
                        <div>
                          <strong>
                            Pre-drape this Saree (+ ₹ {prices.preDrape}.00)
                          </strong>
                        </div>
                        <small className="text-muted">
                          Tailored to your size, wear it like a dress.
                        </small>
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input pink-checkbox"
                        type="checkbox"
                        id="fall"
                        checked={addons.fall}
                        onChange={() => handleCheckbox("fall")}
                      />
                      <label className="form-check-label" htmlFor="fall">
                        Fall (+ ₹ {prices.fall}.00)
                      </label>
                    </div>

                    <div className="form-check mb-4">
                      <input
                        className="form-check-input pink-checkbox"
                        type="checkbox"
                        id="blouse"
                        checked={addons.blouse}
                        onChange={() => handleCheckbox("blouse")}
                      />
                      <label className="form-check-label" htmlFor="blouse">
                        Unstitched Blouse (+ ₹ {prices.blouse}.00)
                      </label>
                    </div>

                    {addons.preDrape && (
                      <>
                        <hr />

                        <h5 className="fw-bold">
                          Pre-draped Saree Measurements
                        </h5>

                        <form className="mt-3">
                          <div className="mb-3">
                            <label className="form-label">
                              Waist <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="waist"
                              className="form-control"
                              required
                              value={measurements.waist}
                              onChange={(e) =>
                                setMeasurements({
                                  ...measurements,
                                  waist: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Hips <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="hips"
                              className="form-control"
                              required
                              value={measurements.hips}
                              onChange={(e) =>
                                setMeasurements({
                                  ...measurements,
                                  hips: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Length <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="length"
                              className="form-control"
                              required
                              value={measurements.length}
                              onChange={(e) =>
                                setMeasurements({
                                  ...measurements,
                                  length: e.target.value,
                                })
                              }
                            />
                          </div>
                        </form>
                      </>
                    )}
                    <p className="mt-3 text-success fw-semibold">
                      Selections will add ₹ {totalPrice.toLocaleString("en-IN")}
                      .00 to the price
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                {user?.email === admin?.email ? (
                  <>
                    <label htmlFor="quantity" className="form-label mt-3 mb-1">
                      Stock
                    </label>
                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      style={{
                        border: "1px solid #ccc",
                        width: "130px",
                        padding: "5px 0px",
                        borderRadius: "6px",
                      }}
                    >
                      <div className="form-check form-switch ">
                        <Switch
                          title="Admin Header"
                          checked={isChecked}
                          onChange={stockManage}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#e91e63",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: "#e91e63",
                              },
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor="quantity" className="form-label mt-3 mb-1">
                      Quantity
                    </label>
                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      style={{
                        border: "1px solid #ccc",
                        width: "120px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        style={{ fontSize: "1.5rem", textDecoration: "none" }}
                        onClick={() => changeQuantity(-1)}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "1.2rem" }}>{qty}</span>
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        style={{ fontSize: "1.5rem", textDecoration: "none" }}
                        onClick={() => changeQuantity(1)}
                      >
                        +
                      </button>
                    </div>
                    {category === "FashionIsta Product's" && (
                      <div className="mb-3">
                        {/* <label className="form-label fw-semibold">Select Size</label> */}

                        {/* Size Buttons */}
                        <div className="d-flex flex-wrap mt-1">
                          {data?.sizes?.map((size) => (
                            <button
                              key={size}
                              className={`btn btn-sm size-btn px-1 py-1 ${
                                selectedSize === size ? "selected" : ""
                              }`}
                              onClick={() => setSelectedSize(size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {/* Size Chart Link */}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                          }}
                          // className="btn btn-sm btn-outline-secondary mt-2"
                        >
                          Size Chart
                        </a>
                      </div>
                    )}
                  </>
                )}

                {showModal && (
                  <div
                    className="custom-modal-overlay"
                    onClick={() => setShowModal(false)}
                  >
                    <div
                      className="custom-modal-content bg-white rounded-4 p-4 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h5 className="text-center mb-3 fw-bold text-uppercase">
                        Size Chart
                      </h5>

                      {/* Toggle Button for cm/inches */}
                      <div className="text-center mb-3">
                        <button
                          className={`btn btn-sm me-2 ${
                            unit === "cm"
                              ? "btn-warning"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setUnit("cm")}
                        >
                          cm
                        </button>
                        <button
                          className={`btn btn-sm ${
                            unit === "inches"
                              ? "btn-warning"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setUnit("inches")}
                        >
                          inches
                        </button>
                      </div>

                      {/* Image */}
                      {/* <div className="text-center mb-4">
                        <img
                          src="/img/blouse-size-chart.png"
                          alt="Blouse Size Chart"
                          className="img-fluid rounded-3"
                          style={{ maxHeight: "180px", objectFit: "cover" }}
                        />
                      </div> */}

                      {/* Chart Table */}
                      <div className="table-responsive">
                        <table className="table table-bordered text-center align-middle mb-4">
                          <thead className="table-light">
                            <tr>
                              <th>Size</th>
                              {sizeLabels.map((label) => (
                                <th key={label}>{label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {["bust", "shoulder", "armhole", "waist"].map(
                              (key) => (
                                <tr key={key}>
                                  <td className="fw-bold text-capitalize">
                                    {key}
                                  </td>
                                  {sizeChartData[unit][key].map((val, idx) => (
                                    <td key={idx}>{val}</td>
                                  ))}
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-dark btn-sm px-4"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {user?.email === admin?.email ? (
                  <Link
                    to={`/edit_product/${data?.id}/${data?.category}`}
                    className="btn btn-outline-success mb-3 col-md-8"
                  >
                    Update Product Details
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={addToCart}
                      className="btn btn-outline-primary mb-3 col-md-8"
                      disabled={
                        addons.preDrape &&
                        (!measurements.waist ||
                          !measurements.hips ||
                          !measurements.length)
                      }
                    >
                      Add to Cart
                    </button>
                    {/* {data.stock === true &&} */}
                    <div>
                      {addons.preDrape &&
                      (!measurements.waist ||
                        !measurements.hips ||
                        !measurements.length) ? (
                        <button
                          className="btn btn-outline-success mb-3 col-md-8"
                          disabled
                        >
                          Buy it now
                        </button>
                      ) : (
                        <Link
                          onClick={addToCart}
                          to="/checkout"
                          className="btn btn-outline-success mb-3 col-md-8"
                        >
                          Buy it now
                        </Link>
                      )}
                    </div>

                    {addons.preDrape &&
                      (!measurements.waist ||
                        !measurements.hips ||
                        !measurements.length) && (
                        <p className="text-danger small">
                          Please fill all measurements to add pre-draped saree.
                        </p>
                      )}
                  </>
                )}

                <div className="product-meta">
                  <h4>
                    <strong>Description</strong>
                  </h4>
                  {/* <p>
                    <strong>- {data?.productName} -</strong>
                  </p> */}
                  <p>
                    <strong>Categories :</strong> {data?.category},{" "}
                    {data?.subCategory}
                  </p>
                  <p>
                    <strong>Material :</strong> {data?.material}
                  </p>
                  <p>
                    <strong>Print / Work :</strong> {data?.printWork}
                  </p>
                  <p>
                    <strong>Occasion :</strong> {data?.occasion}
                  </p>
                  <p>
                    <strong>Pack Contain :</strong> {data?.packContain}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Product */}
        {/*Product Tabs*/}
        <div className="container">
          <div className="product-tabs-wrapper">
            {/*Tabs*/}
            <ul
              className="product-tabs-nav nav justify-content-center"
              role="tablist"
            >
              <li className="d-none d-md-block">
                {" "}
                {/* Hides this li on screens <768px */}
                <a
                  className="active"
                  href="#tab_description"
                  role="tab"
                  data-toggle="tab"
                  aria-expanded="false"
                >
                  Description
                </a>
              </li>

              <li className="d-none d-md-block">
                {" "}
                {/* Hides this li on screens <768px */}
                <a
                  href="#tab_information"
                  role="tab"
                  data-toggle="tab"
                  aria-expanded="true"
                >
                  Additional information
                </a>
              </li>

              {/* <li>
    <a href="#tab_reviews" role="tab" data-toggle="tab">
      Reviews (3)
    </a>
  </li> */}

              <li>
                {/* <Link className href="#tab_custom" role="tab" data-toggle="tab">
      Custom Tab
    </Link> */}
              </li>
            </ul>

            {/*End Tabs*/}
            {/*Tabs Content*/}
            <div
              id="product-accordian-Content"
              className="product-Content-tabs"
            >
              {/* Description */}
              <div
                id="tab_description"
                role="tabpanel"
                className="tab-pane fade show active"
              >
                {/*Header*/}
                <div id="accrodianOne" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Description
                  </a>
                </div>
                {/*Body*/}
                <div
                  id="collapseOne"
                  className="product-tab-Content-body collapse show"
                  aria-labelledby="accrodianOne"
                  data-parent="#product-accordian-Content"
                >
                  <p>{data?.description}</p>
                  {/* <p>
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    There is no one who loves pain itself, who seeks after it
                    and wants to have it, simply because it is pain.
                  </p> */}
                </div>
              </div>
              {/*Additional information*/}
              <div
                id="tab_information"
                role="tabpanel"
                className="tab-pane fade"
              >
                {/*Header*/}
                <div id="accrodianTwo" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Additional information
                  </a>
                </div>
                {/*Body*/}
                <div
                  id="collapseTwo"
                  className="product-tab-Content-body collapse justify-content-center "
                  aria-labelledby="accrodianTwo"
                  data-parent="#product-accordian-Content"
                >
                  <div className="detail-table text-center">
                    <table>
                      <tbody>
                        <tr>
                          <th>Color :</th>
                          <td>{data?.color}</td>
                        </tr>
                        <tr>
                          <th>Size :</th>
                          <td>
                            {Array.isArray(size) && size.length > 0
                              ? size.join(", ")
                              : "N/A"}
                          </td>
                        </tr>

                        <tr>
                          <th>Weight :</th>
                          <td>{data?.weight}</td>
                        </tr>
                        <tr>
                          <th>Dimensions :</th>
                          <td>
                            L {data?.length} cm x W {data?.width} cm
                          </td>
                        </tr>
                        <tr>
                          <th>Washcare :</th>
                          <td>{data?.washcare}</td>
                        </tr>

                        <tr>
                          <th>Lining composition :</th>
                          <td>{data?.lining_composition}</td>
                        </tr>
                        {/* <tr>
                          <th>Other info :</th>
                          <td>Ullamcorper nisl mus integer mollis vestibulu</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/*Reviews */}
              {/* <div id="tab_reviews" role="tabpanel" className="tab-pane fade">
               
                <div id="accrodianThree" className="product-Content-toggle">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Reviews (3)
                  </a>
                </div>
               
                <div
                  id="collapseThree"
                  className="product-tab-Content-body collapse"
                  aria-labelledby="accrodianThree"
                  data-parent="#product-accordian-Content"
                >
                  <div className="row">
                   
                    <div className="col-md-6">
                      <div className="review-form-wrapper">
                        <h4 className="review-title">Add a Review</h4>
                        <p>
                          Your email address will not be published. Required
                          fields are marked *
                        </p>
                        <form id="comment-form" className="comment-form">
                          <div className="form-field-wrapper">
                            <label>Your Rating</label>
                            <p className="stars selected">
                              <span>
                                <a
                                  className="star-1"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-2"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-3"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-4"
                                  href="javascript:void(0)"
                                />
                                <a
                                  className="star-5"
                                  href="javascript:void(0)"
                                />
                              </span>
                            </p>
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Your Review<span className="required">*</span>
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              className="form-full"
                              cols={45}
                              rows={10}
                              aria-required="true"
                              required
                              defaultValue={""}
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Name<span className="required">*</span>
                            </label>
                            <input
                              id="author"
                              name="author"
                              className="form-full"
                              defaultValue
                              size={30}
                              aria-required="true"
                              required
                              type="text"
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <label>
                              Email<span className="required">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              className="form-full"
                              defaultValue
                              size={30}
                              aria-required="true"
                              required
                              type="email"
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <input
                              name="submit"
                              id="submit"
                              className="btn btn--primary"
                              defaultValue="Submit"
                              type="submit"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
      
                    <div className="col-md-6">
                      <div className="comments">
                        <h4 className="review-title">
                          3 Review for <span>This Product</span>
                        </h4>
                        <ul className="commentlist">
           
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "80%" }} />
                              </div>
                              <p className="meta">
                                <strong>James Koster</strong>
                                <span>–</span>
                                <time dateTime="2018-08-21">
                                  August 21, 2018
                                </time>
                              </p>
                              <div className="description">
                                <p>
                                  when an unknown printer took a galley of type
                                  and scrambled it to make a type specimen book.
                                  It has survived not only five centuries
                                </p>
                              </div>
                            </div>
                          </li>
                          
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "100%" }} />
                              </div>
                              <p className="meta">
                                <strong>Michel</strong>
                                <span>–</span>
                                <time dateTime="August 21, 2018">
                                  August 21, 2018
                                </time>
                              </p>
                              <div className="description">
                                <p>Wow Special!</p>
                              </div>
                            </div>
                          </li>
                      
                          <li className="comment-item">
                            <img
                              className="avtar"
                              src="img/avtar.jpg"
                              alt="avtar"
                            />
                            <div className="comment-text">
                              <div
                                className="star-rating"
                                itemProp="reviewRating"
                                itemScope
                                itemType="http://schema.org/Rating"
                                title="Rated 4 out of 5"
                              >
                                <span style={{ width: "60%" }} />
                              </div>
                              <p className="meta">
                                <em>Your comment is awaiting approval</em>
                              </p>
                              <div className="description">
                                <p>When an unknown printer took a galley!</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*Custom Tab*/}
              {/* <div id="tab_custom" role="tabpanel" className="tab-pane fade">
              
              <div id="accrodianFour" className="product-Content-toggle">
                <Link
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Custom Tab
                </Link>
              </div>

              <div
                id="collapseFour"
                className="product-tab-Content-body collapse"
                aria-labelledby="accrodianFour"
                data-parent="#product-accordian-Content"
              >
                <div className="row">
                  
                  <div className="col-md-5 mb-0 mb-sm-3">
                    <img src="img/blank.png" alt="banner" />
                  </div>
                  
                  <div className="col-md-7 d-flex">
                    <div className="align-self-center">
                      <span className="page-sub-title">New Arrival</span>
                      <h3>Spring Collection 2019</h3>
                      <p className="large">
                        Vibrant color with floral pattern becoming the fashion
                        <br />
                        trending in this summer.
                      </p>
                      <Link
                        to={"/Home"} 
                        className="btn btn--primary btn--sm space-t--1"
                      >
                        More Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
            {/*End Tabs Content*/}
          </div>
        </div>
        {/*End Product Tabs*/}
        {/*Related Product*/}
        <div className="container sec-padding--md">
          <div className="page-head">
            <h2 className="page-title">Related Products</h2>
          </div>
          <Swiper
            className="swiper-theme"
            loop={true}
            slidesPerView={4}
            navigation={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={false}
          >
            {/* Item 1 */}
            {allData.slice(0, 10).map((product) => (
              <SwiperSlide>
                <div className="prodct-item-element col-sm-6 col-md-4 col-lg-12">
                  <div className="product-item">
                    <div className="product-item-img">
                      <Link
                        to={`/product_detail/${product.id}/${product.category}`}
                        className="product-item-img-link"
                      >
                        <img src={product.mainImage} alt="Product Item" />
                      </Link>

                      <div className="add-to-link">
                        {user?.email === admin?.email ? (
                          <button
                            className="btn btn-outline-primary btn--sm button"
                            onClick={handleEditProduct} // admin edit ke liye function
                          >
                            Edit Product
                          </button>
                        ) : user ? (
                          <button
                            onClick={addToCart}
                            className="btn btn-outline-primary btn--sm button"
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-primary btn--sm button"
                            onClick={notLogin}
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>

                      <div className="hover-product-icon">
                        <div className="product-icon-btn-wrap">
                          {product?.stock === true ? (
                            <>
                              <a data-toggle="tooltip" data-placement="left">
                                <span>Out Of Stock</span>
                                {/* <i className="ti-search" /> */}
                              </a>
                            </>
                          ) : (
                            <>
                              {user &&
                              user.email === admin?.email ? null : user ? (
                                <button
                                  onClick={addToCart}
                                  className="btn rounded-circle wishlist-btn"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Add to Wishlist"
                                >
                                  <i className="ti-heart" />
                                </button>
                              ) : (
                                <button
                                  onClick={notLogin}
                                  className="btn rounded-circle wishlist-btn"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Add to Wishlist"
                                >
                                  <i className="ti-heart" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="product-item-content">
                      {/* <div className="tag">
                        <Link to={"/Home"}>Minimal</Link>
                      </div> */}
                      <Link to={"/Home"} className="product-item-title">
                        <span>{product.productName}</span>
                      </Link>
                      <p className="product-item-price">
                        <span className="product-price-amount">
                          <span className="product-price-currency-symbol"></span>
                          &#8377;{product.price}
                        </span>
                      </p>
                      {/* <div className="product-rating">
                        <div
                          className="star-rating"
                          itemProp="reviewRating"
                          itemScope
                          itemType="http://schema.org/Rating"
                          title="Rated 4 out of 5"
                        >
                          <span style={{ width: "60%" }} />
                        </div>
                        <Link to={"/Home"} className="product-rating-count">
                          <span className="count">3</span> Reviews
                        </Link>
                      </div>
                      <p className="product-description">
                        When an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic remaining essentially unchanged.
                      </p> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/*End Related Product*/}
      </section>
    </>
  );
};

export default Section1;
