import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { authService_myPro } from "../../data-services/authService_myPro";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_accessories } from "../../data-services/authService_accessories";

const Section2 = () => {
  const [sade, setSadeeData] = useState([]);
  const [myProd, setMyProduct] = useState([]);
  const [acce, setAcce] = useState([]);

  useEffect(() => {
    const autoCall = async () => {
      const data1 = await authService_myPro.getMyproduct();
      // console.log(data1);
      setMyProduct(data1);
      const data2 = await authService_sadee.getSadee();
      setSadeeData(data2);
      const data3 = await authService_accessories.getAccessories();
      setAcce(data3);
    };
    autoCall();
  }, []);

  return (
    <section className="sec-padding-t">
      <div className="container">
        <div className="page-head">
          <span className="page-sub-title">See Our Collection</span>
          <h2 className="page-title">Special Categories</h2>
        </div>
      </div>
      <div className="container">
        <div className="row nf-grid">
          {/*Grid*/}
          <div className="col-lg-8 col-md-12 col-sm-12 nf-grid-item ">
            <div className="categories-item categories-item_1 position-relative overflow-hidden rounded-3">
              {/* Image Wrapper */}
              <div className="categories-image d-flex position-relative rounded-3">
                {/* Left Image */}
                <Link
                  to={`/product_detail/${myProd[0]?.id}/${myProd[0]?.category}`}
                  className="categories-img-link w-50"
                >
                  <img
                    src={myProd[0]?.mainImage}
                    alt="Saree"
                    className="img-fluid"
                  />
                </Link>

                {/* Right Image */}
                <Link
                  to={`/product_detail/${myProd[0]?.id}/${myProd[0]?.category}`}
                  className="categories-img-link w-50"
                >
                  <img
                    src={myProd[0]?.secondImage}
                    alt="Saree"
                    className="img-fluid"
                  />
                </Link>

                {/* Blur Overlay in Center */}
                <div className="center-blur"></div>
              </div>

              {/* Caption Overlay */}
              <div className="categories-content-overlay rounded-3">
                <Link
                  className="categories-caption categories-caption-bottom"
                  to={`/product_detail/${myProd[0]?.id}/${myProd[0]?.category}`}
                >
                  Special
                </Link>
              </div>
            </div>
          </div>

          {/*Grid*/}
          <div className="col-lg-4 col-md-6 col-sm-12 nf-grid-item rounded-3">
            {/*Categories Item*/}
            <div className="categories-item categories-item_1 rounded-3">
              <div className="categories-image">
                <Link
                  to={`/product_detail/${acce[0]?.id}/${acce[0]?.category}`}
                  className="categories-img-link"
                >
                  <img src={acce[0]?.secondImage} alt=" Accesories" />
                </Link>
              </div>
              <div className="categories-content-overlay">
                <Link
                  className="categories-caption categories-caption-bottom"
                  to={`/product_detail/${acce[0]?.id}/${acce[0]?.category}`}
                >
                  Accesories
                </Link>
              </div>
            </div>
          </div>
          
          {/*Grid*/}
          <div className="col-lg-4 col-md-6 col-sm-12 nf-grid-item rounded-3">
            {/*Categories Item*/}
            <div className="categories-item categories-item_1 rounded-3">
              <div className="categories-image">
                <Link
                  to={`/product_detail/${acce[0]?.id}/${acce[0]?.category}`}
                  className="categories-img-link"
                >
                  <img src={acce[0]?.firstImage} alt=" Accesories" />
                </Link>
              </div>
              <div className="categories-content-overlay">
                <Link
                  className="categories-caption categories-caption-bottom"
                  to={`/product_detail/${acce[0]?.id}/${acce[0]?.category}`}
                >
                  Accesories
                </Link>
              </div>
            </div>
          </div>

          {/*Grid*/}
          <div className="col-lg-8 col-md-12 col-sm-12 nf-grid-item rounded-3">
            {/*Categories Item*/}
            <div className="categories-item categories-item_1 position-relative overflow-hidden rounded-3">
              {/* Image Wrapper */}
              <div className="categories-image d-flex position-relative">
                {/* Left Image */}
                <Link
                  to={`/product_detail/${sade[0]?.id}/${sade[0]?.category}`}
                  className="categories-img-link w-50"
                >
                  <img
                    src={sade[0]?.mainImage}
                    alt="Saree"
                    className="img-fluid"
                  />
                </Link>

                {/* Right Image */}
                <Link
                  to={`/product_detail/${sade[0]?.id}/${sade[0]?.category}`}
                  className="categories-img-link w-50"
                >
                  <img
                    src={sade[0]?.secondImage}
                    alt="Saree"
                    className="img-fluid"
                  />
                </Link>

                {/* Blur Overlay in Center */}
                <div className="center-blur"></div>
              </div>

              {/* Caption Overlay */}
              <div className="categories-content-overlay">
                <Link
                  className="categories-caption categories-caption-bottom"
                  to={`/product_detail/${sade[0]?.id}/${sade[0]?.category}`}
                >
                  Saree
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
