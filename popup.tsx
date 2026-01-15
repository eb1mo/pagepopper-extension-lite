function IndexPopup() {
  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f8f9fa",
        textAlign: "center"
      }}>
      <h1 style={{ marginTop: 0, marginBottom: "10px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
        Page Popper Lite
      </h1>
      <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
        This extension works with the Page Popper website to add confetti celebrations to any webpage.
      </p>
      <div style={{
        padding: "12px",
        backgroundColor: "#e3f2fd",
        borderRadius: "4px",
        marginBottom: "15px"
      }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#1976d2", fontWeight: "500" }}>
          Visit the Page Popper website to configure and launch confetti celebrations!
        </p>
      </div>
      <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>
        The extension will automatically trigger confetti when you launch from the website.
      </p>
    </div>
  )
}

export default IndexPopup
