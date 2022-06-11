class Blob {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;

    // Make an random angle for the blob to move in
    const angle = random(0, 2 * PI);
    // Set random speed for the blob
    this.xSpeed = random(2, 5) * Math.cos(angle);
    this.ySpeed = random(2, 5) * Math.sin(angle);
    // Set a random radius
    this.r = random(120, 240);
  }

  update() {
    // Move the blob
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // When the blob reaches the edge, turn it around
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
    }
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
