import React from 'react'
import "../../styles/LandingPage/Header.css"

const Header = () => {
  return (
    <div className='header'>
      <div className="aboutme">
        About me
      </div>
      <div className="login/register">
        Login/Register
      </div>
      <div className="sample">
        Samples
      </div>
      <div className='contactus'>
        Contact Us
      </div>
    </div>
  )
}

export default Header