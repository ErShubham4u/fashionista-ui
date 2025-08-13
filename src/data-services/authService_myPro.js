const BASE_URL = "https://fashionista-db-8ynj.onrender.com/myProd";

export const authService_myPro = {
  getMyproduct: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  addProduct: async (data) => {
    const newProduct = { ...data, id: Date.now().toString() };
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return res.json();
  },

 getMyProductById: async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  // console.log("Fetched product from server:", data);
  return data;
}
,
  getMyproductByColor: async (color) => {
    const res = await fetch(`${BASE_URL}?color=${color}`);
    const data = await res.json();
    return data;
  },

  // POST new data
  uploadFashion: async (data) => {
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
