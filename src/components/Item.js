import React, { Component } from "react";
import { PhotoContext } from "../context/PhotoContext";

class Item extends Component {
  static contextType = PhotoContext;

  render() {
    const { images, uploadImage } = this.context;

    // Optionally filter images by searchTerm (e.g., mountain, beach)
    const filteredImages = images.filter((img) =>
      img.key.toLowerCase().includes(this.props.searchTerm.toLowerCase())
    );

    return (
      <div>
        <h2>{this.props.searchTerm} Gallery</h2>

        {/* Upload Form */}
        <input
          type="file"
          onChange={(e) => uploadImage(e.target.files[0])}
        />

        {/* Display Images */}
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {filteredImages.map((img) => (
            <img
              key={img.key}
              src={img.url}
              alt=""
              width={200}
              style={{ margin: "10px" }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Item;

