export function getFlamesEliminationOrder(name1, name2) {
  if (!name1 || !name2) return { finalResult: "Please enter both names!", eliminationOrder: [] };

  let combinedName = name1.replace(/\s+/g, "").toLowerCase() + name2.replace(/\s+/g, "").toLowerCase();
  let uniqueChars = new Set(combinedName);
  let count = uniqueChars.size;

  let flames = ["F", "L", "A", "M", "E", "S"];
  let eliminationOrder = [];

  while (flames.length > 1) {
    let index = (count % flames.length) - 1;
    if (index >= 0) {
      eliminationOrder.push(flames[index]);
      flames.splice(index, 1);
    } else {
      eliminationOrder.push(flames[flames.length - 1]);
      flames.pop();
    }
  }

  return { finalResult: flames[0], eliminationOrder };
}
