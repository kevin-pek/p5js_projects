var nRows, nCols;
var grid;
var offset;
var nSteps = 6;
var stepLength = 4;
var colorArray;

function setup() {
    createCanvas(700, 700);
    background(255);
    strokeWeight(1);
    colorMode(HSB, 100);
    noFill();
    /*colorArray = new Array(nSteps);
    for (let i=0; i<nSteps; i++) {
        colorArray[i] = 
    }*/

    let resolution = width * 0.01;
    nCols = 1.2 * width / resolution;
    nRows = 1.2 * height / resolution;
    offset = { x:-0.1 * width + resolution/2, y:-0.1*height + resolution/2 };

    grid = new Array(nCols);
    for (let i=0; i<nCols; i++) {
        grid[i] = new Array(nRows);
    }
    rect(0, 0, width, height);
    translate(offset.x, offset.y);
    for (let x=0; x<grid.length; x++) {
        for (let y=0; y<grid[x].length; y++) {
            // perlin noise works best when scaled to 0.005
            let noiseVal = noise(x*0.1, y*0.1);
            let angle = map(noiseVal, 0, 1, 0, 2*PI);
            //line(x*resolution, y*resolution, 25*cos(angle)+x*resolution, 25*sin(angle)+y*resolution);
            grid[x][y] = angle;
        }
    }

    // supposed to curve based on the angles of the given point but well
    for (let x=0; x<grid.length; x++) {
        for (let y=0; y<grid[x].length; y++) {
            //let curvePoints = new Array(nSteps);
            let xCurr = x;
            let yCurr = y;
            //curvePoints[0] = { x: xCurr, y: yCurr };
            for (let i=1; i<nSteps; i++) {
                let xStep = xCurr + ceil(stepLength * cos(grid[x][y]));
                let yStep = yCurr + ceil(stepLength * sin(grid[x][y]));
                //if (xStep>=0 && xStep<grid.length && yStep>=0 && yStep<grid[x].length) {
                    //curvePoints[i] = { x: xStep, y:yStep };
                    stroke(70-i * 11, 70, 50);
                    line(xCurr*resolution, yCurr*resolution, xStep*resolution, yStep*resolution);
                    xCurr = xStep;
                    yCurr = yStep;
                /*}
                else {
                    break;
                }*/
            }/*
            beginShape();
            curvePoints.forEach(point => {
                curveVertex(point.x*resolution, point.y*resolution);
            });
            endShape();*/
        }
    }
}