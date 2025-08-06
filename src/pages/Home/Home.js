import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "./Section1";
import Section2 from "./Section2";
// import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from '../../global/GlobalContext'
const Home = () => {
  const { isChecked } = useGlobalContext();

  return (
    <div>
      {/* <div className="promotion-box">
        <div className="container-fluid"> 
          <p className="promotion-text">
            Free Shipping on all orders over $100!
            <a className="link" href="/Home">
              Shop Now
            </a>
          </p>
          <span className="promotion-close">
            <i className="ti-close" />
          </span>
        </div>
      </div> */}

      <Header />
      {isChecked ? <Admin_Header /> : null}

      <div className="page-contaiter">
        <Section1 />
        <Section2 />

        <Section4 />
        <br />
        {/* <Section5 /> */}

        <Footer />
      </div>
    </div>
  );
};

export default Home;
