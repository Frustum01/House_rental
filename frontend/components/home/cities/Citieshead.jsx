import React from 'react'
import "../../../styles/HomePage/cities.css";
import  CitiesView from "./Citiesview"

const Citieshead = () => {
  return (
    <section className="cities-section">
        <div className="cities-background">CITIES</div>
        <div className="cities-content">
            <p className="explorecities">EXPLORE</p>
            <h2 className="cities-title">Cities We Serve</h2>
            <div className="cities-line"></div>
            <p className="cities-desc">Find premium rental homes in India's most vibrant cities.</p>
        </div>
    </section>
  )
}

export default Citieshead