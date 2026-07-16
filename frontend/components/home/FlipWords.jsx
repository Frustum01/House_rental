import { useState, useEffect } from "react";
import "../../styles/HomePage/Flipword.css";
import {motion } from "framer-motion"
import { useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useTransform } from "framer-motion";

function useContinuousRotation(intervalMs = 3000) {
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTurns((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return turns;
}

export default function FlipWords({ wordA = "imagine", wordB = "make", intervalMs = 3000 }) {
  const turns = useContinuousRotation(intervalMs);
  const angle = -90 * turns;
  const {scrollYProgress} = useScroll();
  const scale = useTransform(scrollYProgress,[0,0.2],[1,0.1 ]);
  const move = useTransform(scrollYProgress,[0,0.154],[0,400])
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
});
  return (
    <motion.div 
    className="flip-stage" 
    style={{scale,y:move}}
    // animate={{y:move}}
    >
      <div className="flip-drum" style={{ transform: `rotateX(${angle}deg)` }}>
        <div className="flip-face flip-face-front">{wordA}</div>
        <div className="flip-face flip-face-bottom">{wordB}</div>
        <div className="flip-face flip-face-back">{wordA}</div>
        <div className="flip-face flip-face-top">{wordB}</div>
      </div>
    </motion.div>
  );
}