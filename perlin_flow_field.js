var rows, cols;
var scl = 10;
var inc = 0.05;
var znoise = 0;
var field;
var particles=[];
var numParticles = 1000;

function setup() {
    createCanvas(700, 700);
    colorMode(HSB, 255);

    cols = floor(width / scl);
    rows = floor(height / scl);
    field = new Array(cols * rows);
    for (let i=0; i<numParticles; i++) {
        particles[i] = new Particle();
    }

    background(10);
    strokeWeight(1);
}

function draw() {
    let xnoise = 0;
    let ynoise = 0;

    // update vector field
    for (let y=0; y<rows; y++) {
        ynoise += inc;
        for (let x=0; x<cols; x++) {
            // some hack that gets the right index
            let index = x + y * cols;

            xnoise += inc;
            let angle = noise(xnoise, ynoise, znoise) * TWO_PI * 4;//map(noise(xnoise, ynoise, znoise), 0, 1, 0, TWO_PI);
            let vector = p5.Vector.fromAngle(angle);
            vector.setMag(1);
            field[index] = vector;
        }
    }

    znoise += 0.0003;

    for (let p=0; p<particles.length; p++) {
        particles[p].update();
        particles[p].draw();
    }
}

function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.maxSpd = 5;
    this.acc = createVector(0, 0);

    this.hue = 0;
    this.prevPos = this.pos.copy();

    this.update = () => {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;

        this.acc.add(field[index]);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpd);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.draw();
        this.prevPos = this.pos.copy();
    };

    this.draw = () => {
        stroke(200);
        //stroke(this.hue, 255, 255, 25);
        this.hue = this.hue + 1;
        if (this.hue > 255) {
          this.hue = 0;
        }
        strokeWeight(0.1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    };

    this.edges = function() {
        if (this.pos.x > width) {
          this.pos.x = 0;
          this.prevPos = this.pos.copy();
        }
        if (this.pos.x < 0) {
          this.pos.x = width;
          this.prevPos = this.pos.copy();
        }
        if (this.pos.y > height) {
          this.pos.y = 0;
          this.prevPos = this.pos.copy();
        }
        if (this.pos.y < 0) {
          this.pos.y = height;
          this.prevPos = this.pos.copy();
        }
      };
}