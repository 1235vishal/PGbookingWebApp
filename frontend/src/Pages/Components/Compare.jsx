import React, { useEffect } from 'react';
import './Styles/Compare.css';
import vishalImage from '/assets/vishal.png'; // Adjust the path as needed

const Compare = () => {
  useEffect(() => {
    const img = document.querySelector(".responsive-image");
    
    if (img) {
      // Optional: Add loading attribute for better performance
      if ("loading" in HTMLImageElement.prototype) {
        img.loading = "lazy";
      }

      // Optional: Add error handling
      img.onerror = function () {
        console.error("Error loading the image");
        this.style.display = "none";
      };
    }
  }, []);

  return (
    <div className="image-container">
      <img
        src={vishalImage}
        alt="PG & Hostel Comparison"
        className="responsive-image"
      />
    </div>
  );
};

export default Compare;