// Array.prototype.myEntries = function () {
//   const array = this;

//   let index = 0;
//   return {
//     next: function () {
//       return index < array.length
//         ? {
//             value: [index, array[index]],
//             done: false,
//           }
//         : { done: true };
//     },
//     [Symbol.iterator]() {
//       return this;
//     },
//   };
// };

// const arr3 = ["a", "b", "c"];
// const iterator = arr3.myEntries();
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// // console.assert(
// //   JSON.stringify(iterator.next().value) === JSON.stringify([0, "a"]),
// //   "Test Case 5 Failed"
// // );
// // console.assert(
// //   JSON.stringify(iterator.next().value) === JSON.stringify([1, "b"]),
// //   "Test Case 6 Failed"
// // );
