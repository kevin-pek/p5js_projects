var cx = 350;
var cy = 350;
var nSpirals = 100;

function setup() {
    createCanvas(700, 700);
    background(255);
    strokeWeight(0.5);
    smooth();

    let x, y;
    for (let i=0; i<nSpirals; i++) {
        let lastx, lasty = -999;
        let radNoise = random(10);
        let rad = 10;

        stroke(random(20), random(50), random(70), 80);
        let startangle = random(360);
        let endangle = 1440 + random(1440);
        let anglestep = 5 + random(3);

        for (let ang=startangle; ang<=endangle; ang+=anglestep) {
            radNoise += 0.05;
            rad += 0.5;
            let thisRad = rad+(noise(radNoise) * 200) -100;
            let radang = radians(ang);
            x = cx + thisRad * cos(radang);
            y = cy + thisRad * sin(radang);

            if(lastx > -999) {
                line(x, y, lastx, lasty);
            }
            lastx = x;
            lasty = y;
        }
    }
}