class Cell {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    // We need a way to see if there should be a wall in the place
    // so we make an array with boolean values, all starting out as true
    // the order is top, right, bottom, left
    this.walls = [true, true, true, true];
    // We also need to keep track with is we have visited the cell before
    this.visited = false;
  }

  highLight() {
    // Find x and y for currentCell
    const x = this.i * size;
    const y = this.j * size;
    // make a rect with a color, to see the current cell in the grid
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, size, size);
  }

  checkNeighbors() {
    // We need to keep track of the cells around the current cell
    // and we do that in an arrayhave to figure out which walls we need to remove,
    const neighbors = [];

    // Find the indecencies og the surrounding cells
    const top = grid[index(this.i, this.j - 1)];
    const right = grid[index(this.i + 1, this.j)];
    const bottom = grid[index(this.i, this.j + 1)];
    const left = grid[index(this.i - 1, this.j)];

    // Check to see if the neighbors exists and haven't been visited
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    // If we have an array of neighbors
    if (neighbors.length > 0) {
      // choose a random neighbor
      const randomCell = floor(random(0, neighbors.length));
      return neighbors[randomCell];
    } else {
      // We don't have anything in the neighbors array,
      // so we return undefined
      return undefined;
    }
  }

  show() {
    // Set the color
    stroke(255);
    // and remove the fill
    noFill();

    // We set the placement of the cell at the i and j coordinates,
    // and multiply that with the size constant to get the size
    const x = this.i * size;
    const y = this.j * size;

    // Test to see if we have a complete grid comment out before "use"
    //rect(x, y, size, size);
    //noFill();

    // We can't use rectangles, because we need some open sides to move around
    // so we need to draw a line on all sides of the rectangle
    // We let tje boolean array "decide" if the wall is drawn
    if (this.walls[0]) {
      // top line. from top left corner to top right corner length of the size const
      line(x, y, x + size, y);
    }

    if (this.walls[1]) {
      // Right line, from top right corner to bottom right + size
      line(x + size, y, x + size, y + size);
    }

    if (this.walls[2]) {
      // bottom line, from right bottom corner to bottom left corner + size
      line(x + size, y + size, x, y + size);
    }

    if (this.walls[3]) {
      // left line, from bottom left corner to top left corner + size
      line(x, y + size, x, y);
    }

    // This is just for debugging purpose
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, size, size);
    }
  }
}
