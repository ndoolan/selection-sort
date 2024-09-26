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
// const runAlgo = document.querySelector('runAlgo');
const button = document.querySelector('.button');
// const input = document.querySelector('.input');
button.addEventListener('click', (e) => {
  e.preventDefault();

  const input = document.querySelector('.input');
  const nonNumericRegex = /[^0-9,]/;
  // test for valid input using regex
  if (nonNumericRegex.test(input.value)) {
    // append info this isn't valid
    const invalidInput = document.createElement('p');
    invalidInput.innerText = 'Please enter a series of numbers';
    input.appendChild(invalidInput);
  } else {
    // convert input str to valid num array
    const inputNums = inputToNum(input.value);
    // if valid input - init visual
    createVisual(inputNums);
    // TODO create button to sort?
    const sortedNums = selectionSort(inputNums);
    // return
    console.log({ sortedNums });
  }
});

// Conversion of Number / Input validation
const inputToNum = (str) => {
  const nonNumericRegex = /[^0-9,]/;

  // validate input
  if (nonNumericRegex.test(str)) {
    console.log('invalid input');
  } else {
    // convert input string to array of numbers
    const validInput = str.split(',').map((e) => Number(e));
    return validInput;
  }
};

// Init Visualizer
const createVisual = (array) => {
  const visualizer = document.querySelector('.visualizer');
  for (let i = 0; i < array.length; i++) {
    const box = document.createElement('p');
    box.setAttribute('id', `idx${i}`);
    box.innerText = array[i];
    box.style.border = '1px solid black';
    box.style.padding = '1em';
    box.style.backgroundColor = 'yellow';
    visualizer.appendChild(box);
  }
};

// delay for visualizer to work logic
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const selectionSort = async (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let curr = i;
    let min = i;

    // highlight dom elms currently getting sorted
    const currNum = document.getElementById(`idx${curr}`);
    console.log({ currNum });
    currNum.style.border = '2px solid purple';
    let minNum = document.getElementById(`idx${min}`);
    minNum.style.border = '2px solid red';

    await delay(3000);

    for (let j = i + 1; j < array.length; j++) {
      const compareNum = document.getElementById(`idx${j}`);
      if (array[j] < array[min]) {
        min = j;
        minNum.style.border = 'none';
        minNum = document.getElementById(`idx${min}`);
        minNum.style.border = '2px solid blue';
        await delay(1000);
      }
    }
    // swap visual vals - bold sorted portion
    let currText = currNum.innerText;
    currNum.innerText = array[min];
    currNum.style.fontWeight = 'bold';
    minNum.innerText = currText;

    [array[curr], array[min]] = [array[min], array[curr]];
  }
  return array;
};

// console.log(selectionSort(arr));
