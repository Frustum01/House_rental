import React from 'react'
import {motion} from "framer-motion"
import "../../styles/HomePage/footer.css"
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialYoutube } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className='footer-container'>
        <div className='footer-content'>
            <div className="left-side">
            <div className="icons">
                <FaInstagramSquare />
                <FaLinkedin />
                <BsTwitterX />
                <TiSocialYoutube />
            </div>
            <div className="certified">Created by Sachin</div>
            </div>
            <div className="right-side">
                <div className="addres">
                    <div className="block1">
                        <div className="add1">
                            <p className='city-name'>Jaipur <FaLocationDot /></p>
                            <p>64 Sitabari Kundan Nagar</p>
                            <p>Sanganer Jaipur</p>
                            <p>Rajasthan, 302029</p>
                        </div>
                        <div className="add2">
                            <p className='city-name'> <FaLocationDot /></p>
                            <p>64 Sitabari Kundan Nagar</p>
                            <p>Sanganer Jaipur</p>
                            <p>Rajasthan, 302029</p>
                        </div>
                        </div>
                        <div className="block2">
                        <div className="add3">
                            <p className='city-name'>Ahmedabad <FaLocationDot /></p>
                            <p>64 Sitabari Kundan Nagar</p>
                            <p>Sanganer Jaipur</p>
                            <p>Rajasthan, 302029</p>
                        </div>
                    </div>
                </div>
                <div className="contact">Contact US:- 1234567890 / 0987654321</div>
            </div>  
        </div>
    </section>
  )
}

export default Footer