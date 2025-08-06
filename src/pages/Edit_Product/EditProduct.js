import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_sadee } from "../../data-services/authService_sadee";
import Admin_Header from "../Admin/Admin_Header";
import { authService_myPro } from "../../data-services/authService_myPro";
import { authService_accessories } from "../../data-services/authService_accessories";
import { useAuth } from "../../global/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import PageLoding from "../loding-page/PageLoding";

const EditProduct = () => {
  const { p_id, category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isChecked } = useGlobalContext();

  const [formData, setFormData] = useState({});
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [preview, setPreview] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (!user) navigate("/Home");
  }, [user]);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!p_id || !category) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        let data;

        switch (category) {
          case "Saree":
            data = await authService_sadee.getSadeeById(p_id);
            break;
          case "Acessarise":
            data = await authService_accessories.getAccessariesById(p_id);
            break;
          case "FashionIsta Product's":
            data = await authService_myPro.getMyProductById(p_id);
            break;
          default:
            console.warn("Unknown category");
            return;
        }

        const item = data && Array.isArray(data) ? data[0] : data;
        if (item) {
          console.log("✅ Product loaded:", item);
          setProduct(item);
          setFormData(item);
          setSelectedSizes(item.sizes || []);
          setPreview({
            mainImage: item.mainImage,
            firstImage: item.firstImage,
            secondImage: item.secondImage,
            thirdImage: item.thirdImage,
            fourthImage: item.fourthImage,
          });
        } else {
          console.warn("No product found for ID:", p_id);
        }
      } catch (error) {
        console.error("Error loading product:", error.message);
      }
    };

    fetchProduct();
  }, [p_id, category]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (typeof file === "string") return resolve(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const selectSize = (size) => {
    if (!selectedSizes.includes(size)) {
      const updated = [...selectedSizes, size];
      setSelectedSizes(updated);
      setFormData((prev) => ({ ...prev, sizes: updated }));
    }
  };

  const removeSize = (sizeToRemove) => {
    const updated = selectedSizes.filter((size) => size !== sizeToRemove);
    setSelectedSizes(updated);
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("IN");
    try {
      const updatedData = {
        ...formData,
        sizes: selectedSizes,
        // stock:
        mainImage: await convertToBase64(formData.mainImage),
        firstImage: await convertToBase64(formData.firstImage),
        secondImage: await convertToBase64(formData.secondImage),
        thirdImage: await convertToBase64(formData.thirdImage),
        fourthImage: await convertToBase64(formData.fourthImage),
      };
      // console.log(updatedData);
      let result = null;
      switch (formData.category) {
        case "FashionIsta Product's":
          // console.log("MY");
          result = await authService_myPro.updateProduct(p_id, updatedData);
          break;
        case "Saree":

          result = await authService_sadee.updateProduct(p_id, updatedData);
          break;
        case "Accessories":

          result = await authService_accessories.updateProduct(
            p_id,
            updatedData
          );
          break;
        default:
          alert("Unknown category.");
          return;
      }

      if (result) {
        alert("Product updated successfully!");
        // navigate("/Home");
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Error: " + error.message);
    }
  };

    if (!product) {
      return <PageLoding />;
    }

  return (
    <>
      <Header />

      {isChecked ? <Admin_Header /> : null}

      {/* <div className="page-contaiter"> */}

      {/*Content*/}
      <section className="sec-padding">
        <div className="container">
          <div className="row justify-content-around"></div>
          {/*  */}
          <div className="col-md-12">
            <div className="my-account-box mb-4 rounded-4 shadow">
              <h1>Update Product Details</h1>
              <br></br>
              {/* <div class="row "> */}
              <div className="col-md-12" style={{ border: "0px solid black" }}>
                {/* <h2>Login</h2> */}
                <a>
                  <b>Product Information</b>
                </a>
                <form onSubmit={handleSubmit}>
                  <div className="row mt-2">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="ProductName" className="form-label">
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="productName"
                        value={formData?.productName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-2 mb-3">
                      <label htmlFor="price" className="form-label">
                        Price <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="price"
                        value={formData?.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="qty" className="form-label">
                        QTY <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="qty"
                        value={formData?.qty}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      {/* <div className="container py-4"> */}
                      <label className="form-label fw-bold">
                        Select Sizes:
                      </label>
                      <div className="position-relative" ref={dropdownRef}>
                        <div
                          className="form-control d-flex flex-wrap align-items-center"
                          onClick={toggleDropdown}
                          style={{ cursor: "pointer", minHeight: "40px" }}
                        >
                          {selectedSizes.map((size) => (
                            <span
                              key={size}
                              className="badge bg-info text-dark me-2 mb-1 d-flex align-items-center"
                            >
                              {size}
                              <span
                                className="ms-2 text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSize(size);
                                }}
                              >
                                ×
                              </span>
                            </span>
                          ))}
                        </div>

                        {dropdownOpen && (
                          <div className="border position-absolute w-100 bg-white mt-1 shadow-sm rounded z-3">
                            {sizes.map((size) => (
                              <div
                                key={size}
                                onClick={() => selectSize(size)}
                                className={`px-3 py-2 ${
                                  selectedSizes.includes(size)
                                    ? "bg-light text-primary fw-bold"
                                    : "bg-white"
                                }`}
                                style={{ cursor: "pointer" }}
                              >
                                {size}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {category === "Saree" && (
                      <>
                        <hr className="d-block d-md-none" />

                        {[
                          {
                            label: "PreDrape Price",
                            name: "preDrape",
                            type: "text",
                            value:formData?.preDrape,
                            col: "col-md-4",
                          },
                          {
                            label: "Fall Price",
                            name: "fall",
                            type: "text",
                            value:formData?.fall,
                            col: "col-md-4",
                          },
                          {
                            label: "Blouse Price",
                            name: "blouse",
                            type: "text",
                            value:formData?.blouse,
                            col: "col-md-4",
                          },
                        ].map((input, index) => (
                          <div className={`${input.col} mb-3`} key={index}>
                            <label htmlFor={input.name} className="form-label">
                              {input.label}{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type={input.type}
                              className="form-control form-control-lg shadow"
                              name={input.name}
                              value={input.value}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <hr />

                  {/* Product Discription */}
                  <a>
                    <b>Product Discription</b>
                  </a>

                  <div className="row mt-2 ">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="category"
                        value={formData?.category}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="subcategory" className="form-label">
                        Sub-Category <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="subCategory"
                        value={formData?.subCategory}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="material" className="form-label">
                        Material <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="material"
                        value={formData?.material}
                        placeholder="eg. soft cottan..,"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="color" className="form-label">
                        Color's <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="color"
                        value={formData?.color}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="length" className="form-label">
                        Length <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="length"
                        value={formData?.length}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="width" className="form-label">
                        Width <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="width"
                        value={formData?.width}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="weight"
                        value={formData?.weight}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Print / Work <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="printWork"
                        onChange={handleInputChange}
                        value={formData.printWork || ""} // controlled component
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="print">Print</option>
                        <option value="work">Work</option>
                      </select>
                    </div>

                    <div className="col-md-12 mb-3">
                      <label htmlFor="description" className="form-label">
                        Discription <span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="description"
                        value={formData?.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <hr />

                  {/* Other Information's */}
                  <a>
                    <b>Other Information's</b>
                  </a>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="occasion" className="form-label">
                        Occasion <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="occasion"
                        value={formData?.occasion}
                        onChange={handleInputChange}
                        placeholder="Daily/Office/Festive/Party"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="packContain" className="form-label">
                        Pack Contain's <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="packContain"
                        value={formData?.packContain}
                        onChange={handleInputChange}
                        placeholder="Qty in Pack..?"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="packContain" className="form-label">
                        Washcare <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="washcare"
                        value={formData?.washcare}
                        onChange={handleInputChange}
                        placeholder="eg. Dry Clean..!"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="packContain" className="form-label">
                        Lining composition{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        name="lining_composition"
                        value={formData?.lining_composition}
                        onChange={handleInputChange}
                        placeholder="eg. Polyester..!"
                        required
                      />
                    </div>
                  </div>

                  <hr />
                  {/* Start Image Uploding  */}
                  <a>
                    <b>Upload Image's</b>
                  </a>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="mainImage" className="form-label">
                        Main Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="mainImage"
                        onChange={handleFileChange}
                        className=" form-control"
                        // required
                      ></input>
                      {preview && (
                        <img
                          src={preview.mainImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>

                    <div className="col-md-2 mb-3">
                      <label htmlFor="firstImage" className="form-label">
                        First Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="firstImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className=" form-control"
                      ></input>
                      {preview && (
                        <img
                          src={preview.firstImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="secondImage" className="form-label">
                        Second Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="secondImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.secondImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="thirdImage" className="form-label">
                        Third Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="thirdImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.thirdImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label htmlFor="fourthImage" className="form-label">
                        Fourth Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="fourthImage"
                        onChange={handleFileChange}
                        className=" form-control "
                      ></input>
                      {preview && (
                        <img
                          src={preview.fourthImage}
                          alt="preview"
                          width="200"
                          height="200"
                        />
                      )}
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-lg button"
                      name="login"
                      // onSubmit={handleSubmit}
                      value="Log in"
                    >
                      <b>Upload Data</b>
                    </button>
                  </div>
                </form>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
      {/*End Content*/}
      {/* </div> */}

      <Footer />
    </>
  );
};

export default EditProduct;
