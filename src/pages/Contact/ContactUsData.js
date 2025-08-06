import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import { useGlobalContext } from "../../global/GlobalContext";
import { authService_constUs } from "../../data-services/authService_constUs";
import Admin_Header from "../Admin/Admin_Header";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ContactUsData() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  // ✅ Protect route: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user]);

   useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await authService_constUs.getData();
          setUsers(data);
          // console.log(data);
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        }
      };
  
      fetchUsers();
    }, []);

  const { isChecked } = useGlobalContext();
  return (
    <>
      <Header />
      {isChecked ? <Admin_Header /> : null}

      <section className="sec-padding">
        <div className="container">
          <div className="row justify-content-around"></div>
          {/*  */}
          <div className="col-md-12">
            <div className="my-account-box mb-4 rounded-4 shadow">
              <h2>Contact Us Data..!</h2>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Comments</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider">
                  {Array.isArray(users) && users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.subject}</td>
                        <td>{user.comment}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Data Found...!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ContactUsData;
