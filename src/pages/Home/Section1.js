import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import mypro from "../../images/myproduct.jpg";
import sadi from "../../images/sale1.jpg";
import blaus from "../../images/blause.jpg";
import access from "../../images/accessories.jpg";
import { authService_advertisement } from "../../data-services/authService_advertisement";

const Section1 = () => {
  const [oldData, setOldData] = useState({});

  useEffect(() => {
    async function fetchOldData() {
      const advertise = await authService_advertisement.getOldAdvertise();
      setOldData(advertise);

      // console.log("Fetched from DB:", advertise); // ✅ correct
    }
    fetchOldData();
  }, []);

  const MyProduct = "FashionIsta Product's";
  const Sadi = "Saree";
  const Accessories = "Accessories";

  return (
    <section id="intro" className="intro rounded-4">
      {/* Slider Hero */}
      <Swiper
        className="owl-theme"
        modules={[Navigation, Autoplay]}
        loop={true}
        navigation={false}
        autoplay={{ delay: 2000 }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="item position-relative w-100"
            style={{ minHeight: "400px" }}
          >
            <div
              className="position-absolute w-100 h-100 top-0 start-0"
              style={{
                backgroundImage: `url(${oldData[0]?.firstImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
              }}
            />
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                  <div className="text-white py-5 px-3">
                    {oldData[0]?.special_discount && (
                      <p className="mb-2">
                        Up To {oldData[0].special_discount}% Off
                      </p>
                    )}
                    <h1  style={{
                        fontFamily: "Pacifico, cursive",
                        fontSize: "3rem",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0,0,0,1.0)",
                        textAlign: "center",
                      }}
                      className="h3 h1-md">{oldData[0]?.first_add_name}</h1>
                    <Link
                      to={`/product_listing/${MyProduct}`}
                      className="btn btn-light mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="item position-relative w-100"
            style={{ minHeight: "400px" }}
          >
            <div
              className="position-absolute w-100 h-100 top-0 start-0"
              style={{
                backgroundImage: `url(${oldData[0]?.secondImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
              }}
            />
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row justify-content-md-end">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                  <div className="text-white py-5 px-3 text-start text-md-center">
                    {oldData[0]?.saree_discount && (
                      <p className="mb-2">
                        Up To {oldData[0].saree_discount}% Off
                      </p>
                    )}
                    <h1  style={{
                        fontFamily: "Pacifico, cursive",
                        fontSize: "3rem",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0,0,0,1.0)",
                        textAlign: "center",
                      }}
                      className="h3 h1-md">{oldData[0]?.second_add_name}</h1>
                    <Link
                      to={`/product_listing/${Sadi}`}
                      className="btn btn-light mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="item position-relative w-100"
            style={{ minHeight: "400px" }}
          >
            <div
              className="position-absolute w-100 h-100 top-0 start-0"
              style={{
                backgroundImage: `url(${oldData[0]?.thirdImage})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
                zIndex: 1,
              }}
            />
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                  <div className="text-white py-5 px-3">
                    {oldData[0]?.accessories_discount && (
                      <p className="mb-2">
                        Up To {oldData[0].accessories_discount}% Off
                      </p>
                    )}

                    <h1  style={{
                        fontFamily: "Pacifico, cursive",
                        fontSize: "3rem",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0,0,0,1.0)",
                        textAlign: "center",
                      }}
                      className="h3 h1-md">
                      {oldData[0]?.third_add_name}
                      <br />
                      Collection
                    </h1>
                    <Link
                      to={`/product_listing/${Accessories}`}
                      className="btn btn-light mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="item position-relative w-100"
            style={{ minHeight: "400px" }}
          >
            <div
              className="position-absolute w-100 h-100 top-0 start-0"
              style={{
                backgroundImage: `url(${oldData[0]?.fourthImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
                backgroundBlendMode: "overlay",
                zIndex: 1,
              }}
            />
            <div className="container position-relative justify-content-center align-items-center"  style={{ zIndex: 3, minHeight: "300px" }} >
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                  <div className="text-white py-5 px-3">
                    {oldData[0]?.fabric_discount && (
                      <p className="mb-2" >
                        Up To {oldData[0].fabric_discount}% Off
                      </p>
                    )}
                    <h1
                      style={{
                        fontFamily: "Pacifico, cursive",
                        fontSize: "5rem",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0,0,0,1.0)",
                        textAlign: "center",
                      }}
                      className="h3 h1-md"
                    >
                      {oldData[0]?.fourth_add_name}
                    </h1>

                    {/* <br /> */}
                    <Link
                      to={`/product_listing/${Accessories}`}
                      className="btn btn-light mt-2"
                    >
                      Get Offers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* End Slider Hero */}
    </section>
  );
};

export default Section1;
