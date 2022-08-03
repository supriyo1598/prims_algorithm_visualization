var vertices = [];
var reached, unreached;
var saving = false;
var counter = 100;

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  for (var i=0; i<30; i++) {
      var v = createVector(random(width), random(height));
      vertices.push(v);
  }
}

function mousePressed() {
  var v = createVector(mouseX, mouseY);
  vertices.push(v);
  //saving = true;
}

function keyTyped() {
  if (key === 'r') {
    vertices = [];
    init();
  }
}

function init() {
  reached = [];
  unreached = [];
  for (var i = 0; i < vertices.length; i++) {
    unreached.push(vertices[i]);
  }
  reached.push(unreached[0]);
  unreached.splice(0, 1);
}


function draw() {
  background(20);

  init();

  while (unreached.length > 0) {
    var record = 10000;
    var rIndex = 0,
      uIndex = 0;

    for (var i = 0; i < reached.length; i++) {
      for (var j = 0; j < unreached.length; j++) {
        var v1 = reached[i];
        var v2 = unreached[j];
        var d = dist(v1.x, v1.y, v2.x, v2.y);

        if (d < record) {
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    var r1 = reached[rIndex];
    var r2 = unreached[uIndex];

    stroke(255);
    strokeWeight(2);
    line(r1.x, r1.y, r2.x, r2.y);

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);

  }

  for (var i = 0; i < vertices.length; i++) {

    fill(255,255,0);
    noStroke();
    ellipse(vertices[i].x, vertices[i].y, 16, 16);
  }

  if (saving) {
    save("anim/image-" + counter + ".png");
    println("saved image");
    saving = false;
    counter++;
  }

  fill(255,200);
  noStroke();
  textAlign(RIGHT);
  text("type 'r' to reset", width - 20, 20);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}