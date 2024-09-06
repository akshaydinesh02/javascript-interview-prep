Array.prototype.myAt = function (index) {
  // Handle null or undefined arrays
  if (this == null) {
    throw new TypeError("Array.prototype.matAt called on null or undefined");
  }

  const len = this.length;

  // Handle negative indices
  const relativeIndex = index < 0 ? len + index : index;

  // Return undefined if out of bounds
  return relativeIndex >= 0 && relativeIndex < len
    ? this[relativeIndex]
    : undefined;
};

// Test Cases
const arr1 = [10, 20, 30, 40];
console.assert(arr1.myAt(1) === 20, "Test Case 1 Failed");
console.assert(arr1.myAt(-1) === 40, "Test Case 2 Failed");
console.assert(arr1.myAt(10) === undefined, "Test Case 3 Failed");
