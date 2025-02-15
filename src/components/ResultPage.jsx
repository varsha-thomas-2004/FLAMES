import React, { useState, useEffect } from 'react';
import { getFlamesEliminationOrder } from '../logic/flamesLogic';

const ResultPage = ({ name1, name2 }) => {
  // Get the final result and elimination order from the logic.
  const { finalResult, eliminationOrder } = getFlamesEliminationOrder(name1, name2);
  
  // The static FLAMES letters.
  const staticFLAMES = ["F", "L", "A", "M", "E", "S"];
  
  // State to control the animation step.
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Animate until we've processed all elimination steps.
    if (currentStep <= eliminationOrder.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000); // Change step every 1 second.
      return () => clearTimeout(timer);
    }
  }, [currentStep, eliminationOrder]);

  return (
    <div style={styles.container}>
      <h1>FLAMES Result</h1>
      
      {/* Display the FLAMES letters with eliminated ones struck through */}
      <div style={styles.lettersContainer}>
        {staticFLAMES.map(letter => {
          // Determine the elimination index for this letter in the elimination order.
          // If the letter appears in the eliminationOrder and its elimination index is less than the currentStep, it is struck off.
          const eliminationIndex = eliminationOrder.indexOf(letter);
          const isEliminated = eliminationIndex !== -1 && eliminationIndex < currentStep;
          
          return (
            <span 
              key={letter} 
              style={{ 
                ...styles.letter, 
                ...(isEliminated ? styles.eliminatedLetter : {}) 
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Once all eliminations are animated, display the final relationship result */}
      {currentStep > eliminationOrder.length && (
        <div style={styles.finalResult}>
          <h2>Final Relationship: {finalResult}</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  lettersContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '2rem',
    margin: '20px 0'
  },
  letter: {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    minWidth: '40px',
    transition: 'all 0.5s ease'
  },
  eliminatedLetter: {
    textDecoration: 'line-through',
    opacity: 0.5,
    color: 'red'
  },
  finalResult: {
    marginTop: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }
};

export default ResultPage;