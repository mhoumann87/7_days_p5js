// Just a "standard" physic engine, see the Nature of Code play list for
// more information about vectors and vector math
// https://youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.maxSpeed = 4;
    this.h = 0;

    this.prevPos = this.position.copy();
  }

  // This function makes the particle follow the nearest flow field vector
  follow(vectors) {
    const x = floor(this.position.x / scale);
    const y = floor(this.position.y / scale);

    const index = x + y * cols;

    const force = vectors[index];
    this.applyForce(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // Reset acceleration to zero
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  show() {
    stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    strokeWeight(1);
    line(this.position.x, this.position.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.position.x;
    this.prevPos.y = this.position.y;
  }

  // "Reset" the pixel if it gets outside the canvas
  edges() {
    if (this.position.x > width) {
      this.position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
