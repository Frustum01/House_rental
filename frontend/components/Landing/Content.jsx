import React from 'react'
import "../../styles/LandingPage/Content.css"
import Video from "../../src/assets/video/samplevideo.mp4"
import Emoji from './Emoji'
import { useNavigate } from 'react-router-dom'



const Content = () => {
    const navigate = useNavigate();
  return (
    <div className='content-container'>
        <div className='creator'>
            <p className='createdby'>Created <span> By </span> </p>

            <a href='#' className='linkdin'>Sachin Kushwaha</a>
        </div>
        <div className='quote'>
            <div className='big'>
                <p>EVERY HOME HAS A STORY</p>
            </div>
            <div className='small'>
                <p>Let Rently help you discover yours with verified listings, seamless communication, and a hassle-free rental experience.</p>
                <Emoji/>
                <button className="Login-btn-land" onClick={()=>{navigate("/auth")}}>
                    <span className="btn-text">
                        Lets Start
                    </span>
                </button>
            </div>
        </div>
        <div className="samplerow">
            <div className="marqueec">
                <div className="row1">
                    <div className="ir1"><img src="../../src/assets/sampleimg/s1.jpg" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s2.webp" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s3.webp" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s4.jpg" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s5.jpg" alt="" /></div>
                {/* Duplicate */}
                    <div className="ir1"><img src="../../src/assets/sampleimg/s1.jpg" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s2.webp" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s3.webp" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s4.jpg" alt="" /></div>
                    <div className="ir1"><img src="../../src/assets/sampleimg/s5.jpg" alt="" /></div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="marqueec">
                <div className="row2">

                    <div className="ir2"><img src="../../src/assets/sampleimg/s6.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s7.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s8.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s9.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s10.jpg" alt="" /></div>

                {/* Duplicate */}
                    <div className="ir2"><img src="../../src/assets/sampleimg/s6.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s7.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s8.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s9.jpg" alt="" /></div>
                    <div className="ir2"><img src="../../src/assets/sampleimg/s10.jpg" alt="" /></div>
                </div>
            </div>
        </div>
        <div className="para">
            <p>Every home has a story. Rently helps you discover yours through verified listings, transparent communication, and thoughtfully designed tools that make finding the perfect home effortless. Experience renting the way it should be—simple, secure, and inspiring.</p>
        </div>
        <div className="video">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="demo-video">
                <source src={Video} type="video/mp4" />
            </video>
        </div>
        <div className="footer">
            Contact Us
        </div>
    </div>
  )
}

export default Content