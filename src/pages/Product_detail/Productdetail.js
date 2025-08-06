import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "./Section1";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { data, Link, useParams } from "react-router-dom";
import { authService_sadee } from "../../data-services/authService_sadee";
import { authService_accessories } from "../../data-services/authService_accessories";
import { authService_myPro } from "../../data-services/authService_myPro";

const Productdetail = () => {
  const { p_id, category } = useParams();
  const [data, setData] = useState(null);
  const { isChecked } = useGlobalContext();

  // alert("hiii")
  // console.log(p_id);
  useEffect(() => {
    async function just() {
      switch (category) {
        case "Saree":
          const data1 = await authService_sadee.getSadeeById(p_id);
          setData(data1[0]);
          break;
        case "Acessarise":
          const data2 = await authService_accessories.getAccessariesById(p_id);
          setData(data2[0]);
          break;
        case "FashionIsta Product's":
          const data3 = await authService_myPro.getMyProductById(p_id);
          setData(data3);
          console.log(data3[0])
          break;
        }
      }
      
      just();
    }, [p_id, category]);
    // console.log(category);

  // console.log(data)

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="page-contaiter">
        <section className="breadcrumb">
          <div
            className="background-image"
            data-background=""
            data-bg-posx="center"
            data-bg-posy="center"
            data-bg-overlay={4}
          />
          <div className="breadcrumb-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="breadcrumb-title">{category}</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <Link to={"/Home"}>Home</Link>
                    </span>
                    {/* <span>
                      <a href="/Home">{category}</a>
                    </span> */}
                    <span>{category} Detail's</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section1 data={data} />
      </div>
      <Footer />
    </>
  );
};

export default Productdetail;
