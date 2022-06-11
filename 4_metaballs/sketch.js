/* 
  Read more about metaballs in this article on gamedev.net:
  https://www.gamedev.net/tutorials/_/technical/graphics-programming-and-theory/exploring-metaballs-and-isosurfaces-in-2d-r2556/

  or on Wikipedia 
  https://en.wikipedia.org/wiki/Metaballs

  Created with inspiration from The Coding Train', coding challenge #28
  https://www.youtube.com/watch?v=ccYLb7cLB1I&t=695s
*/

// Make an array for all out blobs
const blobs = [];
// Set an variable for the number of blobs we want
const numBlobs = 10;

setup = () => {
  createCanvas(400, 200);
  // Change the color mode from RGB to HSB
  colorMode(HSB);

  // Create all out blobs with random start positions
  for (let i = 0; i < numBlobs; i++) {
    blobs.push(new Blob(random(0, width), random(0, height)));
  }
};

draw = () => {
  background(51);

  // Load all the pixels from the canvas into the pixels array
  loadPixels();

  // Get every pixel in the array
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Variable used for the color
      let sum = 0;

      // Get every blob in the array
      for (let i = 0; i < blobs.length; i++) {
        // Get the difference between the the pixel of the position of the blob
        const xDiff = x - blobs[i].x;
        const yDiff = y - blobs[i].y;
        // Calculate the difference in distance
        const d = sqrt(xDiff * xDiff + yDiff * yDiff);
        // Calculate the hue value for the color
        sum += (10 * blobs[i].r) / d;
      }
      // Set the color
      set(x, y, color(sum, 255, 255));
    }
  }
  // Apply the changes in the pixels array to the canvas
  updatePixels();

  // Update the pixels, we don't use show for anything but debugging
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }
};
