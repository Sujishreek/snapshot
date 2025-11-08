import React from "react";

const Upload = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload Image</h2>
      <input type="file" />
      <br />
      <button style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
