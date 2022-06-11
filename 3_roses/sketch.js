/*
  Read more about the algorithms on wikipedia:
  https://en.wikipedia.org/wiki/Rose_(mathematics)

  Based on Coding Challenge #55 on the Coding Train
  https://www.youtube.com/watch?v=f5QBExMNB1I&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=72
*/

// We need some variables to keep out values
let d = 8;
let n = 5;
// We also need to make some sliders to control the values of n and d
let sliderD, sliderN;

setup = () => {
  createCanvas(400, 400);

  // We "put" the sliders on the page
  sliderD = createSlider(1, 8, 4);
  sliderN = createSlider(1, 7, 5);
  sliderD.input(draw);
  sliderN.input(draw);
};

draw = () => {
  background(51);

  // we get the values from the sliders and assign them to our variables
  d = sliderD.value();
  n = sliderN.value();

  // We need a constant that are a value set by dividing n with d
  const k = n / d;

  // We start a new drawing state
  push();

  // We move 0,0 to the middle of the canvas from top left corner
  translate(width * 0.5, height * 0.5);

  // We start our rose drawing
  beginShape();

  stroke(255);
  noFill();
  strokeWeight(1);

  // We make a loop based on TWO_PI (full circle), d and an arbitrary step
  for (let a = 0; a < TWO_PI * d; a += 0.02) {
    // Calculate the radius
    const r = 200 * cos(k * a);
    //get the x and y values based on r
    const x = r * cos(a);
    const y = r * sin(a);

    vertex(x, y);
  }

  // We end our rose drawing, and make it a closed loop
  endShape(CLOSE);

  // we end the drawing state and restore original state
  pop();
  // We don't want this to keep on drawing
  noLoop();
};
