//Player Variables
let p; //player
let MAX_SPEED = 5;
let ACCELERATION = 1;
let FRICTION = 0.1;
let health = 5;
let shownHealth = 0;

//Missles
let m = [];
//Launchers
let l = [];
// Original Levels System
// 0 = Empty Space 
// 1 = Wall
// Setup = level[y][x]
/*
let level = [
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
let level = [
  [Enemy Type, Position X, Position Y, Heading]
  ]
*/
let levels = 
  [ //List of Levels [Level1[], Level2[],...]
    [ //Level 1 [Enemy1[],Enemy2[],...]
      [0,200,200,0] //Enemy 1 [Enemy Type, Position X, Position Y, Heading]
    ],
    [ //Level 2
      [0, 150, 150, 0], //Enemy 1
      [0, 1050, 525, 180]
    ],
    [ //Level 3
      [0,150,150,0],
      [0,150,525,0],
      [0,1050,337.5,180],
    ],
    [ //Level 4
      [1,950,525,180]
    ]

  ];
let currLevel = 0;
let startTimer = 180;
let stopped = true;
let end = false;

//Sounds
let s_shoot;
let s_explode;
let s_hurt;
let s_start;
let s_end;
let s_move;
let s_wind;
let s_wind2;

//let mic;
//let amp;

function preload()
{
  s_shoot = loadSound("assets/s_shoot.wav");
  s_explode  = loadSound("assets/s_explode.wav");
  s_hurt  = loadSound("assets/s_hurt.wav");
  s_start  = loadSound("assets/s_start.wav");
  s_wind  = loadSound("assets/s_wind.wav");
  s_wind2 = loadSound("assets/s_wind2.wav");
  s_move  = loadSound("assets/s_move.wav");
}


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
  shownHealth = width;
  //mic = new p5.AudioIn();
  //mic.start();
  //amp = new p5.Amplitude();
 // amp.setInput(mic);
 
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

  for (let j=0;j<m.length;j++)
  {
    if (typeof l[j] == "object")
    {
      l[j].sprite.remove();
    }
  }
  l = [];
  
  //Set Player Position
  p.position.x = width/2;
  p.position.y = height/2;

  for(let i=0;i<levels[level].length;i++)
  {
    let posX = levels[level][i][1];
    let posY = levels[level][i][2];
    let head = levels[level][i][3];
    let type = levels[level][i][0]
    //if (levels[level][i][0] == 0)
    //{
    l[i] = new Launcher(i,posX,posY,head,type);
    //m[i] = new Missile(i);
    m[i] = "None";
    //s_shoot.play();
    //}
  }
  s_wind.stop();
  startTimer = 180;
}

function getOutline(r,g,b)
{
  let res = color(r-40,g-40,b-40);
  //console.log(res);
  return res;
  //return 0;
}

function drawHealth()
{
  strokeWeight(20);
  stroke(0);
  line(0,20,width,20);
  stroke(225,0,0);
  
  let actualHealth = health*width/5;
  if (actualHealth<shownHealth)
  {
    shownHealth-=10;
  }
  line(0,20,shownHealth,20);
}

function step()
{
  if (s_move.isPlaying() == false)
  {
    //s_move.play();
  }
}

function draw() {
  background(255);
  strokeWeight(5);

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

  

  if (stopped == false)
  {
  //Player Movement
    if (keyDown("w")) {
      //p.velocity.y = -5;
      p.velocity.y += -1 * ACCELERATION;
      step();
    }
    if (keyDown("s")) {
      //p.velocity.y = 5;
      p.velocity.y += ACCELERATION;
      step();

    }
    if (keyDown("a")) {
      //p.velocity.x = -5;
      p.velocity.x += -1 * ACCELERATION;
      step();

    }
    if (keyDown("d")) {
      //p.velocity.x = 5;
      p.velocity.x += ACCELERATION;
      step();
    }

    if (p.position.y < 0)
    {
      p.position.y = 0;
    }
    else if ( p.position.y > height)
    {
      p.position.y = height;
    }
    if (p.position.x < 0)
    {
      p.position.x = 0;
    }
    else if ( p.position.x > width)
    {
      p.position.x = width;
    }
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
        if (stopped == false)
        {
          m[i].move();
          m[i].update();
        }
      }
      else
      {
        if (typeof l[i] == "object")
        {
          if (stopped == false)
          {
            m[i] = new Missile(i);
            s_shoot.play();
            console.log("RESUP")
          }
          
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
  stroke(getOutline(58,189,242));
  ellipse(p.position.x, p.position.y, 50, 50);

  drawHealth();

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
      //console.log(currLevel);
      if (currLevel > levels.length-1)
      {
        currLevel = 0;
      }
      drawLevel(currLevel);
    }
  }

  if (startTimer > 0)
  {
    startTimer -= 1;
    stopped = true;
    p.position.x = width/2;
    p.position.y = height/2;
    textSize(30);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    text(round(map(startTimer,0,180,0.5,3.5)),width/2,height/2);
    console.log(round(map(startTimer,0,180,0.5,3.5)));
  }
  if (startTimer == 10)
  {
    s_start.play();
  }
  if (startTimer == 0)
  {
    stopped = false;
  }
  //console.log(map(amp.getLevel(),0,1.0,10,100));
  //console.log(amp.getLevel());
  if (health<1)
  {
    stopped = true;
    end = true;
  }

  if (end == true)
  {
    noStroke();
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(60);
    text("GAME OVER", width/2,height/2);
    textSize(30);
    text("Press SPACE to restart", width/2, height/2 + 75);
    if (keyDown("SPACE"))
    {
      
      health = 5;
      shownHealth = width;
      end = false;
      console.log("START IT UP");
      currLevel = 0;
      drawLevel(0);
      console.log(health);
    }
  }
}

function mousePressed()
{
  console.log("TEST");
  if (s_wind.isPlaying() == false)
  {
    s_wind.play();
  }
}