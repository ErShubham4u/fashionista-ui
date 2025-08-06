import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { authService_accessories } from "../../data-services/authService_accessories";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_myPro } from "../../data-services/authService_myPro";
import "./Section4.css";

const Section4 = () => {
  const [sade, setSadeeData] = useState([]);
  const [myProd, setMyProduct] = useState([]);
  const [acce, setAcce] = useState([]);

  useEffect(() => {
    const autoCall = async () => {
      const data1 = await authService_myPro.getMyproduct();
      setMyProduct(data1);
      const data2 = await authService_sadee.getSadee();
      setSadeeData(data2);
      const data3 = await authService_accessories.getAccessories();
      setAcce(data3);
    };
    autoCall();
  },[]);

  const NewArivals = "New Arrivals";
  // console.log(sade);
  return (
    <section className="sec-padding">
  <div className="container">
    <div className="page-head">
      <span className="page-sub-title">Weekly Top</span>
    </div>
  </div>

  <div className="container">
    {myProd?.length > 0 && (
      <>
        <div className="page-head">
          <h2 className="page-title">FashionIsta Design's</h2>
        </div>
        <div className="responsive-grid">
          {[...myProd.slice(0, 8)].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    )}

    {sade?.length > 0 && (
      <>
        <div className="page-head">
          <h2 className="page-title">Saree & Accessories</h2>
        </div>
        <div className="responsive-grid">
          {[...sade.slice(0, 4), ...acce.slice(0, 4)].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    )}
  </div>

  <div className="container text-center mt-4">
    <Link
      to={`/product_listing/${NewArivals}`}
      className="btn btn-outline button"
    >
      View More
    </Link>
  </div>
</section>

  );
};

export default Section4;
