import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import { authService_user } from "../../data-services/user-services";
import { useGlobalContext } from "../../global/GlobalContext";
import Admin_Header from "./Admin_Header";
import { authService_user } from "../../data-services/authService_user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";

function UserList() {
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
        const data = await authService_user.getUsers();
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
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="my-account-box mb-4 rounded-4 shadow p-3">
                <div className="table-responsive">
                  <h2>User's List</h2>
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email Id</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {Array.isArray(users) && users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserList;
