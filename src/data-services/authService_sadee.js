const BASE_URL = "https://fashionista-db.onrender.com/sadeeData";

export const authService_sadee = {
  // GET all
  getSadee: async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
  },

  getSadeeById: async (p_id) => {
    const res = await fetch(`${BASE_URL}?id=${p_id}`);
    const data = await res.json();
    return data;
  },

   getSadeeByColor: async (color) => {
    const res = await fetch(`${BASE_URL}?color=${color}`);
    const data = await res.json();
    return data;
  },

  // POST new data
  uploadSadee: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: Date.now() }), // Optional: you can let json-server auto-assign ID
    });

    const result = await res.json();
    return result;
  },

    updateProduct: async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT", // or use PATCH for partial update
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
},

updateStock: async (id, isChecked) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stock: isChecked }), // ✅ Fix here
  });
  return res.json();
},
};
