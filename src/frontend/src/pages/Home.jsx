import React from 'react'
import Banner from '../components/Banner.jsx';
import Engineer from '../components/Engineer.jsx';
import Ourservice from '../components/Ourservice.jsx';
import Experience from '../components/Experience.jsx';
import Ourproject from '../components/Ourproject.jsx';
import Helment from '../components/Helment.jsx';
import Recent from '../components/Recent.jsx';
function Home() {
  return (
    <div> 
      <Banner />
       <Engineer />
       <Ourservice />
       <Experience />
       <Ourproject  />
        <Helment />
        <Recent />

       
    </div>

  )
}

export default Home