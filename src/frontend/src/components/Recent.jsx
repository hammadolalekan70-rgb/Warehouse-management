import React from 'react'
import blog1 from '../assets/blog_1.png'
import blog2 from '../assets/blog_2.png'
import blog3 from '../assets/blog_3.png'

const Recent = () => {
  return (
    <section className="blog-section">

      <h3 className="blog-title">Recent News</h3>

      <div className="blog">
        <div className="blog-container">

          <div className="blog-card">
            <img src={blog1} alt="Blog post" />
            <div className="blog-meta">
              <span><i className="fa-regular fa-comment"></i> 2 Comments</span>
              <span><i className="fa-regular fa-heart"></i> 2k Like</span>
            </div>
            <h3>Our Two Firmament Called Us Kind In Face Midst</h3>
            <a href="#">Read More</a>
          </div>

          <div className="blog-card">
            <img src={blog2} alt="Blog post" />
            <div className="blog-meta">
              <span><i className="fa-regular fa-comment"></i> 2 Comments</span>
              <span><i className="fa-regular fa-heart"></i> 2k Like</span>
            </div>
            <h3>Our Two Firmament Called Us Kind In Face Midst</h3>
            <a href="#">Read More</a>
          </div>

          <div className="blog-card">
            <img src={blog3} alt="Blog post" />
            <div className="blog-meta">
              <span><i className="fa-regular fa-comment"></i> 2 Comments</span>
              <span><i className="fa-regular fa-heart"></i> 2k Like</span>
            </div>
            <h3>Our Two Firmament Called Us Kind In Face Midst</h3>
            <a href="#">Read More</a>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Recent
