import React, { useEffect } from 'react'
import logo from "../../src/assets/logohome.png"
import profile from "../../src/assets/profile.webp"
import { useState } from 'react'
import SearchOverlay from './SearchOverlay'
import {motion, useMotionValueEvent, useScroll} from "framer-motion"


const NavBar = () => {
  const [onsearch,setonsearch] = useState(false);
  const [showNav,setshowNav] = useState(true);
  const {scrollY} = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (Math.abs(current - previous) < 5) return;

    if (current < 80) {
        setshowNav(true);
        return;
    }

    if (current > previous) {
        setshowNav(false);
    } else {
        setshowNav(true);
    }
  });

  const handleSearch= (e) =>{
    setonsearch(true);
  }


  return (
    <motion.div 
    className='navbar-container'
    initial={{y:"0%"}}
    animate={{y: showNav? "0%":"-100%"}}
    transition={{
        duration: 0.35,
        ease: "easeInOut"
    }}>
        <div className="mainlogo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="center">
            <div className="about">About</div>
            <div className="host">Host</div>
            <div className="explore">Explore</div>
            <div className="search" onClick={handleSearch}>Search</div>
        </div>
        <div className="right"><img src={profile} alt="" /></div>
        {onsearch && (
          <SearchOverlay close={() => setonsearch(false)} onsearch={onsearch} />
          )}

    </motion.div>
  )
}

export default NavBar