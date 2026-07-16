import React from 'react'
import FlipWords from "./FlipWords"
import NavBar from "./NavBar"
import "../../styles/HomePage/mainhome.css"

const Videohome = () => {
  return (
    <div className="videomain">
        <video autoPlay muted loop playsInline>
            <source src='../../src/assets/video/videohome.mp4'/>
        </video>
        <div className="overlaycontent">
            <FlipWords wordA="begins" wordB="where life" intervalMs={3000} />
        </div>
    </div>
  )
}

export default Videohome