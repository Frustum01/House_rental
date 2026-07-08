import React from 'react'
import "../../styles/HomePage/mainhome.css"
import FlipWords from "./FlipWords"
import NavBar from "./NavBar"

const Mainhome = () => {
  return (
    <div>
        <div className="videomain">
            <video autoPlay muted loop playsInline>
                <source src='../../src/assets/video/videohome.mp4'/>
            </video>
        </div>
        <div className="overlaycontent">
           <FlipWords wordA="begins" wordB="where life" intervalMs={3000} />
        </div>
    </div>
  )
}

export default Mainhome