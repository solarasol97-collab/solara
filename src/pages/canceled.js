import { useRouter } from "next/router";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was not completed.</p>

      <button 
        style={{
          padding: "12px 24px",
          borderRadius: "6px",
          background: "red",
          color: "white",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => router.push("/check-out")}
      >
        Try Again
      </button>
    </div>
  );
}
