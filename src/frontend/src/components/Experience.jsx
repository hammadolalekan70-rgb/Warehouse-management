import React from 'react'
import experiance_img from '../assets/experiance_img.png'

const Experience = () => {
  return (
    <div className="experience-section">
      <section className="experience">
        
        <div className="experience-text">
          <h2>We Are Experienced in Construction</h2>
          <p>
            With over 20 years of experience, we deliver reliable, high-quality
            construction solutions built to last. Our team ensures precision,
            safety, and excellence in every project.
          </p>

          <div className="years">
            <span className="number">20</span>
            <span className="label">Years of Experience</span>
          </div>
        </div>

        <div className="experience-image">
          <img src={experiance_img} alt="Construction work" />
        </div>

      </section>
    </div>
  )
}

export default Experience
