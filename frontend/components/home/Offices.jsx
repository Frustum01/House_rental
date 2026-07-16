import "../../styles/HomePage/office.css";
import office1 from "../../src/assets/ofice/office-1.webp";
import office2 from "../../src/assets/ofice/office 2.webp";
import office3 from "../../src/assets/ofice/office 3.webp";
import React from "react";

const Offices = () => {
  return (
    <section className="office-container">
      <div className="headiing">Office </div>

      <div className="officeimages">

        <div className="o1">
          <img src={office1} alt="Jaipur Office" />
          <h2>Jaipur</h2>
        </div>

        <div className="o2">
          <img src={office2} alt="Ahmedabad Office" />
          <h2>Ahmedabad</h2>
        </div>

        <div className="o3">
          <img src={office3} alt="Mumbai" />
          <h2>Mumbai</h2>
        </div>

      </div>
    </section>
  );
};

export default Offices;