export function getFlamesEliminationOrder(name1, name2) {
    // Standardize inputs: lowercase and remove spaces.
    name1 = name1.toLowerCase().replace(/\s/g, "");
    name2 = name2.toLowerCase().replace(/\s/g, "");
  
    // Remove common letters.
    for (let i = 0; i < name1.length; i++) {
      const char = name1[i];
      if (name2.includes(char)) {
        name1 = name1.replace(char, "");
        name2 = name2.replace(char, "");
      }
    }
  
    // Count remaining letters.
    const count = name1.length + name2.length;
  
    // Initialize FLAMES letters.
    let flames = ["F", "L", "A", "M", "E", "S"];
    // This array will record the order in which letters are eliminated.
    const eliminationOrder = [];
  
    // Cycle through FLAMES until one letter remains.
    while (flames.length > 1) {
      let index = (count % flames.length) - 1;
      if (index >= 0) {
        // Remove the letter at the calculated index.
        const removed = flames.splice(index, 1)[0];
        eliminationOrder.push(removed);
        // Rearranging the list so that counting starts from the next element.
        flames = [...flames.slice(index), ...flames.slice(0, index)];
      } else {
        // If index is -1, remove the last letter.
        const removed = flames.pop();
        eliminationOrder.push(removed);
      }
    }
  
    // The final remaining letter in flames determines the relationship.
    const finalLetter = flames[0];
    const flamesMap = {
      F: "Friends",
      L: "Love",
      A: "Affection",
      M: "Marriage",
      E: "Enemy",
      S: "Siblings"
    };
  
    return {
      finalResult: flamesMap[finalLetter] || "",
      eliminationOrder // Order in which letters were struck off.
    };
  }