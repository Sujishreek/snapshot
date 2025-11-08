import React, { createContext, Component } from "react";
import axios from "axios";

export const PhotoContext = createContext();

class PhotoContextProvider extends Component {
  state = {
    images: [], // images from S3
  };

  componentDidMount() {
    this.fetchImages();
  }

  // Fetch images from backend
  fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/images");
      this.setState({ images: res.data });
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // Upload a new image to backend
  uploadImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.post("http://localhost:4000/upload", formData);
      this.fetchImages(); // refresh gallery after upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  render() {
    return (
      <PhotoContext.Provider
        value={{
          images: this.state.images,
          fetchImages: this.fetchImages,
          uploadImage: this.uploadImage,
        }}
      >
        {this.props.children}
      </PhotoContext.Provider>
    );
  }
}

export default PhotoContextProvider;
