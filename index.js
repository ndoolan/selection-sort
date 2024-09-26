/*

Given an array of integers, sort the array in-place and return the array.
Do not create a new array in memory. Instead, modify the array as given. Do not
use the array sort method built in to the array prototype while solving the
problem. The integers should be in ascending order from left to right.

We will sort the array using a strategy called selection sort, which works as
follows. First, put the smallest number in the array at position 0. Then, put
the second-smallest number in the array at position 1. Then, put the
third-smallest number in the array at position 2 etc. After going through the
whole array, the array will end up being sorted.

*/
const arr = [99, 2, 4, 52, 7, 1, 33, 3];

// DOM Manipulation

const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let curr = i;
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j;
    }
    [array[curr], array[min]] = [array[min], array[curr]];
  }
  return array;
};

console.log(selectionSort(arr));
