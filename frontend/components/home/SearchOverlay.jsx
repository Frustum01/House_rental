import React from 'react'
import "../../styles/HomePage/searchbar.css"
import cancle from "../../src/assets/cancel.png"
import {motion} from "framer-motion"

const SearchOverlay = ({close},onsearch) => {
  return (
    <motion.div 
    className='Search'
    initial={{ y: "-100%" }}
    animate={{y : {onsearch} ? "0%": "-100%"} }
    transition={{
        duration:0.5,
        ease:"easeInOut"
    }}>
    
        <div className="searchtext" >
            <input type="text" placeholder='Search'/>
            <div className="popular">popular</div>
        </div>
        <div className="cross" onClick={close}><img src={cancle} alt="" /></div>
    </motion.div>
  )
}
export default SearchOverlay