// settings
var drawSpeed = 10;
var numEntities = 5;
var numPoints = 500;

var currPos;
var targPos;
var entities = []

function entity() {
  this.currPos = randomChord();
  this.targPos = randomChord();
  this.listPos = [];
  for (let n=0; n<numPoints; n++) {
    this.listPos[n] = this.currPos;
  }

  this.drawLines = function() {
    for (let j=1; j<this.listPos.length; j++) {
      let val = j / numPoints * 255;
      stroke(val);
      line(this.listPos[j-1].x, this.listPos[j-1].y, this.listPos[j].x, this.listPos[j].y);
    }
  }
}

function setup() {
  // put setup code here
  createCanvas(700, 700);
  background(0);
  stroke(255);
  for (let i=0; i<numEntities; i++) {
    entities.push(new entity());
  }
  frameRate(60);
  //to prevent darker lines overlapping lighter parts but causes framerate drop
  //blendMode(LIGHTEST);
}

function draw() {
  translate(50, 50);
  entities.forEach(entity => {
    entity.listPos.shift();
	  let dx = entity.targPos.x - entity.currPos.x;
	  let dy = entity.targPos.y - entity.currPos.y;
	  if (dx*dx + dy*dy >= drawSpeed*drawSpeed) {
	    let angle = atan2(dy, dx);
	    let newPos = { x: entity.currPos.x + drawSpeed * cos(angle), y: entity.currPos.y + drawSpeed * sin(angle) };
	    entity.listPos.push(newPos);
      entity.drawLines();
      entity.currPos = newPos;
	  } else {
      entity.listPos.push(entity.targPos);
      entity.drawLines();
	    entity.currPos = entity.targPos;
	    entity.targPos = randomChord();
	  }
  });
}

function randomChord() {
  // find 2 random points on a circle
  let angle = random(0, 2*PI);
  let xPos = 300 + 300 * cos(angle);
  let yPos = 300 + 300 * sin(angle);
  return { x: xPos, y:yPos };
}
