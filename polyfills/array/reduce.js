// Polyfill for Array.prototype.reduce method
Array.prototype.myReduce = function (callback, initialValue, thisArg) {
  // Check if the callback function is provided and is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Convert the array-like object to a true array
  const array = Object(this);

  // If the array is empty and no initial value is provided, throw an error
  if (array.length === 0 && arguments.length === 1) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  // Determine the starting index and initial value
  let index = 0;
  let accumulator;

  if (arguments.length >= 2) {
    // If initialValue is provided, start from the beginning of the array
    accumulator = initialValue;
  } else {
    // If initialValue is not provided, use the first element of the array
    accumulator = array[0];
    index = 1; // Start iteration from the second element
  }

  // Iterate over the array from the starting index
  for (i = 0; index < array.length; index++) {
    // Apply the callback function to each element
    accumulator = callback(accumulator, array[index], index, array);
  }

  // Return the final accumulated result
  return accumulator;
};

const arr1 = [1, 2, 3, 4];
const result1 = arr1.myReduce((acc, curr) => acc + curr, 0);
console.log(result1); // Output: 10
// methods
// at, concat, entries, every, fill, find, findIndex, findLast, findLastIndex, flat, forEach, includes, indexOf, join, keys, lastIndexOf, pop, push, reduce, reverse, shift, slice, some, unshift, values.
