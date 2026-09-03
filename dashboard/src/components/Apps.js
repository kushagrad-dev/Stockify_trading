import React from "react";

const Apps = () => {
  return (
    <main
      style={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
      }}
    >
      <div
        role="status"
        style={{
          maxWidth: "720px",
          width: "100%",
          padding: "56px 36px",
          border: "1px solid #f4d78b",
          borderRadius: "16px",
          background: "#fff9e8",
          boxShadow: "0 10px 30px rgba(157, 112, 0, 0.10)",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 12px", color: "#9a6700", fontWeight: 700, letterSpacing: "0.08em" }}>
          COMING SOON
        </p>
        <h1 style={{ margin: "0 0 16px", fontSize: "clamp(28px, 4vw, 42px)", color: "#302100" }}>
          Apps are under development
        </h1>
        <p style={{ margin: 0, color: "#675c42", fontSize: "18px", lineHeight: 1.6 }}>
          We are building new Stockify apps and integrations. Please check back soon.
        </p>
      </div>
    </main>
  );
};

export default Apps;
