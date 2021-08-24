var xstart, xnoise, ynoise;
var paused;
function setup() {
    createCanvas(700, 700);
    stroke(255);
    smooth();
    paused = false;
    xstart = random(10);
    ystart = random(10);
    ynoise = random(10);
    xnoise = xstart;
    translate(-0.1*width, -0.1*height);
}

function draw() {
    checkPause();
    if (!paused) {
    background(0);
    xstart+=0.05;
    ystart+=0.05;
    xnoise=xstart;
    ynoise=ystart;
    for (let y=0; y<= height*1.2; y+=5) {
	ynoise += 0.05;
	xnoise = xstart;
	for (let x=0; x<=width*1.2; x+=5) {
	    xnoise += 0.05;
	    drawPoint(x, y, noise(xnoise, ynoise));
	}
    }
    }
}

function drawPoint(x, y, noiseVal) {
    push();
    translate(x, y);
    rotate(noiseVal * radians(360));
    stroke(255, 150);
    line(0, 0, 20, 0);
    pop();
}

function checkPause() {
    if (mouseIsPressed) {
	paused = !paused;
    
    }
}
