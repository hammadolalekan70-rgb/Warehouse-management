import React from 'react'
import good1 from '../assets/good_1.png'
import good2 from '../assets/good_2.png'
import good3 from '../assets/good_3.png'

const Ourobject = () => {
  return (
    <section className="project">
      
      <div className="project-header">
        {/* LEFT SIDE */}
        <h2 className="project-title">Our Projects</h2>

        {/* RIGHT SIDE */}
        <ul className="filter">
          <li className="active">All</li>
          <li>Building</li>
          <li>Rebuild</li>
          <li>Architecture</li>
        </ul>
      </div>

      <div className="projects-grid">
        <div className="project-card">
          <img src={good1} alt="Building project" />
        </div>

        <div className="project-card">
          <img src={good2} alt="Rebuild project" />
        </div>

        <div className="project-card">
          <img src={good3} alt="Architecture project" />
        </div>
      </div>

    </section>
  )
}

export default Ourobject
