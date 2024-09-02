Function.prototype.myBind = function (context = {}, ...args) {
  const fn = this;
  // Check if fn is a function or not
  if (typeof fn !== "function") {
    throw new Error("It's not callable.");
  }

  // Create a unique symbol
  const key = Symbol();

  // Add function to the context
  context[key] = fn;

  // Return the function
  return function () {
    return context[key](...args);
  };
};

// Tests
// Case 1: undefined context
function greet(greeting, name) {
  console.log(`${greeting}, ${name}`);
}
const greetAkshay = greet.myBind(undefined, "Hello", "Akshay");
greetAkshay();

// Case 2: Custom object
let person1 = {
  name: "Akshay Dinesh",
};

let person2 = {
  name: "Elon musk",
};

function printAge(age) {
  console.log(`${this.name} is ${age} years old.`);
}
const printAkshayAge = printAge.myBind(person1, 27);
const printElonAge = printAge.myBind(person2, 50);
printAkshayAge();
printElonAge();

// Case 3: Non-function call
const invalidFn = {};
invalidFn.myBind = Function.prototype.myBind;
const invalidBind = invalidFn.myBind();
invalidBind();
