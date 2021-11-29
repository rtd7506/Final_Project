//Player Variables
var p; //player
var MAX_SPEED = 5;
var ACCELERATION = 1;
var FRICTION = 0.1;

//Missles
var m = [];
//Launchers
var l = [];
// Original Levels System
// 0 = Empty Space 
// 1 = Wall
// Setup = level[y][x]
/*
var level = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];
*/

//New Level System Idea
/* Length of list is the amount of  enemies
var level = [
  [Enemy Type, Position X, Position Y, Heading]
  ]
*/
var levels = 
  [ //List of Levels [Level1[], Level2[],...]
    [ //Level 1 [Enemy1[],Enemy2[],...]
      [0,200,337.5,0] //Enemy 1 [Enemy Type, Position X, Position Y, Heading]
    ],
    [ //Level 2
      [0, 150, 150, 0], //Enemy 1
      [0, 1050, 525, 180]
    ],
    [ //Level 3
      [0,150,337.5,45],
      [0,600,100,135],
      [0,1050,337.5,225],
      [0,600,575,315]
    ]

  ];
currLevel = 0;

function setup() {
  createCanvas(1200, 675);
  p = createSprite(width / 2, height / 2, 25, 25);
  p.maxSpeed = MAX_SPEED;
  p.friction = FRICTION;
  //p.visible = false;
  //Missle Variables
  //Launcher Variables
  /*
  for (let i=0;i<3;i++)
  {
    l[i] = new Launcher(i);
    m[i] = new Missile(i);
  }
  */
  angleMode(DEGREES);
  drawLevel(0);
}

function drawLevel(level)
{
  //Clear out missile Sprites
  for (let j=0;j<m.length;j++)
  {
    if (typeof m[j] == "object")
    {
      m[j].sprite.remove();
    }
  }
  m = [];

  //Set Player Position
  p.position.x = width/2;
  p.position.y = height/2;

  for(let i=0;i<levels[level].length;i++)
  {
    let posX = levels[level][i][1];
    let posY = levels[level][i][2];
    let head = levels[level][i][3];
    if (levels[level][i][0] == 0)
    {
      l[i] = new Launcher(i,posX,posY,head);
      m[i] = new Missile(i);
    }
  }
}

function draw() {
  background(255);
  noStroke();

  //Draw Level
  /*
  fill(100);
  for (y=0;y<level.length;y++)
  {
    for (x=0;x<level[0].length;x++)
    {
      if (level[y][x] == 1)
      {
        
        rect(x*75,y*75,75,75);
      }
    }
  }
  */

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
      if (typeof m[i] == "object")
      {
        m[i].render();
        m[i].move();
        m[i].update();
      }
      else
      {
        if (typeof l[i] == "object")
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
      if (typeof l[i] == "object")
      {
        l[i].render();
      }
    }
  }

  

  drawSprites();
  fill(58,189,242);
  ellipse(p.position.x, p.position.y, 50, 50);

  //Level Changer
  if (l.length > 0)
  {
    let levelTest = false;
    for (let i = 0; i < l.length; i++) 
    {
      if (typeof l[i] == "object") 
      {
        levelTest = true;
      }
    }
    if (levelTest == false)
    {
      currLevel+=1;
      console.log(currLevel);
      if (currLevel > levels.length-1)
      {
        currLevel = 0;
      }
      drawLevel(currLevel);
    }
  }

  
}



