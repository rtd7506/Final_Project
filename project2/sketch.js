//Player Variables
var p; //player
var MAX_SPEED = 5;
var ACCELERATION = 1;
var FRICTION = 0.1;

//Missles
var m = [];


//Launchers
var l = [];

function setup() {
  createCanvas(1200, 675);
  p = createSprite(width / 2, height / 2, 50, 50);
  p.maxSpeed = MAX_SPEED;
  p.friction = FRICTION;
  //Missle Variables
  //Launcher Variables
  l[0] = createSprite(random(0, width), random(0, height), 60, 60);
  m[0] = new Missile(0);
}

function draw() {
  background(0);
  fill(255);
  //Player Movement
  if (keyDown("w")) {
    //p.velocity.y = -5;
    p.velocity.y += -1 * ACCELERATION;
  }
  if (keyDown("s")) {
    //p.velocity.y = 5;
    p.velocity.y += ACCELERATION;
  }
  if (keyDown("a")) {
    //p.velocity.x = -5;
    p.velocity.x += -1 * ACCELERATION;
  }
  if (keyDown("d")) {
    //p.velocity.x = 5;
    p.velocity.x += ACCELERATION;
  }
  /* //Idea for a dash move to free up movement
  if (keyDown("SPACE"))
  {
    console.log(p.maxSpeed);
    p.velocity.mult(1.5);
    p.maxSpeed = 7;
  }
  else
  {
    p.maxSpeed = 5
  }
  */

  //p.velocity.mult(FRICTION);



  //Missle Movement
  if (m.length > 0) 
  {
    m[0].render();
    m[0].move();
    //m[0].collision();
    m[0].update();
  }

  

  drawSprites();
  ellipse(p.position.x, p.position.y, 50, 50);

  
}



/*
//Sprite creation
//Click to create a new sprite with random speed

function setup() {
    createCanvas(800, 400);
  }

  function draw() {
    background(255, 255, 255);

    fill(0);
    textAlign(CENTER);
    text('Click to create a new sprite', width/2, height/2);
    //draw all the sprites added to the sketch so far
    //the positions will be updated automatically at every cycle
    drawSprites();
  }

  function mousePressed() {

    //create a sprite at the mouse position and store it in a temporary variable
    var s = createSprite(mouseX, mouseY, 30, 30);
    //if no image or animation is associated it will be a rectancle of the specified size
    //and a random color

    //now you can use the variable to set properties
    //e.g. a random velocity on the x and y coordinates
    s.velocity.x = random(-5, 5);
    s.velocity.y = random(-5, 5);
  }
  */