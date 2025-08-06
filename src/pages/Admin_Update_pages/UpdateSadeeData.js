import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Admin_Header from "./Admin_Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../global/GlobalContext'
import { useAuth } from "../../global/AuthContext";

function UpdateSadeeData() {
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

  //////////// fetch old data ///////////////

  async function fetchData(id) {
    // const response = await fetch(
    //   `http://localhost:8080/admin/getProduct/${id}`,
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "Application/json" },
    //   }
    // );
  }

  ////////////  set form data ///////////////

  const [formData, setFormData] = useState([]);

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

  //////////////// Uploding Data /////////////
 

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("price", formData.price);
    data.append("qty", formData.qty);
    data.append("category", formData.category);
    data.append("subCategory", formData.subCategory);
    data.append("material", formData.material);
    data.append("color", formData.color);
    data.append("length", formData.length);
    data.append("width", formData.width);
    data.append("weight", formData.weight);
    data.append("printWork", formData.printWork);
    data.append("occasion", formData.occasion);
    data.append("packContain", formData.packContain);

    data.append("mainImage", formData.mainImage);
    data.append("firstImage", formData.firstImage);
    data.append("secondImage", formData.secondImage);
    data.append("thirdImage", formData.thirdImage);
    data.append("fourthImage", formData.fourthImage);
    // try {
    const response = await fetch("http://localhost:8080/admin/uploadSadee", {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(formData),
      body: data,
    });
    await response.json();

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

      mainImage: null,
      firstImage: null,
      secondImage: null,
      thirdImage: null,
      fourthImage: null,
    });
    alert("Product Add successful..!");
    navigate("/viewSadee");
    // } catch (error) {
    //   console.error("Error Creating User:", error.message);
    //   alert("Error: " + error.message);
    // }
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
              <h1>Sadee</h1>
              {/* <div class="row "> */}
              <div className="col-md-12" style={{ border: "0px solid black" }}>
                {/* <h2>Login</h2> */}
                <a>
                  <b>Product Information</b>
                </a>
                <form>
                  <div class="row mt-2">
                    <div class="col-md-3 mb-3">
                      <label for="ProductName" class="form-label">
                        Product Name <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="productName"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div class="col-md-3 mb-3">
                      <label for="price" class="form-label">
                        Price <span class="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        name="price"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="qty" class="form-label">
                        QTY <span class="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        name="qty"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* <div class="col-md-3 mb-3">
                        <label for="mainImage" class="form-label">
                          Main Image <span class="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="mainImage"
                          onChange={handleFileChange}
                          className=" form-control "
                          required
                        ></input>
                        {preview && (
                          <img
                            src={preview}
                            alt="preview"
                            width="200"
                            height="200"
                          />
                        )}
                      </div> */}
                  </div>

                  <hr />

                  {/* Product Discription */}
                  <a>
                    <b>Product Discription</b>
                  </a>

                  <div className="row mt-2 ">
                    <div class="col-md-3 mb-3">
                      <label for="category" class="form-label">
                        Category <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="category"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="subcategory" class="form-label">
                        Sub-Category <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="subCategory"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="material" class="form-label">
                        Material <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="material"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="color" class="form-label">
                        Color <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="color"
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div class="col-md-3 mb-3">
                      <label for="length" class="form-label">
                        Length <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="length"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="width" class="form-label">
                        Width <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="width"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="weight" class="form-label">
                        Weight <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="weight"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3 ">
                      printWork{" "}
                      <label for="weight" class="form-label">
                        Print / Work <span class="text-danger">*</span>
                      </label>
                      <select
                        class="form-select"
                        name="printWork"
                        onChange={handleInputChange}
                        required
                      >
                        <option selected>-- Select --</option>
                        <option value="print">Print</option>
                        <option value="work">Work</option>
                      </select>
                    </div>
                  </div>

                  <hr />

                  {/* Other Information's */}
                  <a>
                    <b>Other Information's</b>
                  </a>
                  {/*  */}
                  <div className="row mt-2">
                    <div class="col-md-3 mb-3">
                      <label for="occasion" class="form-label">
                        Occasion <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg "
                        name="occasion"
                        onChange={handleInputChange}
                        placeholder="Daily/Office/Festive/Party"
                        required
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="packContain" class="form-label">
                        Pack Contain's <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-lg "
                        name="packContain"
                        onChange={handleInputChange}
                        placeholder="Qty in Pack..?"
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
                    <div class="col-md-3 mb-3">
                      <label for="mainImage" class="form-label">
                        Main Image <span class="text-danger">*</span>
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

                    <div class="col-md-2 mb-3">
                      <label for="firstImage" class="form-label">
                        First Image <span class="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="firstImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className=" form-control"
                        required
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
                    <div class="col-md-2 mb-3">
                      <label for="secondImage" class="form-label">
                        Second Image <span class="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="secondImage"
                        onChange={handleFileChange}
                        className=" form-control "
                        required
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
                    <div class="col-md-2 mb-3">
                      <label for="thirdImage" class="form-label">
                        Third Image <span class="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="thirdImage"
                        onChange={handleFileChange}
                        className=" form-control "
                        required
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
                    <div class="col-md-2 mb-3">
                      <label for="fourthImage" class="form-label">
                        Fourth Image <span class="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="fourthImage"
                        onChange={handleFileChange}
                        className=" form-control "
                        required
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

                  <div class="mb-3">
                    <button
                      type="submit"
                      class="btn btn-outline-primary btn-lg button"
                      name="login"
                      onClick={handlesubmit}
                      value="Log in"
                    >
                      <b>Update Data</b>
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
}

export default UpdateSadeeData;
