const BASE_URL = "https://fashionista-db.onrender.com/advertisement";

export const authService_advertisement = {
  updateSingleAdvertiseField: async (id, fieldName, value) => {
    const updateData = { [fieldName]: value };

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    return res.json(); // Updated data from db.json
  },

  getOldAdvertise: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch Advertise...!");

      const advertise = await res.json();
      // console.log(users, "Fetched users");
      return advertise;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
};
