import applogo from '../assets/applogo.png'
import footer_1 from '../assets/footer_1.png'
import footer_2 from '../assets/footer_2.png'
import footer_3 from '../assets/footer_3.png'
import footer_4 from '../assets/footer_4.png'
import footer_5 from '../assets/footer_5.png'
import footer_6 from '../assets/footer_6.png'
import footer_7 from '../assets/footer_7.png'
import footer_8 from '../assets/footer_8.png'
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="UpperFooter">

        {/* Logo Section */}
        <div className="FooterLogo footerdiv">
          <img src={applogo} alt="App logo" />
          <p>
            So seed seed green that winged cattle in gathered things made fly.
            You’re no divided deep move, gathering land years living on floor.
          </p>
        </div>

        {/* Services*/} 
        <div className="BestServices footerdiv">
          <h3>Best Services</h3>
          <ul>
            <li><a href="/">General Contracting</a></li>
            <li><a href="/">Mechanical Engineering</a></li>
            <li><a href="/">Civil Engineering</a></li>
            <li><a href="/">Bridge Construction</a></li>
            <li><a href="/">Electrical Engineering</a></li>
          </ul>
        </div>

        
        <div className="OurGallery footerdiv">
          <h2>Our Gallery</h2>
          {/* Gallery*/} 
          <img src={footer_1} alt="Construction gallery preview" />
          <img src={footer_2} alt="Construction gallery preview" />
          <img src={footer_3} alt="Construction gallery preview" />
          <img src={footer_4} alt="Construction gallery preview" />
          <img src={footer_5} alt="Construction gallery preview" />
          <img src={footer_6} alt="Construction gallery preview" />
          <img src={footer_7} alt="Construction gallery preview" />
          <img src={footer_8} alt="Construction gallery preview" /> 
        </div> 

        {/* Contact Info */}
        <div className="ContactInfo footerdiv">
          <h4>Contact Info</h4>
          <p>
           4361 Morningview Lane
             <br />     Latimer, IA 50452br <br />
          <br />  Address : Hath of it fly signs bear be one blessed after <br />
           <br /> Phone: +2 36 265 (8060)<br />
            <br />Email: info@colorlib.com<br />
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="LowerFooter">
        <p>
          © 2026 All rights reserved | This template is made with ❤️
        </p>
      </div>
    </footer>
  )
}
