import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Productlisting from "./pages/Product_listing/Productlisting";
import Productdetail from "./pages/Product_detail/Productdetail";
import Checkout from "./pages/Checkout/Checkout";
import UserLogReg from "./pages/Login_register/UserLogReg";
import Admin from "./pages/Admin/Admin";
import UserLogin from "./pages/Login_register/UserLogin";
import UserDataActions from "./pages/Login_register/UserDataActions ";
import Admin_Header from "./pages/Admin/Admin_Header";
import AdminInfo from "./pages/Admin/AdminInfo";
import UserProfile from "./pages/users/UserProfile";
import UserList from "./pages/Admin/UserList";
import ShippingPolicy from "./pages/Shipping-Policy/ShippingPolicy";
import PrivacyPolicy from "./pages/Privacy-Policy/PrivacyPolicy";
import TermsCondition from "./pages/Terms-Condition/TermsCondition";
import Upload_products from "./pages/Upload_files/Upload_products";
import Upload_Advertise from "./pages/Upload_files/Upload_Advertise";
import EditProduct from "./pages/Edit_Product/EditProduct";
import ContactUsData from "./pages/Contact/ContactUsData";
import Successfully from "./pages/Checkout/Successfully";
import Order_list from "./pages/Order_list/Order_list";
import All_Product from "./pages/Order_list/All_Product";
import Admin_Order_List from "./pages/Order_admin/Admin_Order_List"
import PasswordUsingEmail from "./pages/reset/PasswordUsingEmail";
import VerifyUser from "./pages/VerifyUser";
import Show_Product from "./pages/Order_admin/Show_Product";


function App() {
  return (
    <Routes>
        <Route path="/verify" element={<VerifyUser />} />
      {/* Admin Files */}
      <Route path="/admin_header" element={<Admin_Header />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/admin_info" element={<AdminInfo />} />
      {/*  */}

      {/* Upload Poducts */}
      <Route path="/uploadProducts/:p_category" element={<Upload_products />} />
      <Route path="/uplodeAdvertise" element={<Upload_Advertise />} />
      {/*  */}

      {/* Show User's List */}
      <Route path="/userList" element={<UserList />} />
      {/*  */}

      {/* All login & Register Pages */}
      <Route path="/login_register" element={<UserLogReg />} />
      <Route path="/UserLogin" element={<UserLogin />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/Reset" element={<PasswordUsingEmail />} />
      {/*  */}

      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/orderList" element={<Order_list />} /> */}
      {/*  */}
      <Route path="orderList" element={<Order_list />} />
      <Route path="/all_products/:date" element={<All_Product />} />
      <Route path="/admin_order_list" element={<Admin_Order_List />} />
      <Route path="/show_products/:user_id/:date/:order_id" element={<Show_Product />} />
      {/*  */}

      <Route path="/product_listing/:id" element={<Productlisting />} />
      <Route
        path="/product_detail/:p_id/:category"
        element={<Productdetail />}
      />
      <Route path="/edit_product/:p_id/:category" element={<EditProduct />} />
      {/*  */}
      {/* <Route path="/sadi" element={<SareeListing />} /> */}
      {/*  */}

      {/*  */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/contactUsData" element={<ContactUsData />} />
      {/*  */}

      <Route path="/about" element={<About />} />
      <Route path="/shipping_policy" element={<ShippingPolicy />} />
      <Route path="/privacy_policy" element={<PrivacyPolicy />} />
      <Route path="/terms_condition" element={<TermsCondition />} />

      <Route path="/user_data" element={<UserDataActions />} />

      {/*  */}
      <Route path="/checkout" element={<Checkout />} /> 
      <Route path="/checkout/:p_id" element={<Checkout />} />
      {/* <Route path="/getWay" element={<PayGetWay />} /> */}
      <Route path="/successfully" element={<Successfully />} />
      {/*  */}

      {/*  */}
      
      {/*  */}
    </Routes>
  );
}

export default App;
