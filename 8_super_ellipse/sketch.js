/* 
  Piet Hein's super ellipse

  Learn more here:
  https://en.wikipedia.org/wiki/Superellipse

  https://mathworld.wolfram.com/Superellipse.html

  https://www.youtube.com/watch?v=JqkjQjtenPQ

  https://www.youtube.com/watch?v=PsZwsWbsfyY

  See a my first super ellipse sketch with a lot more explanation
  https://editor.p5js.org/mhoumann87/sketches/Xi48lU8M8

  Based on the Coding Trains Coding Challenge #19
  https://www.youtube.com/watch?v=z86cx2A4_3E&t=16s

*/

// We need a slider to control the value of the variable n
let slider;

// We need a function that returns a negative, positive or zero value,
// based on the angle
sgn = val => (val < 0 ? -1 : val > 0 ? 1 : 0);

setup = () => {
  createCanvas(500, 500);

  slider = createSlider(0.01, 5, 2, 0.01);
};

draw = () => {
  background(0);
  stroke(255);
  strokeWeight(8);
  noFill();

  // We need to move the 0, 0 from top left corner to the
  // middler of the canvas
  translate(width * 0.5, height * 0.5);

  // We need our variables to calculate our a and y values
  const a = 150;
  const b = 180;
  // And we need our n variable that make up the shape of the ellipse
  // we base the value for n with our slider
  const n = slider.value();
  //console.log(n);

  // We want a full shape, so we use begin and end shape and vertices
  beginShape();

  // We make a loop to draw our ellipse
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    // We need to divide 2 by n
    const na = 2 / n;
    // we calculate the x value
    x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    // And y with b and sine instead of a and cosine
    y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));

    // draw the shape
    vertex(x, y);
  }

  endShape(CLOSE);
};
