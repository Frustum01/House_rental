import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoGoogleplus } from "react-icons/io";
const social = () => {
  return (
    <div className="social-Login">
        <div><IoLogoGoogleplus /></div>
        <div><FaSquareXTwitter /></div>
        <div><IoLogoFacebook /></div>
    </div>
  )
}

export default social