const BASE_URL = "https://fashionista-db.onrender.com/cart";

export const authService_cart = {
  insertCartDetails: async (value, u_id) => {
    // Step 1: Check if product already exists in user's cart
    const checkRes = await fetch(`${BASE_URL}?u_id=${u_id}&p_id=${value.p_id}`);
    const checkData = await checkRes.json();

    if (checkData.length > 0) {
      // ✅ Product already in cart, so update quantity

      const existing = checkData[0];
      const updatedQty = existing.quantity + value.quantity;
      //   console.log(existing);

      const updateRes = await fetch(`${BASE_URL}/${existing.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: updatedQty,
        }),
      });

      await updateRes.json();

      const finalRes = await fetch(`${BASE_URL}?u_id=${u_id}`);
      return await finalRes.json();
    }

    // ❌ Product not in cart, insert new

    const insertRes = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    await insertRes.json();

    // Return updated cart list
    const finalRes = await fetch(`${BASE_URL}?u_id=${u_id}`);
    return await finalRes.json();
  },

  getCartDataByU_id: async (u_id) => {
    const finalRes = await fetch(`${BASE_URL}?u_id=${u_id}`);
    return await finalRes.json();
  },
  getCartDataByU_idAndP_id: async (u_id, p_id) => {
    const finalRes = await fetch(`${BASE_URL}?u_id=${u_id}&id=${p_id}`);
    return await finalRes.json();
  },

  deleteCartData: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    return await res.json();
  },
};
