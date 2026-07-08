import { useState, useEffect } from "react";
import "../../styles/HomePage/Flipword.css";

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

  return (
    <div className="flip-stage">
      <div className="flip-drum" style={{ transform: `rotateX(${angle}deg)` }}>
        <div className="flip-face flip-face-front">{wordA}</div>
        <div className="flip-face flip-face-bottom">{wordB}</div>
        <div className="flip-face flip-face-back">{wordA}</div>
        <div className="flip-face flip-face-top">{wordB}</div>
      </div>
    </div>
  );
}