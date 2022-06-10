/*
  Based on an article on Wikipedia
  https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

  Coding Train Challenge no. 10
  
  part one: 
  https://www.youtube.com/watch?v=HyK_Q5rrcr4&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=10

  part two:
  https://www.youtube.com/watch?v=D8UgRyRnvXU&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=11

  part three:
  https://www.youtube.com/watch?v=8Ju_uxJ9v44&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=12

  part 4:
https://www.youtube.com/watch?v=_p5IH0L63wo&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=13
*/

// Set up global variables for number of columns and rows
let cols, rows;
// Set a constant for the height and width of the single cell
const size = 40;
// We need a variable to keep track with which cell we are in right now
let currentCell;
// And we need an array that can store all the different cells
const grid = [];
// We need to keep track of which cells we have visited, so we can go backwards
// through the maze
const stack = [];

// We need an easy way to calculate the index of an cell
index = (i, j) => {
  // If we have a cell around the edge,
  // we can't show the neighbor outside the grid
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  // return the index
  return i + j * cols;
};

// We remove the walls between the currentCell and the nextCell,
// so we have to figure out which cells to remove
removeWalls = (a, b) => {
  // to figure out where the nextCell are located, so we subtract the index
  // of the current cell and the next cell

  // For left and right we need to use the cells x axis
  const x = a.i - b.i;
  if (x === 1) {
    // If we get a 1 as result, the "walker" have moved left, and
    // we need to remove the left wall in currentCell
    a.walls[3] = false;
    // and the right wall in nextCell
    b.walls[1] = false;
  } else if (x === -1) {
    // we have moved to the right,
    // and currentCell right wall must be removed
    a.walls[1] = false;
    // and nextCell left wall
    b.walls[3] = false;
  }

  // And for up and down, we use the y axis
  const y = a.j - b.j;
  if (y === 1) {
    // we have moved up
    // and currentCell top wall must be removed
    a.walls[0] = false;
    // and the nextCell bottom wall
    b.walls[2] = false;
  } else if (y === -1) {
    // we have moved down
    // and currentCell bottom wall must be removed
    a.walls[2] = false;
    // and nextCell top wall
    b.walls[0] = false;
  }
};

setup = () => {
  createCanvas(400, 400);
  // Calculate the number of cells
  cols = floor(width / size);
  rows = floor(height / size);

  // We need to create all the cells, so we have to walk through every row (j)
  // and every column (i)
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Make the initial cell the current cell
  currentCell = grid[0];

  //
};

draw = () => {
  background(0);

  // We have to show every cell in the array
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // Mark the current cell as visited
  currentCell.visited = true;
  // We put a color on the currentCell to see it in the grid
  currentCell.highLight();

  // Check to see if the current cell have neighbors that not have been visited
  const nextCell = currentCell.checkNeighbors();
  // If we get a nextCell
  if (nextCell) {
    // Mark the nextCell as visited
    nextCell.visited = true;

    // Push currentCell to the stack
    stack.push(currentCell);

    // We have to remove the "wall" between the cells
    removeWalls(currentCell, nextCell);

    currentCell = nextCell;
  } else if (stack.length > 0) {
    // If we don't have any more neighbors, but we have items in the stack
    // We travel backwards trough the maze

    // Remove the last cell in the stack and make that the current cell
    currentCell = stack.pop();
  }
};
