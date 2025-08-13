const BASE_URL = "https://fashionista-db-8ynj.onrender.com/contactUs";

export const authService_constUs = {
  insertContactInfo: async (e) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    return await res.json();
  },
   getData: async () => {
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
}