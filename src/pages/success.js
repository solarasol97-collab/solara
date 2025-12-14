import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("cartItems");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your order has been placed successfully.</p>

      <button 
        style={{
          padding: "12px 24px",
          borderRadius: "6px",
          background: "black",
          color: "white",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => router.push("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}
