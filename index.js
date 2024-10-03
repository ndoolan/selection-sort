// DOM Manipulation

// pause algo function
// let paused = false;
// const pauseButton = document.querySelector('.pause-button');
// pauseButton.addEventListener('click', () => {
//   paused === false ? true : false;
// });
// const pause = () => {
//   pause === false ? true : false;
// };

// TODO: after dom - content loaded do stuff

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
// can we set a click event that references the same promsie and resolves it
//

// error modal functions
const errorModal = document.querySelector('.error-modal');
errorModal.addEventListener('click', () => {
  const modal = document.querySelector('.error-modal');
  const sortButton = document.querySelector('.button');
  const userInput = document.querySelector('.input');
  modal.style.display = 'none';
  sortButton.style.display = 'flex';
  userInput.style.display = 'flex';
});

const showModal = () => {
  const errorModal = document.querySelector('.error-modal');
  const errorMessage = document.querySelector('.error-message');
  const sortButton = document.querySelector('.button');
  const userInput = document.querySelector('.input');
  errorMessage.innerText = 'Please enter a series of numbers';
  // TODO - fix inheritance so modal overshadows things
  errorModal.style.display = 'flex';
  sortButton.style.display = 'none';
  userInput.style.display = 'none';
};

// button to trigger Selection Sort
const button = document.querySelector('.sort-button');
button.addEventListener('click', (e) => {
  e.preventDefault();

  // check if an array already exists - if so clear all elms in visualizer
  const visualizer = document.querySelector('.visualizer');
  while (visualizer.firstChild) {
    visualizer.removeChild(visualizer.firstChild);
  }

  const main = document.querySelector('main');
  const input = document.querySelector('input');
  const nonNumericRegex = /[^0-9,]/;
  // test for valid input using regex
  if (nonNumericRegex.test(input.value)) {
    // append info this isn't valid
    showModal();
  } else {
    // convert input str to valid num array
    const inputNums = inputToNum(input.value);
    // clear input box
    input.value = '';
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
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// pass in a j + i have them as default values otherwise
// if paused, break , break break
// logic that updates i + j
// how curr and min kept track of

const selectionSort = async (array) => {
  // Set up Pause button
  // let paused = false;
  // const pauseButton = document.querySelector('.pause-button');
  // pauseButton.addEventListener('click', () => {
  //   paused = true;
  // });
  // // resume button
  // const resumeButton = document.querySelector('.resume-button');
  // resumeButton.addEventListener('click', () => {
  //   paused = false;
  // });

  for (let i = 0; i < array.length - 1; i++) {
    let curr = i;
    let min = i;

    // highlight dom elms currently getting sorted
    const currNum = document.getElementById(`idx${curr}`);
    currNum.classList.add('current');
    let minNum = document.getElementById(`idx${min}`);

    await delay(1000);

    for (let j = i + 1; j < array.length; j++) {
      // if paused, setTimeout Loop
      const compareNum = document.getElementById(`idx${j}`);
      compareNum.classList.add('active');
      minNum.classList.add('min');

      if (paused) {
        // display none?
        // dynamic adding of resume button
        // only reveal the pause
        console.log('inside pause');
        await pauseFunction();
      }

      if (array[j] < array[min]) {
        min = j;

        minNum.classList.remove('min');
        minNum = document.getElementById(`idx${min}`);
        await delay(500);
        minNum.classList.add('min');
      }
      await delay(250);
      compareNum.classList.remove('active');
      minNum.classList.remove('min');
    }
    // swap visual vals - bold sorted portion
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

// console.log(selectionSort(arr));
