import React, { useRef } from "react";
import "../../../styles/HomePage/cityview.css";
import jaipur from "../../../src/assets/cities/jaipur.jpg";
import gujarat from "../../../src/assets/cities/gujarat.jpg";
import mumbai from "../../../src/assets/cities/mumbai.webp";
import pune from "../../../src/assets/cities/pune.webp";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const cities = [
  {
    id: 1,
    name: "JAIPUR",
    state: "Rajasthan",
    propertyCount: "2,340+",
    image: jaipur,
    tagline: "Experience Heritage Living",
  },
  {
    id: 2,
    name: "AHMEDABAD",
    state: "Gujarat",
    propertyCount: "4,120+",
    image: gujarat,
    tagline: "Live at the Heart of India",
  },
  {
    id: 3,
    name: "MUMBAI",
    state: "Maharashtra",
    propertyCount: "5,830+",
    image: mumbai,
    tagline: "Luxury Living by the Coast",
  },
  {
    id: 4,
    name: "PUNE",
    state: "Maharastra",
    propertyCount: "3,560+",
    image: pune,
    tagline: "Where Innovation Meets Comfort",
  },
];

const CityCell = ({ city, index, scrollYProgress, radius }) => {
  const start = 0.62 + index * 0.04;
  const end = start + 0.18;
  const nameOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const nameY = useTransform(scrollYProgress, [start, end], [16, 0]);

  return (
    <motion.div className="cities-grid-cell" style={{ borderRadius: radius }}>
      <img src={city.image} alt={city.name} />
      <motion.div
        className="cities-cell-label"
        style={{ opacity: nameOpacity, y: nameY }}
      >
        <span className="cities-cell-name">{city.name}</span>
        <span className="cities-cell-count">{city.propertyCount}</span>
      </motion.div>
    </motion.div>
  );
};

const CitiesView = () => {

  const sectionRef = useRef(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 260,
    damping: 38,
    mass: 0.6,
  });
  const gap = useTransform(scrollYProgress, [0, 0.65], ["18px", "0px"]);
  const radius = useTransform(scrollYProgress, [0, 0.65], ["28px", "0px"]);
  const wrapperScale = useTransform(scrollYProgress, [0, 0.65], [0.62, 1]);
  const wrapperRadius = useTransform(scrollYProgress, [0, 0.65], ["32px", "0px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.8, 1], [24, 0]);

  return (
    <section ref={sectionRef} className="cities-scroll-track">
      <div className="cities-sticky">
        <motion.div
          className="cities-grid"
          style={{
            scale: wrapperScale,
            borderRadius: wrapperRadius,
            gap,
          }}
        >
          {cities.map((city, index) => (
            <CityCell
              key={city.id}
              city={city}
              index={index}
              scrollYProgress={scrollYProgress}
              radius={radius}
            />
          ))}
        </motion.div>

        <motion.div
          className="cities-overlay"
          style={{ opacity: overlayOpacity, y: overlayY }}
        >
          <h2 className="cities-overlay-title">Next Where</h2>
         
        </motion.div>
      </div>
    </section>
  );
};

export default CitiesView;