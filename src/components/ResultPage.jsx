import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getFlamesEliminationOrder } from "../logic/flameslogic";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const name1 = searchParams.get("name1") || "";
  const name2 = searchParams.get("name2") || "";

  const { finalResult, eliminationOrder } = getFlamesEliminationOrder(name1, name2);
  const staticFLAMES = ["F", "L", "A", "M", "E", "S"];
  const [currentStep, setCurrentStep] = useState(0);

  // If finalResult is just a single letter, map it to a word
  const letterToWordMap = {
    F: "Friends",
    L: "Love",
    A: "Affection",
    M: "Marriage",
    E: "Enemy",
    S: "Siblings",
  };
  const fullWordResult = letterToWordMap[finalResult]; // e.g., "Affection"

  // Mapping of final word to detailed description
  const descriptions = {
    Friends:
      "Your souls are connected in a way that only true friends understand. No matter the distance or time, your bond is unbreakable!",
    Love:
      "Your hearts are drawn to each other like a force of nature. Love isn’t just in the air—it’s written in the stars for you both.",
    Affection:
      "There’s a warmth between you two that speaks louder than words. A connection so deep, it lingers in every glance, every touch, every moment!",
    Marriage:
      "Fate is weaving your lives together, leading you toward a love story that lasts a lifetime. Marriage isn’t just a possibility—it’s destiny calling!",
    Enemy:
      "Tread carefully—this connection is charged with rivalry and tension. Whether it fuels you or consumes you depends on the choices you make.",
    Siblings:
      "More than just a connection, you share a bond that feels like family. Through ups and downs, fights and laughter, you’ll always have each other’s back!",
  };

  useEffect(() => {
    if (currentStep <= eliminationOrder.length) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, eliminationOrder]);

  return (
    <div style={styles.container}>
      <h1>FLAMES Result</h1>
      <div style={styles.lettersContainer}>
        {staticFLAMES.map((letter) => {
          const eliminationIndex = eliminationOrder.indexOf(letter);
          const isEliminated = eliminationIndex !== -1 && eliminationIndex < currentStep;
          return (
            <span
              key={letter}
              style={{ ...styles.letter, ...(isEliminated ? styles.eliminatedLetter : {}) }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      {currentStep > eliminationOrder.length && (
        <div style={styles.finalResult}>
          <h2>Final Relationship: {finalResult}</h2>
          <p style={styles.descriptionText}>
            {descriptions[fullWordResult] || "No description available for this result."}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  lettersContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "2rem",
    margin: "20px 0",
  },
  letter: {
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    minWidth: "40px",
    transition: "all 0.5s ease",
  },
  eliminatedLetter: { textDecoration: "line-through", opacity: 0.5, color: "red" },
  finalResult: { marginTop: "20px", fontSize: "1.5rem", fontWeight: "bold" },
  descriptionText: { marginTop: "10px", fontSize: "1rem", fontStyle: "italic" },
};

export default ResultPage;
