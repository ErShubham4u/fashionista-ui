const BASE_URL = "https://fashionista-db-8ynj.onrender.com//users";

const type = "Admin";

export const authService_user = {
  getAdminData: async () => {
    try {
      const res = await fetch(`${BASE_URL}?type=${type}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUsers: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUserByemail: async (email) => {
    try {
      const res = await fetch(`${BASE_URL}?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUserById: async (id) => {
    const user = await fetch(`${BASE_URL}?id=${id}`);
    return await user.json();
  },

  login: async (email, password) => {
    // console.log(email)
    const res = await fetch(BASE_URL);
    const users = await res.json();
    return users.find((u) => u.email === email && u.password === password);
  },
  checkEmail: async (email) => {
    // console.log(email)
    const res = await fetch(BASE_URL);
    const users = await res.json();
    return users.find((u) => u.email === email);
  },
  register: async (newUser) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  },

  userUpdate: async (email, updatedUser) => {
    // Step 1: Get user by email
    const res1 = await fetch(`${BASE_URL}?email=${email}`);
    if (!res1.ok) throw new Error("Failed to fetch users");

    const users = await res1.json();
    if (users.length === 0) return null;

    const userId = users[0].id;

    // Step 2: Patch update
    const res2 = await fetch(`${BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (!res2.ok) throw new Error("Update failed");

    // Step 3: Return updated user
    const updated = await res2.json();
    return updated;
  },

  updateSingleUser: async (id, name, value) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [name]: value }),
    });

    if (!res.ok) throw new Error("Failed to update");

    return await res.json();
  },
  updatePassword: async (email, password) => {
  // Step 1: Get user by email
  const getUser = await fetch(`${BASE_URL}?email=${email}`);
  const users = await getUser.json();

  if (users.length === 0) throw new Error("User not found");

  const user = users[0]; // assuming only one user with this email

  // Step 2: Patch the user by ID
  const res = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) throw new Error("Failed to update password");

  return await res.json();
}

};
