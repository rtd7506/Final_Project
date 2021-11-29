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
  p.visible = false;
  //Missle Variables
  //Launcher Variables
  for (let i=0;i<3;i++)
  {
    l[i] = new Launcher(i);
    m[i] = new Missile(i);
  }
}

function draw() {
  background(255);
  noStroke();
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
    for (let i=0;i<m.length;i++)
    {
      if (typeof m[i] != "string")
      {
        m[i].render();
        m[i].move();
        m[i].update();
      }
      else
      {
        if (typeof l[i] != "string")
        {
          m[i] = new Missile(i);
          console.log("RESUP")
        }
        
      }
    }
  }

  if (l.length > 0) 
  {
    for (let i=0;i<l.length;i++)
    {
      if (typeof l[i] != "string")
      {
        l[i].render();
      }
    }
  }

  

  drawSprites();
  fill(58,189,242);
  ellipse(p.position.x, p.position.y, 50, 50);

  
}



