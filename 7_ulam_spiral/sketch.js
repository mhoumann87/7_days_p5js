/* The Ulam Spiral - The Prime Number Spiral */

/*
  Find More information here: 

  https://en.wikipedia.org/wiki/Ulam_spiral

  https://mathworld.wolfram.com/PrimeSpiral.html

  https://www.youtube.com/watch?v=EK32jo7i5LQ

  Inspired by the Coding Train's Coding Challenge #167
  https://www.youtube.com/watch?v=a35KWEjRvc0&list=PLRqwX-V7Uu6ZCtELDdShWS5oZSA3z3HsO

*/

// Variables to keep track of our x and y coordinates, and the pervious x and y
let x, y, px, py;
// variable to keep track on which step we are on
let step = 1;
// Variables to keep track of where we are in the run through
// How many steps do we need to take before we turn
let numSteps = 1;
// State is keeping track on which we have to turn
let state = 0;
// turnCounter i keeping track if the numSteps should increase
let turnCounter = 1;

// Variables for the step size and resolution
// A constant for out step size
const stepSize = 5;
// totalSteps are used for the the looping stop
let totalSteps;

// A simple function to check if a number is a prime number
isPrime = value => {
  // Number 1 is NOT a prime number
  if (value == 1) return false;

  // We check up to and equal to the square root of the number
  // if we we get a zero it is not a prime number (8 % 2 = 0);
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) return false;
  }
  return true;
};

setup = () => {
  createCanvas(500, 500);

  // Calculate the number of columns and rows
  const cols = width / stepSize;
  const rows = height / stepSize;
  // Calculate the number of total steps in the canvas
  totalSteps = cols * rows;
  // Start in the middle of the canvas
  x = width * 0.5;
  y = height * 0.5;
  // Set the previous x and y
  px = x;
  py = y;
  // We draw the background so it doesn't refresh every loop
  background(0);
};

draw = () => {
  // If the current number is a prime number,
  // We draw a circle in the canvas
  if (isPrime(step)) {
    fill(255);
    stroke(255);
    circle(x, y, stepSize * 0.5);
  }
  /*   // Connect the dots with a line
  line(x, y, px, py);
  // And set previous x and y to current x and y
  px = x;
  py = y;
 */
  // Move according to the state. If the state is 0 we move right,
  // 1 we move up, 2 we move left and 3 we move down
  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  // We change the state based on number of steps and the turn counter
  if (step % numSteps == 0) {
    state = (state + 1) % 4;
    turnCounter++;

    // If the turn counter is a even number, change numSteps
    if (turnCounter % 2 == 0) {
      numSteps++;
    }
  }
  // Increase the step count
  step++;

  // Have we filled the canvas and need to stop the loop?
  if (step > totalSteps) {
    noLoop();
  }
};
