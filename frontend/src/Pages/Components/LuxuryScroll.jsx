import React from 'react';
import './Styles/LuxuryScroll.css';

// Import your images (replace with your actual image imports)
import scroll1 from '/assets/scrooll1.png';
import scroll2 from '/assets/scrooll2.png';
import scroll3 from '/assets/scrooll3.png';
import scroll4 from '/assets/scrooll4.png';
import scroll5 from '/assets/scrooll5.png';

const LuxuryScroll = () => {
  return (
    <section className="luxury">
      <div className="container13">
        <h1 className="luxury-title">Choose Your Luxurious Room</h1>
        <p className="luxury-description">
          Discover the comfort and elegance of our luxury rooms designed to
          provide an exceptional experience.
        </p>

        <div className="infinite-scroll-wrapper">
          <div className="scroll-content">
            {/* Room Images */}
            <img src={scroll1} alt="Room 1" />
            <img src={scroll2} alt="Room 2" />
            <img src={scroll3} alt="Room 3" />
            <img src={scroll4} alt="Room 4" />
            <img src={scroll5} alt="Room 5" />
            {/* Duplicate content for seamless loop */}
            <img src={scroll1} alt="Room 1" />
            <img src={scroll2} alt="Room 2" />
            <img src={scroll3} alt="Room 3" />
            <img src={scroll4} alt="Room 4" />
            <img src={scroll5} alt="Room 5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryScroll;