// DOM Manipulation
// TODO: after dom - content loaded do stuff

// Select Speed Visualizer Runs
// const selectedSpeed = document.querySelector('.speed');
// let speed = selectedSpeed.value;

// Save Input Array for Replay Button?
let replayArray;
// Replay Button
const replayButton = document.querySelector('.replay-button');
replayButton.addEventListener('click', () => {
  console.log(replayArray);
  selectionSort(replayArray);
});

// Pause Running Algo
let paused = false;
const pauseButton = document.querySelector('.pause-button');
const resumeButton = document.querySelector('.resume-button');
pauseButton.addEventListener('click', () => {
  paused = true;
});

const pauseFunction = async () => {
  return new Promise((resolve) => {
    resumeButton.addEventListener('click', () => {
      paused = false;
      resolve();
    });
  });
};

// Button to trigger Selection Sort
const button = document.querySelector('.sort-button');
button.addEventListener('click', (e) => {
  e.preventDefault();

  // check if an array already exists - if so clear all elms in visualizer
  const visualizer = document.querySelector('.visualizer');
  while (visualizer.firstChild) {
    visualizer.removeChild(visualizer.firstChild);
  }
  // Input Error Handling - Nodes
  const input = document.querySelector('input');
  const errorMessage = document.querySelector('.error-message');

  // Handle NO-INPUT error
  if (input.value.length === 0) {
    errorMessage.innerText = `You haven't entered anything, pal`;
    return;
  }

  // Handle Periods error
  if (input.value.includes('.')) {
    errorMessage.innerText = `Numbers separated by commas Meaty Human`;
    return;
  }

  const nonNumericRegex = /[^0-9,]/;
  // Handle INVALID-INPUT error
  if (nonNumericRegex.test(input.value)) {
    // append info this isn't valid
    errorMessage.innerText = 'Please enter a series of numbers';
    return;
  } else {
    // convert input str to valid num array
    const inputNums = inputToNum(input.value);
    // clear input box
    input.value = '';
    // Valid Input = Initialize Visualizer
    createVisual(inputNums);
    // Reveal Tooltip with Visualizer
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'flex';

    // Save value for a potential replay
    replayArray = inputNums;

    selectionSort(inputNums);

    // Replay Button
    const replayButton = document.querySelector('.replay-button');
    replayButton.addEventListener('click', () => {
      selectionSort();
    });
  }
});

// Conversion of Number / Input validation
const inputToNum = (str) => {
  // convert to array split by commas, elms to nums
  const validInput = str.split(',').map((e) => Number(e));
  return validInput;
};

// Init Visualizer
const createVisual = (array) => {
  const visualizer = document.querySelector('.visualizer');
  for (let i = 0; i < array.length; i++) {
    const box = document.createElement('p');
    box.setAttribute('id', `idx${i}`);
    box.classList.add('box');
    box.innerText = array[i];
    visualizer.appendChild(box);
  }
};

// delay for visualizer to handle CSS changes
const delay = (ms) => {
  const selectedSpeed = document.querySelector('.speed');
  console.log('old speed ===>', ms);
  let newSpeed = ms * Number(selectedSpeed.value);
  console.log('new speed ===>', newSpeed);
  return new Promise((resolve) => setTimeout(resolve, newSpeed));
};

const selectionSort = async (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let curr = i;
    let min = i;

    // highlight dom elms currently getting sorted
    const currNum = document.getElementById(`idx${curr}`);
    currNum.classList.add('current');
    let minNum = document.getElementById(`idx${min}`);

    await delay(1000);

    for (let j = i + 1; j < array.length; j++) {
      const compareNum = document.getElementById(`idx${j}`);
      compareNum.classList.add('active');
      minNum.classList.add('min');

      if (paused) {
        await pauseFunction();
      }

      if (array[j] < array[min]) {
        min = j;

        minNum.classList.remove('min');
        minNum = document.getElementById(`idx${min}`);
        await delay(500);
        minNum.classList.add('min');
      }
      await delay(500);
      compareNum.classList.remove('active');
      minNum.classList.remove('min');
    }
    // Swap minimum and current values in visualizer
    let currText = currNum.innerText;
    currNum.innerText = array[min];
    currNum.style.fontWeight = 'bold';
    currNum.style.backgroundColor = 'black';
    currNum.style.color = 'white';
    minNum.innerText = currText;

    [array[curr], array[min]] = [array[min], array[curr]];

    // deactivate curr because we're moving onto the next iteration
    currNum.classList.remove('current');
  }

  // fix css on last box
  const finalBox = document.getElementById(`idx${array.length - 1}`);
  finalBox.style.fontWeight = 'bold';
  finalBox.style.backgroundColor = 'black';
  finalBox.style.color = 'white';

  return array;
};

// // Replay Button
// const replayButton = document.querySelector('.replay-button');
// replayButton.addEventListener('click', () => {
//   selectionSort();
// });

// OPTIONAL: Modal to display error messages
// error modal functions
// const errorModal = document.querySelector('.error-modal');
// errorModal.addEventListener('click', () => {
//   const modal = document.querySelector('.error-modal');
//   const sortButton = document.querySelector('.button');
//   const userInput = document.querySelector('.input');
//   modal.style.display = 'none';
//   sortButton.style.display = 'flex';
//   userInput.style.display = 'flex';
// });

// const showModal = () => {
//   const errorModal = document.querySelector('.error-modal');
//   const errorMessage = document.querySelector('.error-message');
//   const sortButton = document.querySelector('.button');
//   const userInput = document.querySelector('.input');
//   errorMessage.innerText = 'Please enter a series of numbers';
//   // TODO - fix inheritance so modal overshadows things
//   errorModal.style.display = 'flex';
//   sortButton.style.display = 'none';
//   userInput.style.display = 'none';
// };
