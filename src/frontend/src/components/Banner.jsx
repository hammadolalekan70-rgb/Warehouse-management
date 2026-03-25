import React from 'react';
import Banner1_img from '../assets/banner1_img.png';
import '../App.css';

const Banner = () => {
  return (
    <>
      {/* ===== FIRST BANNER ===== */}
      <div className="banner">
        <div className="banner-content">
          <h1>
            Committed To <br />
            <span>Superior Quality</span> <br />
            And Results
          </h1>

          <p>
            Moving male there under air air beast lesser creeping saying wherein two void
            can' ness saw set meat our. Whose give day. Morning own fifth from
            Were moved darkness. Female bring abundantly and research
          </p>

          <a href="#" className="btn">
            View Project
          </a>
        </div>

        <div className="banner-image">
          <img src={Banner1_img} alt="Construction project banner" />
        </div>
      </div>  
    </>
  );
};

export default Banner;
