// We need an x and y to start out with
let x = 0;
let y = 0;
let nextX, nextY;

nextPoint = () => {
  // We need a random number between 0 and one to make
  // the algorithm choose what to dram
  let random = Math.random();

  // we need a way to decide what to draw next
  if (random < 0.01) {
    /* 
    This coordinate transformation is chosen 1% of the time and just maps any point to a point in the first line segment at the base of the stem. This part of the figure is the first to be completed during the course of iterations.
    */
    nextX = 0;
    nextY = 0.16 * y;
  } else if (random < 0.85) {
    /* This coordinate transformation is chosen 85% of the time and maps any point inside the leaflet to a point inside the opposite, smaller leaflet represented by the blue triangle in the figure. */
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (random < 0.93) {
    /* This coordinate transformation is chosen 7% of the time and maps any point inside the leaflet (or pinna) to a point inside the alternating corresponding triangle across the stem (it flips it). */
    nextX = 0.2 * x - 0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    /* This coordinate transformation is chosen 7% of the time and maps any point inside the leaflet (or pinna) to a point inside the alternating corresponding triangle across the stem (without flipping it). */
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }

  // Attach the new value to the x and y;
  x = nextX;
  y = nextY;
};

drawPoint = () => {
  // make the point white
  stroke(255);
  // make the point a bit larger
  strokeWeight(1);
  let px = map(x, -2.182, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);
  // draw the point
  point(px, py);
};

setup = () => {
  // Create a canvas to display out sketch
  createCanvas(600, 600);

  // Background will be black
  // and we just want to draw it one time
  background(0);
};

draw = () => {
  // Only draw new points when we can see them
  for (let i = 0; i < height; i++) {
    drawPoint();
    nextPoint();
  }
};
