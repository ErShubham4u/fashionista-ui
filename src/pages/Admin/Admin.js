import "../css/Admin.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Admin_Header from "./Admin_Header";
import { useState } from "react";

import { useGlobalContext } from '../../global/GlobalContext'
import Upload_products from "../Upload_files/Upload_products";



const Admin = () => {

const { isChecked } = useGlobalContext();
  // form data

 
  return (
    <>
      <Header  />

   {isChecked ? <Admin_Header /> : null}

      {/* <div className="page-contaiter"> */}

      {/*Content*/}
      <section className="sec-padding">
        <div className="container">
          <div className="row justify-content-around">
            <Upload_products />
          </div>
        </div>
      </section>
      {/*End Content*/}
      {/* </div> */}

      <Footer />
    </>
  );
};

export default Admin;
