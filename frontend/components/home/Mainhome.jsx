import React from 'react'
import Videohome from "./Videohome"
import Citieshead from '../home/cities/Citieshead'
import "../../styles/HomePage/mainhome.css"
import  CitiesView from "../home/cities/Citiesview"
import Offices from './Offices'
import Footer2 from './Footer2'

const Mainhome = () => {
  return (
    <div className='main'>
      <Videohome />
      <Citieshead/>
      <CitiesView/>
      <Offices/>
      <Footer2/>
    </div>
  )
}

export default Mainhome