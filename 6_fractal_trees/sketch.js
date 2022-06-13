/*
  Read more about the algorithms and theory behind fractal trees

  https://davis.wpi.edu/~matt/courses/fractals/trees.html

  https://larryriddle.agnesscott.org/ifs/pythagorean/symbinarytree.htm

  Based on the Coding Train Coding challenge #15
  https://www.youtube.com/watch?v=fcdNSZ9IzJM
*/

// We make a variable for the angle, so the user can manipulate with it
let angle = 0;

// We make a slider value to be used for manipilating with the angle
let slider;

setup = () => {
  createCanvas(400, 400);

  // Attach a slider to the website to set the angle
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
};

draw = () => {
  // We make an arbitrary length value
  const len = 100;
  // Set the value of angle to the value of the slider
  angle = slider.value();

  background(51);
  stroke(255);

  // Move the 0,0 to the bottom middle of canvas from the normal top left corner
  translate(width * 0.5, height);

  // Draw the trunk of the tree
  branch(len);
};

branch = len => {
  // Draw the first branch from the bottom in the
  // length of len. We can call that the trunk;
  line(0, 0, 0, -len);
  // We now translate the position to the top of the trunk
  translate(0, -len);

  // We make the function recursive, by calling branch() from inside
  // the function, but if we don't set a stop value, it will be a
  // infinite loop, and that is not good
  if (len > 4) {
    // push() saves the current drawing style and transformations
    // while pop() restores these settings
    push();
    // First we rotate to the right and draw the right branch
    rotate(angle);
    branch(len * 0.67);
    pop(); // Go back to the top of the pervious branch

    push();
    // rotete to the left and draw the left branch
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
};
