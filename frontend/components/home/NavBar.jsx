import React from 'react'
import logo from "../../src/assets/logohome.png"
import profile from "../../src/assets/profile.webp"

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <div className="mainlogo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="center">
            <div className="about">About</div>
            <div className="host">Host</div>
            <div className="explore">Explore</div>
            <div className="search">Search</div>
        </div>
        <div className="right"><img src={profile} alt="" /></div>

    </div>
  )
}

export default NavBar