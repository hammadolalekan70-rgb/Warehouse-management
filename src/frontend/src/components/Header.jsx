import React from 'react'
import { Link } from 'react-router-dom'
import applogo from '../assets/applogo.png'
import "../App.css"
export const Header = () => {
  return (
    <div className='header'>
      {/* Logo section */}
      <div className='Headerlogo'>
        <img src={applogo} alt="logo" />
      </div>
      {/* Navigation section */}
      <div className='Navigation'>
        <ul> 
          <li><Link to="/">Home</Link></li>
          <li> <Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      {/* Get a Quote section */}
      <div className='GetQuote'>
       <Link to="/quote">Get a Quote</Link>
      </div>
        </div>
  )
}
