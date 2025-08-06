import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_advertisement } from "../../data-services/authService_advertisement";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Admin_Header from "../Admin/Admin_Header";
import { useAuth } from "../../global/AuthContext";

const Upload_Advertise = () => {
  const { user } = useAuth();
  const u_id = user?.id;

  const navigate = useNavigate();
  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  const { isChecked } = useGlobalContext();

  const [oldAdvertise, setOldAdvertise] = useState([]);
  const [preview, setPreview] = useState({});
  const [formData, setFormData] = useState({
    first_add_name: "",
    first_add_discount:"",
    firstImage: null,
    second_add_name: "",
    second_add_discount:"",
    secondImage: null,
    third_add_name: "",
    third_add_discount:"",
    thirdImage: null,
    fourth_add_name: "",
    fourth_add_discount:"",
    fourthImage: null,
  });

  // ✅ Fetch old data
  useEffect(() => {
    async function getOldData() {
      const advertise = await authService_advertisement.getOldAdvertise();
      const old = advertise[0];
      setOldAdvertise(old);

      setFormData({
        first_add_name: old.first_add_name || "",
        first_add_discount:old.first_add_discount || "",
        firstImage: null,
        second_add_name: old.second_add_name || "",
        second_add_discount:old.second_add_discount || "",
        secondImage: null,
        third_add_name: old.third_add_name || "",
        third_add_discount:old.third_add_discount || "",
        thirdImage: null,
        fourth_add_name: old.fourth_add_name || "",
        fourth_add_discount:old.fourth_add_discount || "",
        fourthImage: null,
      });

      setPreview({
        firstImage: old.firstImage || null,
        secondImage: old.secondImage || null,
        thirdImage: old.thirdImage || null,
        fourthImage: old.fourthImage || null,
      });
    }

    getOldData();
  }, [u_id]);

  // ✅ Convert to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // ✅ Auto-update on text input
  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      const updated =
        await authService_advertisement.updateSingleAdvertiseField(
          oldAdvertise.id,
          name,
          value
        );
      console.log("Updated:", updated);
    } catch (error) {
      console.error("Text update failed:", error);
    }
  };

  // ✅ Auto-update on file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    const base64 = await convertToBase64(file);

    setPreview((prev) => ({
      ...prev,
      [name]: base64,
    }));

    try {
      const updated =
        await authService_advertisement.updateSingleAdvertiseField(
          oldAdvertise.id,
          name,
          base64
        );
      console.log("Image updated:", updated);
    } catch (error) {
      console.error("Image update failed:", error);
    }
  };

  return (
    <>
      <Header />

      {isChecked ? <Admin_Header /> : null}

      <section className="sec-padding">
        <div className="container">
          <div className="row justify-content-around"></div>
          <div className="col-md-12">
            <div className="my-account-box mb-4 rounded-4 shadow">
              <h1>Upload Advertisement</h1>
              <br />
              <div className="col-md-12" style={{ border: "0px solid black" }}>
                <a>
                  <b>Advertisement Information</b>
                </a>
                <form>
                  <div className="row mt-2">
                    {/** === TEXT INPUTS === */}
                    {[
                      {
                        label: "Special Product Advertise Name",
                        name: "first_add_name",
                      },
                      {
                        label: "Saree Advertise Name",
                        name: "second_add_name",
                      },
                      {
                        label: "Accessories Advertise Name",
                        name: "third_add_name",
                      },
                      {
                        label: "Fabric Advertise Name",
                        name: "fourth_add_name",
                      },
                    ].map((input, i) => (
                      <div className="col-md-3 mb-3" key={i}>
                        <label htmlFor={input.name} className="form-label">
                          {input.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg shadow"
                          name={input.name}
                          value={formData[input.name]}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <a>
                    <b>Discount Information</b>
                  </a>
                  {/* <hr /> */}
                  <div className="row mt-2">
                    {/** === TEXT INPUTS === */}
                    {[
                      {
                        name: "special_discount",
                        placeholder:"Special Product Discount",
                      },
                      {
                        name: "saree_discount",
                        placeholder:"Saree Discount",
                      },
                      {
                        name: "accessories_discount",
                        placeholder:"Accessories Discount",
                      },
                      {
                        name: "fabric_discount",
                        placeholder:"Fabric Discount",
                      },
                    ].map((input, i) => (
                      <div className="col-md-3 mb-3" key={i}>
                        <input
                          type="text"
                          className="form-control form-control-lg shadow"
                          name={input.name}
                          placeholder={input.placeholder}
                          value={formData[input.name]}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <hr />
                  <a>
                    <b>Upload Image's</b>
                  </a>

                  {/** === FILE INPUTS === */}
                  <div className="row mt-2">
                    {[
                      { label: "Special Product Image", name: "firstImage" },
                      { label: "Saree Image", name: "secondImage" },
                      { label: "Accessories Image", name: "thirdImage" },
                      { label: "Fabric Image", name: "fourthImage" },
                    ].map((file, i) => (
                      <div className="col-md-3 mb-3" key={i}>
                        <label htmlFor={file.name} className="form-label">
                          {file.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name={file.name}
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                        <br />
                        {preview?.[file.name] && (
                          <img
                            src={preview[file.name]}
                            alt="preview"
                            width="300"
                            height="150"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/** Optional submit button if needed */}
                  {/* <div className="mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary btn-lg button"
                name="login"
                // onClick={handlesubmit}
              >
                <b>Upload Data</b>
              </button>
            </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*End Content*/}
      {/* </div> */}

      <Footer />
    </>
  );
};

export default Upload_Advertise;
