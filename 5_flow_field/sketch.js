/*
  Perlin Noise Flow Field

  Wikipedia article about the vector field:
  https://en.wikipedia.org/wiki/Vector_field

  Wikipedia article about Perlin noise
  https://en.wikipedia.org/wiki/Perlin_noise

  P5.js docs about Perlin Noise
  https://p5js.org/reference/#/p5/noise

  Based on the Coding Train Coding Challenge #24
  https://www.youtube.com/watch?v=BjoM9oKOAKY&t=1s
*/

// We need a value that con "move the noise through time"
const increment = 0.01;
// We need a scale value, so we don't get a vector for each pixel
const scale = 10;
// And we need variables for columns and rows
let cols, rows;
// Set up the z offset that we use to change the time for animation
let zoff = 0;
// We need an array to store our particles
const particles = [];
// We need an array for our flow field, later changed to an array on setup()
let flowField;

// To keep track with our framerate in the project we do need a variable
// This is just for development, we remove it in production
let fr;

setup = () => {
  createCanvas(400, 400);
  // Calculate the number of cols and rows and remove the decimal place
  cols = floor(width / scale);
  rows = floor(height / scale);
  // initiate an empty array for the flow field
  flowField = new Array();

  // Create an empty paragraph for the framerate
  fr = createP('');

  // Put 300 particles in the particle array
  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }

  // Set the background here, else our drawing will ne erased
  background(51);
};

draw = () => {
  // We need to set a offset for the color that change for every run
  // to calculate the noise from, else we just gat the same color for each pixel
  let yoff = 0;

  for (let y = 0; y < rows; y++) {
    // We also need to set an offset for every run through the x axis
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      // Find the index for the vector field
      const index = x + y * cols;
      // Create an angle based on noise, created from the offsets
      // and PI
      const angle = noise(xoff, yoff, zoff) * TWO_PI * 4;

      // Make a angle vector for our flow field field based
      const vec = p5.Vector.fromAngle(angle);
      // Set the magnitude for the vector
      vec.setMag(1);

      // Draw our vector
      flowField[index] = vec;
      // Move the xoff
      xoff += increment;
      // draw the vector
      stroke(0, 50);
      /*       push();
      translate(x * scale, y * scale);
      rotate(vec.heading());
      strokeWeight(1);
      line(0, 0, scale, 0);
      pop();
 */
    }
    // Move the y off
    yoff += increment;
    // move  the "time"
    zoff += 0.003;
  }

  // Add the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // Add the framerate to the page
  // fr.html(floor(frameRate()));
};
