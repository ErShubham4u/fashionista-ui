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

const Upload_products = () => {
  const { p_category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  ///// header data set ///////////////////
  const { isChecked } = useGlobalContext();
  ////////////  set form data ///////////////

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    qty: "",
    category: "",

    subCategory: "",
    material: "",
    color: "",
    length: "",

    width: "",
    weight: "",
    printWork: "",
    occasion: "",

    packContain: "",
    sizes: [],
    description: "",
    washcare: "",

    lining_composition: "",
    stock: "",

    mainImage: null,
    firstImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // images preview

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  ///////////  convert to Base64 //////////////

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //////////////// Uploding Data /////////////

  const handlesubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("productName", formData.productName);
    // data.append("price", formData.price);
    // data.append("qty", formData.qty);
    // data.append("category", formData.category);
    // data.append("subCategory", formData.subCategory);
    // data.append("material", formData.material);
    // data.append("color", formData.color);
    // data.append("length", formData.length);
    // data.append("width", formData.width);
    // data.append("weight", formData.weight);
    // data.append("printWork", formData.printWork);
    // data.append("occasion", formData.occasion);
    // data.append("packContain", formData.packContain);

    // data.append("mainImage", formData.mainImage);
    // data.append("firstImage", formData.firstImage);
    // data.append("secondImage", formData.secondImage);
    // data.append("thirdImage", formData.thirdImage);
    // data.append("fourthImage", formData.fourthImage);
    const mainI = await convertToBase64(formData.mainImage);
    const firstI = await convertToBase64(formData.firstImage);
    const secondI = await convertToBase64(formData.secondImage);
    const thirdI = await convertToBase64(formData.thirdImage);
    const fourthI = await convertToBase64(formData.fourthImage);

    const data = {
      productName: formData.productName,
      price: formData.price,
      qty: formData.qty,
      category: p_category,
      subCategory: formData.subCategory,
      material: formData.material,
      color: formData.color,
      length: formData.length,
      width: formData.width,
      weight: formData.weight,
      printWork: formData.printWork,
      occasion: formData.occasion,
      packContain: formData.packContain,
      sizes: selectedSizes, // ✅ set from tag-based dropdown
      description: formData.description,
      washcare: formData.washcare,
      lining_composition: formData.lining_composition,
      stock: "true",

      mainImage: mainI,
      firstImage: firstI,
      secondImage: secondI,
      thirdImage: thirdI,
      fourthImage: fourthI,
    };

    try {
      // const response = await fetch("http://localhost:3001/sadeeData", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error("Server Error: " + response.status);
      // }

      // await response.json();
      let result = null;

      switch (p_category) {
        case "FashionIsta Product's":
          result = authService_myPro.uploadFashion(data);
          break;
        case "Saree":
          result = authService_sadee.uploadSadee(data);
          break;
        case "Accessories":
          result = authService_accessories.uploadAccessaries(data);
          break;
      }

      // return result;

      setFormData({
        productName: "",
        price: "",
        qty: "",
        category: "",
        subCategory: "",
        material: "",
        color: "",
        length: "",
        width: "",
        weight: "",
        printWork: "",
        occasion: "",
        packContain: "",
        sizes: [],
        description: "",
        washcare: "",
        lining_composition: "",
        stock: "",

        mainImage: null,
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        fourthImage: null,
      });
      if (result) {
        alert("Product Add successful..!");
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error Creating User:", error.message);
      alert("Error: " + error.message);
    }
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

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sizes = ["S", "M", "L", "XL", "XXL"];

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
              <h1>Upload {p_category}</h1>
              <br></br>
              {/* <div class="row "> */}
              <div className="col-md-12" style={{ border: "0px solid black" }}>
                {/* <h2>Login</h2> */}
                <a>
                  <b>Product Information</b>
                </a>
                <form>
                  <div className="row mt-2">
                    {[
                      {
                        label: "Product Name",
                        name: "productName",
                        type: "text",
                        col: "col-md-4",
                      },
                      {
                        label: "Price",
                        name: "price",
                        type: "number",
                        col: "col-md-2",
                      },
                      {
                        label: "QTY",
                        name: "qty",
                        type: "number",
                        col: "col-md-2",
                      },
                    ].map((input, index) => (
                      <div className={`${input.col} mb-3`} key={index}>
                        <label htmlFor={input.name} className="form-label">
                          {input.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type={input.type}
                          className="form-control form-control-lg shadow"
                          name={input.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    ))}

                    <div className="col-md-4 mb-3">
                      {/* <div className="container py-4"> */}
                      <label className="form-label fw-bold">
                        Select Sizes:
                      </label>
                      <div className="position-relative" ref={dropdownRef}>
                        <div
                          className="form-control d-flex flex-wrap align-items-center shadow"
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

                    {p_category === "Saree" && (
                      <>
                        <hr className="d-block d-md-none" />

                        {[
                          {
                            label: "PreDrape Price",
                            name: "preDrape",
                            type: "text",
                            col: "col-md-4",
                          },
                          {
                            label: "Fall Price",
                            name: "fall",
                            type: "text",
                            col: "col-md-4",
                          },
                          {
                            label: "Blouse Price",
                            name: "blouse",
                            type: "text",
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
                    {[
                      {
                        label: "Category",
                        name: "category",
                        type: "text",
                        value: p_category,
                        disabled: true,
                        col: "col-md-3",
                      },
                      {
                        label: "Sub-Category",
                        name: "subCategory",
                        type: "text",
                        col: "col-md-3",
                      },
                      {
                        label: "Material",
                        name: "material",
                        type: "text",
                        placeholder: "eg. soft cotton...",
                        col: "col-md-3",
                      },
                      {
                        label: "Color's",
                        name: "color",
                        type: "text",
                        col: "col-md-3",
                      },
                      {
                        label: "Length",
                        name: "length",
                        type: "text",
                        col: "col-md-3",
                      },
                      {
                        label: "Width",
                        name: "width",
                        type: "text",
                        col: "col-md-3",
                      },
                      {
                        label: "Weight",
                        name: "weight",
                        type: "text",
                        col: "col-md-3",
                      },
                    ].map((field, index) => (
                      <div className={`${field.col} mb-3`} key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.value ?? formData[field.name] ?? ""}
                          placeholder={field.placeholder || ""}
                          onChange={handleInputChange}
                          className="form-control form-control-lg shadow"
                          disabled={field.disabled}
                          required
                        />
                      </div>
                    ))}

                    {/* Select Dropdown for Print / Work */}
                    <div className="col-md-3 mb-3">
                      <label htmlFor="printWork" className="form-label">
                        Print / Work <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select shadow"
                        name="printWork"
                        onChange={handleInputChange}
                        value={formData.printWork || ""}
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="print">Print</option>
                        <option value="work">Work</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="col-md-12 mb-3">
                      <label htmlFor="description" className="form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="description"
                        className="form-control form-control-lg shadow"
                        onChange={handleInputChange}
                        value={formData.description || ""}
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
                    {[
                      {
                        label: "Occasion",
                        name: "occasion",
                        type: "text",
                        placeholder: "Daily/Office/Festive/Party",
                        col: "col-md-3",
                      },
                      {
                        label: "Pack Contain's",
                        name: "packContain",
                        type: "text",
                        placeholder: "Qty in Pack..?",
                        col: "col-md-3",
                      },
                      {
                        label: "Washcare",
                        name: "washcare",
                        type: "text",
                        placeholder: "eg. Dry Clean..!",
                        col: "col-md-3",
                      },
                      {
                        label: "Lining composition",
                        name: "lining_composition",
                        type: "text",
                        placeholder: "eg. Polyester..!",
                        col: "col-md-3",
                      },
                    ].map((field, index) => (
                      <div className={`${field.col} mb-3`} key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] ?? ""}
                          placeholder={field.placeholder || ""}
                          onChange={handleInputChange}
                          className="form-control form-control-lg shadow"
                          required
                        />
                      </div>
                    ))}
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
                        required
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
                      onClick={handlesubmit}
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

export default Upload_products;
