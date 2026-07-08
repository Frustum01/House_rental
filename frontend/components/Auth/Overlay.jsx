import React from 'react'
import { motion } from "framer-motion";
const Overlay = ({ overlayclick, onLogin}) => {

  const heading=`Welcome ${onLogin ? 'Friend' : 'Back'}!`
  const para= onLogin? `Enter your personal details and start journey with us` : `To keep connected with us please login with your personal info` 
  const button=onLogin ? "Sign Up" : "Log in"
  return (
    <motion.div className="overlay-container"
    animate={{x: onLogin ? 0 : -375}}
    transition = {{duration:0.6 ,
      ease: "easeInOut"
    }} >
        <div className="overlay-bg"></div>
        <div className="overlay-content">
            <div className="overlay-innercontent">
                <p>{heading}</p>
                <h3>{para}</h3>
                <button className="overlay-btn" onClick={overlayclick}>{button}</button>
            </div>
        </div>
    </motion.div>
  )
}

export default Overlay