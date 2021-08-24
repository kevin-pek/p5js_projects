// inspired by the wave clock, which uses perlin noise to produce natural looking forms
var numCircles = 4;
var radius = 300;
var cx = 300;
var cy = 300;

function setup() {
    createCanvas(700, 700);
    background(255);
    strokeWeight(0.2);
    smooth();

    for (let n=0; n<numCircles; n++) {
        let startangle= random(2*PI);
        let endangle = 2*PI + random(2*PI);
        let noiseVal = random(10);
        let stepNoiseVal = random(5);
        let anglestep = PI / 180 * noise(stepNoiseVal);
        //beginShape();
        for (let ang=startangle; ang<endangle; ang+=anglestep) {
            noiseVal+=0.02;
            stepNoiseVal+=0.01;
            anglestep = PI / 180 * noise(stepNoiseVal);
            thisRadius = radius - (((radius-100)/numCircles)*n) + 150 * noise(noiseVal);
            let x = thisRadius * cos(ang);
            let y = thisRadius * sin(ang);
            line(cx, cy, cx + x, cy + y);
            //curveVertex(cx+x, cy+y);
        }
        //endShape();
    }
}