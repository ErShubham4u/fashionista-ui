// /src/pages/VerifyUser.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch("http://localhost:5000/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email }),
        });

        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email verified successfully! You can now log in.");
        } else {
          setMessage("❌ Verification failed. Invalid or expired token.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("❌ Something went wrong while verifying.");
      }
    };

    verifyEmail();
  }, [token, email]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyUser;
