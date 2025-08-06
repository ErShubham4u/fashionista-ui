import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useAuth } from "../../global/AuthContext";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import "./Successfully.css";
import { useEffect } from "react";

const Successfully = () => {
  const { user } = useAuth();
  const u_id = user?.id;
  const email = user?.email;

  const navigate = useNavigate();

  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

  const { isChecked } = useGlobalContext();

  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="message-box _success">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              <h2>✅ Your Order was Successfull..!</h2>
              <p>
                Thank you for shopping with us. 🛒 <br />
                We’ll get in touch soon with delivery updates!
              </p>
            </div>
          </div>
        </div>
        <hr />

        {/* <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="message-box _success _failed">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
              <h2> Your payment failed </h2>
              <p> Try again later </p>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
};
export default Successfully;
