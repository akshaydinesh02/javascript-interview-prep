Array.prototype.myMap = function (callback, thisArg) {
  // Check if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  // Check if callback is to run for each element is a function or not
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  // Create a result array with same length as original array
  const result = new Array(this.length);

  // Convert 'this' into an object ensuring it behaves like an array
  const array = Object(this);

  // Ensure length is a non-negative integer. Convert len to 32-bit unsigned integer
  const len = array.length >>> 0;

  // Looping over original array
  for (let i = 0; i < len; i++) {
    // Check for undefined elements in the original array
    if (i in array) {
      // thisArg: Value of this inside callback
      // array[i]: Current element of array
      // i: Current index
      // array: ENtire array
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }
  return result;
};

// Test cases
// 1. Basic usage
const numbers = [1, 2, 3, 4];
const doubled = numbers.myMap((num) => num * 2);
console.assert(
  JSON.stringify(doubled) === JSON.stringify([2, 4, 6, 8]),
  "Test Case 1 Failed"
);

// 2. Empty aray
const emptyArray = [];
const result = emptyArray.myMap((num) => num * 2);
console.assert(
  JSON.stringify(result) === JSON.stringify([]),
  "Test Case 2 Failed"
);

// 3. With a 'thisArg'
const context = { multiplier: 3 };
const tripled = numbers.myMap(function (num) {
  return num * this.multiplier;
}, context);
console.assert(
  JSON.stringify(tripled) === JSON.stringify([3, 6, 9, 12]),
  "Test Case 3 Failed"
);

// 4. Without a 'thisArg'
const tripledBuggy = numbers.myMap(function (num) {
  return num * this.multiplier;
});
console.assert(
  JSON.stringify(tripledBuggy) === JSON.stringify([NaN, NaN, NaN, NaN]),
  "Test Case 4 Failed"
);

// 5. Undefined and Null elements
const arr = [1, , 3, null];
const resultNull = arr.myMap((num) => (num == null ? 0 : num * 2));
console.assert(
  JSON.stringify(resultNull) === JSON.stringify([2, , 6, 0]),
  "Test Case 5 Failed"
);

// 6. Sparse array
const sparseArray = [1, , 3];
const mappedSparseArray = sparseArray.myMap((num) => num * 2);
console.assert(
  JSON.stringify(mappedSparseArray) === JSON.stringify([2, , 6]),
  "Test Case 6 Failed"
);

// 7. Mapping with a callback that returns undefined
const resultUndefined = numbers.myMap(() => undefined);
console.assert(
  JSON.stringify(resultUndefined) ===
    JSON.stringify([undefined, undefined, undefined, undefined]),
  "Test Case 7 Failed"
);

// 8. Map over array like object
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const resultObject = Array.prototype.myMap.call(arrayLike, (char) =>
  char.toUpperCase()
);
console.assert(
  JSON.stringify(resultObject) === JSON.stringify(["A", "B", "C"]),
  "Test Case 8 Failed"
);

// 9. Map with non array objects
const obj = { length: 3, 0: 1, 1: 2, 2: 3 };
const resultNonObj = Array.prototype.myMap.call(obj, (num) => num * 2);
console.assert(
  JSON.stringify(resultNonObj) === JSON.stringify([2, 4, 6]),
  "Test Case 9 Failed"
);

// 10. Map with complex objects
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const resultComplexObjects = objects.myMap((obj) => obj.x * 2);
console.assert(
  JSON.stringify(resultComplexObjects) === JSON.stringify([2, 4, 6]),
  "Test Case 10 Failed"
);
