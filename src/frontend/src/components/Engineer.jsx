import React from 'react'
import about2 from '../assets/about2.png';

const Engineer = () => {
  return (
       <div className="about-section">
        <div className="about-image">
          <img src={about2} alt="Engineering work" />
        </div>

        <div className="about-content">
          <h1>
            Engineering Your <br />
            <span>Dreams</span> With Us
          </h1>

          <p>
            Which cattle fruitful he fly visi won't let above lesser stars.
            Fly form wonder every let third form two air seas after us said
            day won light also together midst two female she great to open.
          </p>

          <div className="banner-features">
            <div className="feature">
              <h3>Certified Company</h3>
              <p>
                Be man air male shall under create light together grass fly
                dat also also his brought itself air abundantly
              </p>
            </div>

            <div className="feature">
              <h3>Experienced Employee</h3>
              <p>
                Be man air male shall under create light together grass fly
                do also also his brought itself air abundantly
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Engineer