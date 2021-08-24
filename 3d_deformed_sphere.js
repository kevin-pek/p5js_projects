const radius = 300;
const spherePoints = [];
const numPoints = 30; // number of points every ring in the sphere
const pointSize = 5;

var easycam;
document.oncontextmenu = ()=>false;

function setup() {
    createCanvas(700, 700, WEBGL);
    // fix for EasyCam to work with p5 v0.9.0
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
        n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
    };
    easycam = createEasyCam();
    background(0);
    stroke(255);
    noFill();
 
    GenerateSphere(numPoints);
}

// maybe use distance from center to determine color?
// maybe use noise to skip some points?
function draw() {
    /*
    translate(0, 0, -100);
    rotateX(HALF_PI);
    rotateY(QUARTER_PI);*/
    background(0);

    for (let i=0; i<numPoints + 1; i++)  {
        beginShape(TRIANGLE_STRIP);
        for (let j=0; j<numPoints + 1; j++) {
            let point = spherePoints[i][j];
            DrawPoint(point);
            vertex(point.x, point.y, point.z);
            if (i<numPoints) {
                let point2 = spherePoints[i+1][j];
                vertex(point2.x, point2.y, point2.z);
            }
        }
        endShape();
    }
}

function DrawPoint(p) {
    push();
    translate(p.x, p.y, p.z);
    sphere(p.r);
    pop();
}

// generates 2d array of points on a sphere based on how many points desired
// one more longtitude is generated as a duplicate of the 1st longtitude so that the sphere can be joined for the triangle strip
function GenerateSphere(totalPoints) {
    let noisex = random(10); // xy for deforming the sphere
    let startx = noisex;
    let noisey = random(10);
    let noiser = random(10); // r for the size of the point rendered
    for (let i=0; i<totalPoints+1; i++) {
        noisey += 0.1;
        noisex = startx;
        spherePoints[i] = [];
        let lat = map(i, 0, totalPoints, 0, PI);
        for (let j=0; j<totalPoints + 1; j++) {
            let lon = map(j, 0, totalPoints, 0, TWO_PI);
            noisex += 0.1;
            noiser += 0.2;
            let r = radius + map(noise(noisex, noisey), 0, 1, -radius / 2, radius / 2);
            let x = r * cos(lon) * sin(lat);
            let y = r * sin(lon) * sin(lat);
            let z = r * cos(lat);

            let pointRadius = pointSize * noise(noiser);
            if (j != totalPoints) {
                spherePoints[i][j] = { x: x, y: y, z: z, r: pointRadius };
            }
            else if (j == totalPoints) {
                spherePoints[i][j] = spherePoints[i][0];
            }
        }
    }
}
