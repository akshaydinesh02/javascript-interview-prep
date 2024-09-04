Array.prototype.myFilter = function (callback, thisArg) {
  // Check if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }

  // Check if the callback to run for each element is a function or not
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Convert 'this' into an object ensuring it behaves like an array
  const array = Object(this);

  // Ensure length is a non-negative integer. Convert length to 32-bit unsigned integer
  const len = array.length >>> 0;

  // Create an empty array to store the filtered elements
  const result = [];

  // Looping over the original array
  for (let i = 0; i < len; i++) {
    // Check if the index exists in the array (handles sparse arrays)
    if (i in array) {
      // If the callback returns true for the element, push it to the result array
      if (callback.call(thisArg, array[i], i, array)) {
        result.push(array[i]);
      }
    }
  }

  // Return the array containing the filtered elements
  return result;
};

// Test Case 1: Basic usage with even numbers
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.myFilter((num) => num % 2 === 0);
console.assert(
  JSON.stringify(evens) === JSON.stringify([2, 4]),
  "Test Case 1 Failed"
);

// Test Case 2: Filtering out falsey values
const mixed = [0, 1, false, 2, "", 3];
const truthy = mixed.myFilter(Boolean);
console.assert(
  JSON.stringify(truthy) === JSON.stringify([1, 2, 3]),
  "Test Case 2 Failed"
);

// Test Case 3: Filtering on an empty array
const emptyArray = [];
const filteredEmpty = emptyArray.myFilter((num) => num > 1);
console.assert(
  JSON.stringify(filteredEmpty) === JSON.stringify([]),
  "Test Case 3 Failed"
);

// Test Case 4: Filtering an array of strings
const strings = ["apple", "banana", "cherry"];
const filteredStrings = strings.myFilter((str) => str.includes("a"));
console.assert(
  JSON.stringify(filteredStrings) === JSON.stringify(["apple", "banana"]),
  "Test Case 4 Failed"
);

// Test Case 5: Using a thisArg
const numbers2 = [10, 20, 30, 40];
const context = { threshold: 25 };
const aboveThreshold = numbers2.myFilter(function (num) {
  return num > this.threshold;
}, context);
console.assert(
  JSON.stringify(aboveThreshold) === JSON.stringify([30, 40]),
  "Test Case 5 Failed"
);

// Test Case 6: Filtering a sparse array
const sparseArray = [1, , 3, , 5];
const filteredSparse = sparseArray.myFilter((num) => num > 2);
console.assert(
  JSON.stringify(filteredSparse) === JSON.stringify([3, 5]),
  "Test Case 6 Failed"
);

// Test Case 7: Filtering with all elements false
const allFalse = [1, 2, 3, 4, 5];
const filteredFalse = allFalse.myFilter((num) => num > 10);
console.assert(
  JSON.stringify(filteredFalse) === JSON.stringify([]),
  "Test Case 7 Failed"
);

// Test Case 8: Filtering objects by property value
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const filteredObjects = objects.myFilter((obj) => obj.id > 1);
console.assert(
  JSON.stringify(filteredObjects) === JSON.stringify([{ id: 2 }, { id: 3 }]),
  "Test Case 8 Failed"
);

// Test Case 9: Filtering using index
const nums = [10, 20, 30, 40];
const filteredByIndex = nums.myFilter((num, index) => index % 2 === 0);
console.assert(
  JSON.stringify(filteredByIndex) === JSON.stringify([10, 30]),
  "Test Case 9 Failed"
);

// Test Case 10: Filtering with undefined elements
const mixedArray = [undefined, 2, null, 4, 5];
const filteredMixed = mixedArray.myFilter((num) => num != null);
console.assert(
  JSON.stringify(filteredMixed) === JSON.stringify([2, 4, 5]),
  "Test Case 10 Failed"
);
