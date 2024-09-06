Array.prototype.myConcat = function (...args) {
  // Handle null or undefined arrays
  if (this == null) {
    throw new TypeError(
      "Array.prototype.myConcat called on null or undefined."
    );
  }

  // Spread current array into the result
  const result = [...this];
  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (Array.isArray(value)) {
      // Spread arrays
      result.push(...value);
    } else {
      // Push other values directly
      result.push(value);
    }
  }

  return result;
};

// Test Cases
const arr2 = [1, 2];
const concatResult = arr2.myConcat([3, 4], 5, [6]);
console.assert(
  JSON.stringify(concatResult) === JSON.stringify([1, 2, 3, 4, 5, 6]),
  "Test Case 4 Failed"
);
