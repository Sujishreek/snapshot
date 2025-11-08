import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:4000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Select a file!');
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://localhost:4000/upload', formData);
      fetchImages(); // Refresh gallery after upload
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h1>SnapShot Gallery</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {images.map((img) => (
          <img
            key={img.key}
            src={img.url}
            alt=""
            width={200}
            style={{ margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
