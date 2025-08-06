import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/Product_Listing.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { useParams } from "react-router-dom";

const Productlisting = () => {
  const { id } = useParams();
  const { isChecked } = useGlobalContext();
  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="page-contaiter">
        <Section1 id={id} />
        <Section2 />
      </div>
      <Footer />
    </>
  );
};

export default Productlisting;
