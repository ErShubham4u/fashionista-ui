import React, { useState } from "react";
import "./CSS/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [activemenu, setactivemenu] = useState("");
  const [mobileordesktop, setmobileordesktop] = useState(false);

  return (
    <header
      id="header"
      className="header fixed-header "
      data-header-hover="true"
      //  style={{border:"5px solid red",wi}}
      style={{ border: "0px solid red" }}
    >
      {/*Header Navigation*/}
      <nav
        id="navigation"
        className="header-nav "
        style={{ border: "1px solid red" }}
      >
        <div className="container" style={{ border: "2px solid black" }}>
          <div className="row " style={{ border: "2px solid red" }}>
            {/*Logo*/}
            {/* <div
              className="site-logo"
              style={{ border: "0px solid red", height: "10px" }}
            >
              <Link
                to={"/Home"}
                style={{ border: "0px solid black", height: "60px" }}
              >
                <img
                  src="img/logo/fashionIsta.png"
                  className="logo-dark"
                  alt="FashionIsta"
                />
                <img
                  src="img/logo/fashionIsta.png"
                  className="logo-light"
                  alt="FashionIsta"
                />
              </Link>
            </div> */}
            {/*End Logo*/}

            {/*Navigation Menu*/}
            <div
              className={
                mobileordesktop === true
                  ? "nav-menu show-on-mobile"
                  : "nav-menu"
              }
            >
              <ul>
                <li className="nav-menu-item">
                  <a
                    href="/Home"
                    class=" "
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      color: "black",
                    }}
                  >
                    Home
                  </a>
                </li>

                {/* <li className="nav-menu-item">
                  <a
                    href="/product_listing"
                    class=" "
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      color: "black",
                    }}
                  >
                    New&nbsp;Arrivals
                  </a>
                </li> */}

                {/* <li className="nav-menu-item">
                  <a
                    href="/product_detail"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Saree");
                    }}
                    class=" "
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      color: "black",
                    }}
                  >
                    Saree
                  </a>
            

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Saree");
                    }}
                    style={{
                      display: activemenu === "Saree" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Trending Now</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Basics</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Tie & Dye</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Sequence</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Hand Painted</Link>
                          </li>
                      
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">LifeStyle</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Work</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Party</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Festive</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Weekend</Link>
                          </li>
                      
                        </ul>
                      </div>
                    </div>
                  </div>
             
                </li>

                <li className="nav-menu-item">
                  <a
                    href="/product_detail"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Fabric");
                    }}
                    class=" "
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      color: "black",
                    }}
                  >
                    Fabric
                  </a>
            

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Fabric");
                    }}
                    style={{
                      display: activemenu === "Fabric" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Natural</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Cotton</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Linen </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Silk </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Wool</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Hemp </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Synthetic</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Polyester </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Nylon </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Rayon/Viscose</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Spandex/Lycra</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Acrylic </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul>
                          <li>
                            <span className="dropdown-title">Woven </span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Plain </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Twill </Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Satin </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
          
                </li>

                <li className="nav-menu-item ">
                  <a
                    href="/product_detail"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Accessories");
                    }}
                    class=" "
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      color: "black",
                    }}
                  >
                    Accessories
                  </a>
          

                  <div
                    className="nav-dropdown col2-dropdown"
                    onMouseLeave={() => {
                      setactivemenu("");
                    }}
                    onMouseEnter={() => {
                      setactivemenu("Accessories");
                    }}
                    style={{
                      display: activemenu === "Accessories" ? "block" : "none",
                      opacity: 1,
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Chothes</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In clothing</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Footwear</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Bags</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>New In Watches</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Shirt</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>
                            <span className="dropdown-title">Watches</span>
                          </li>
                          <li>
                            <Link to={"/Home"}>Analog</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Chronograph</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Digital</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Watch Cases</Link>
                          </li>
                          <li>
                            <Link to={"/Home"}>Shoes</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                 
                </li> */}
              </ul>
            </div> 
            {/*End Navigation Menu*/}

            {/*Nav Icons*/}
            {/* <div className="nav-icons">
              <ul>
                <li className="nav-icon-item d-lg-none">
                  <div
                    className={
                      mobileordesktop === true
                        ? "nav-icon-trigger menu-mobile-btn active"
                        : "nav-icon-trigger menu-mobile-btn"
                    }
                    onClick={() => {
                      setmobileordesktop(!mobileordesktop);
                    }}
                    title="Navigation Menu"
                  >
                    <span>
                      <i className="ti-menu" />
                    </span>
                  </div>
                </li>

                <li className="nav-icon-item">
                  <div
                    className="nav-icon-trigger search-menu-btn"
                    title="Search"
                    style={{ padding: "8px 16px" }}
                  >
                    <form className="d-flex align-items-center" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search For Product"
                        aria-label="Search"
                        style={{ width: "200px", borderRadius: "20px" }} // You can adjust this
                      />

                      /////////// old button ///////
                       <button
                        className="btn d-flex align-items-center justify-content-center"
                        title="Search"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          color: "white",
                          backgroundColor: "#27AF9A",
                          border: "none",
                          padding: 0,
                        }}
                        type="submit"
                      > 
                      <i className="ti-search" style={{marginLeft:"5px", color:"black",}} /> 
                      </button> 
                      //////// end //////////
                    </form>
                  </div>
                </li>

                <li className="nav-icon-item d-lg-table-cell">
                  <Link
                    className="nav-icon-trigger "
                    to={"/cart"}
                    title="Whishlist"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="">
                      <i className="ti-heart" />
                      <span
                        className="nav-icon-count num-bg"
                        style={{ background: "#D5006C" }}
                      >
                        2
                      </span>
                    </span>
                  </Link>
                </li>

                <li className="nav-icon-item">
                  <div
                    className=" nav-icon-trigger cart-sidebar-btn shado"
                    title="Shopping Cart"
                  >
                    <span className="">
                      <i className="ti-bag " />
                      <span
                        className="nav-icon-count"
                        style={{ background: "#D5006C" }}
                      >
                        3
                      </span>
                    </span>
                  </div>
                </li>
                <li className="nav-icon-item hover-dropdown">
                  <div
                    className="nav-icon-trigger dropdown--trigger shado"
                    title="User Account"
                  >
                    <Link to={"/UserProfile"}>
                      <span className="">
                        <i className="ti-user" />
                      </span>
                    </Link>
                  </div>

                  <div className="dropdown--menu dropdown--right">
                    <ul>
                      <li>
                        <Link to={"/Home"}>My Account</Link>
                      </li>

                      <li>
                        <Link to={"/Home"}>Wishlist</Link>
                      </li>
                      <li>
                        <Link to={"/cart"}>Cart</Link>
                      </li>
                      <li>
                        <Link to={"/Home"}>Lost Password</Link>
                      </li>
                      <li>
                        <Link to={"/UserLogin"}>Login Account</Link>
                      </li>
                      <li>
                        <hr />
                      </li>
                      <li>
                        <Link
                          to={"/cart"}
                          className="btn btn-outline-primary btn--sm btn--full button"
                        >
                          <i className="fa fa-shopping-cart" /> Purchase Now
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div> 
            {/*End Nav Icons*/}
            {/*Search Bar*/}
            {/* <div className="searchbar-menu">
              <div className="searchbar-menu-inner">
               
                <div className="search-form-wrap">
                  <form>
                    <button className="search-icon btn--lg">
                      <i className="ti-search" />
                    </button>
                    <input
                      className="search-field input--lg"
                      placeholder="Search here..."
                      defaultValue
                      name="search"
                      title="Search..."
                      type="search"
                      autoComplete="off"
                    />
                    <span className="search-close-icon">
                      <i className="ti-close" />
                    </span>
                  </form>
                </div>
              
                <div className="search-results-wrap">
                  <div className="search-results-loading">
                    <span className="fa fa-spinner fa-spin" />
                  </div>
                  <div className="search-results-text woocommerce">
                    <ul>
                      <li>Nothing found</li>
                    </ul>
                  </div>
                </div>
   
              </div>
            </div> */}
            {/*End Search Bar*/}
          </div>
        </div>
      </nav>
      {/*End Header Navigation*/}
    </header>
  );
};

export default Header;
