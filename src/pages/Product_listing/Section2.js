import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useParams } from "react-router-dom";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_accessories } from "../../data-services/authService_accessories";
import { authService_myPro } from "../../data-services/authService_myPro";
import { shuffle } from "lodash";
import "./Section.css";

const Section2 = () => {
  const { id } = useParams();
  // console.log(id)

  const [data, setData] = useState([]);

  async function newArrivals() {
    const [myProductData, sareeData, accessoriesData] = await Promise.all([
      authService_sadee.getSadee(),
      authService_accessories.getAccessories(),
      authService_myPro.getMyproduct(),
    ]);

    const slicedSadee = sareeData.slice(0, 16);
    const slicedAccessories = accessoriesData.slice(0, 16);
    const slicedFashionIsta = myProductData.slice(0, 16);

    // Combine all data
    const combinedData = [
      ...slicedSadee,
      ...slicedAccessories,
      ...slicedFashionIsta,
    ];

    const mixedData = shuffle(combinedData);

    setData(mixedData);
  }

  async function sadeData() {
    const Datas = await authService_sadee.getSadee();
    setData(Datas);
    // console.log(Datas);
  }

  async function accessories() {
    const Datas = await authService_accessories.getAccessories();
    setData(Datas);
  }

  async function fashionIsta() {
    const Datas = await authService_myPro.getMyproduct();
    setData(Datas);
  }
  // }, []);
  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });

    switch (id) {
      case "New Arrivals":
        newArrivals();
        break;
      case "FashionIsta Product's":
        fashionIsta();
        break;
      case "Saree":
        sadeData();
        break;
      case "Accessories":
        accessories();
        break;
    }
  }, [id]);

  return (
  <section className="sec-padding--md">
  <div className="container">
    <div className="row">
      <div className="row product-list-item responsive-grid">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
</section>


  );
};

export default Section2;
