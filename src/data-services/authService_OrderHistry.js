const BASE_URL = "https://fashionista-db.onrender.com/orders";

export const authService_OrderHistry = {
  insertOrderData: async (OrderData) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(OrderData),
    });
    return await res.json();
  },
  getAllData: async () => {
    const finalRes = await fetch(`${BASE_URL}`);
    return await finalRes.json();
  },
  getDataByU_id: async (id) => {
    const finalRes = await fetch(`${BASE_URL}?u_id=${id}`);
    return await finalRes.json();
  },
  getDataByOrderId: async (id) => {
    const finalRes = await fetch(`${BASE_URL}?order_id=${id}`);
    return await finalRes.json();
  },
  getDataByDate: async (date) => {
    const finalRes = await fetch(`${BASE_URL}?date=${date}`);
    return await finalRes.json();
  },
  getDataByDateAndU_id: async (date, u_id, order_id) => {
    const finalRes = await fetch(
      `${BASE_URL}?date=${date}&u_id=${u_id}&order_id=${order_id}`
    );
    return await finalRes.json();
  },
  deleteDataByOrderId: async (order_id) => {
    // Step 1: Get all orders with matching order_id
    const res = await fetch(`${BASE_URL}?order_id=${order_id}`);
    const data = await res.json();

    // Step 2: Delete each by their real ID
    for (let item of data) {
      await fetch(`${BASE_URL}/${item.id}`, {
        method: "DELETE",
      });
    }

    return { success: true };
  },
  pushTrackStatus: async (order_id, newStatus) => {
    // 1. Get the order by order_id (not id)
    const resGet = await fetch(`${BASE_URL}?order_id=${order_id}`);
    const orderArray = await resGet.json();
    const order = orderArray[0]; // assuming only one result

    // 2. Append the new status
    const updatedTrack = [...(order.track || []), newStatus];

    // 3. Send update using order.id or custom logic
    const resUpdate = await fetch(`${BASE_URL}/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track: updatedTrack }),
    });
  },

  pushTrackStatus: async (order_id, newStatus) => {
    try {
      const resGet = await fetch(`${BASE_URL}/${order_id}`);
      const order = await resGet.json();

      // Avoid duplicates
      const existingTrack = Array.isArray(order.track) ? order.track : [];
      if (existingTrack.includes(newStatus)) {
        return { success: true, message: "Already Updated" };
      }

      const updatedTrack = [...existingTrack, newStatus];

      const resUpdate = await fetch(`${BASE_URL}/${order_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: updatedTrack }),
      });

      if (!resUpdate.ok) {
        return { success: false, message: "Update failed" };
      }

      const data = await resUpdate.json();
      return { success: true, data };
    } catch (error) {
      console.error("❌ Error in pushTrackStatus:", error);
      return { success: false, message: error.message };
    }
  },
};
