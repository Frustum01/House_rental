import React from 'react'
import "../styles/HomePage/mainhome.css"
import Mainhome from "../components/home/Mainhome"
import NavBar from "../components/home/NavBar"

const HomePage = () => {
  return (
    <div>
        <NavBar />
        <Mainhome />
    </div>
  )
}

export default HomePage