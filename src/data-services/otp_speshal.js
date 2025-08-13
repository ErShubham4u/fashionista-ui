const BASE_URL = "https://fashionista-api-vt0r.onrender.com/";

export const authService_user = {
  sendOtpToEmail: async (email) => {
    const res = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await res.json();
  },
  verify_OTP: async (email, otp) => {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    return await res.json();
  },

  reset_Password: async (email, otp) => {
    const res = await fetch(`${BASE_URL}/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    return await res.json();
  },
};
