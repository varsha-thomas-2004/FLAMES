import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getFlamesEliminationOrder } from "../logic/flamesLogic";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const name1 = searchParams.get("name1") || "";
  const name2 = searchParams.get("name2") || "";

  const { finalResult, eliminationOrder } = getFlamesEliminationOrder(name1, name2);
  const staticFLAMES = ["F", "L", "A", "M", "E", "S"];
  const [currentStep, setCurrentStep] = useState(0);

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
            <span key={letter} style={{ ...styles.letter, ...(isEliminated ? styles.eliminatedLetter : {}) }}>
              {letter}
            </span>
          );
        })}
      </div>
      {currentStep > eliminationOrder.length && <div style={styles.finalResult}><h2>Final Relationship: {finalResult}</h2></div>}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  lettersContainer: { display: "flex", justifyContent: "center", gap: "20px", fontSize: "2rem", margin: "20px 0" },
  letter: { padding: "10px", border: "2px solid #ccc", borderRadius: "5px", minWidth: "40px", transition: "all 0.5s ease" },
  eliminatedLetter: { textDecoration: "line-through", opacity: 0.5, color: "red" },
  finalResult: { marginTop: "20px", fontSize: "1.5rem", fontWeight: "bold" },
};

export default ResultPage;
