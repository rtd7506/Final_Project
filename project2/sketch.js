//p Variables
let p; //p
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
    [ //Level 4: Introduce Aiming Launcher
      [1,950,525,180]
    ],
    [ //Level 5
      [0,150,150,225],
      [0,1050,150,315],
      [0,1050,525,45],
      [1,150,525,0]
    ],
    [ //Level 6
      [1,400,150,0],
      [1,800,150,0],
      [1,600,525,0]
    ],
    [ //Level 7
      [1,150,137.5,0],
      [1,150,337.5,0],
      [1,150,537.5,0]
    ],
    [ //Level 8: Introduce Boosted Launcher
      [2,200,475,0]
    ],
    [ //Level 9
      [2,200,100,0],
      [2,200,575,0],
      [1,1000,200,0],
      [1,1000,475,0]
    ],
    [ //Level 10
      [0,100,100,90],
      [0,300,100,90],
      [0,500,100,90],
      [0,700,100,90],
      [0,900,100,90],
      [0,1100,100,90]
    ],
    [ //Level 11: Intro to Connected Launchers
      [2,200,200,90],
      [0,262.5,200,0],
      [2,1000,475,270],
      [0,937.5,475,180]
    ],
    [ //Level 12
      [2,150,312.5,270],
      [2,150,375,90],
      [0,212.5,312.5,270],
      [0,212.5,375,90],
      [1,1000,337.5,180]
    ],
    [//Level 13
      [0,900,100,180],
      [0,900,200,180],
      [0,900,300,180],
      [0,900,400,180],
      [0,900,500,180],
      [0,900,600,180],
      [1,1100,337.5,180]
    ],
    [ //Level 14: Intro to Stutter Launchers
      [3,1000,200,180]
    ],
    [ //Level 15
      [3,200,200,0],
      [3,1000,200,0]
    ],
    [ //Level 16
      [3,150,150,0],
      [2,150,525,0],
      [3,1050,525,0],
      [2,1050,150,180]
    ],
    [ //Level 17
      [3,200,200,0],
      [3,200,337.5,0],
      [3,200,475,0],
      [1,1000,200,0],
      [1,1000,337.5,0],
      [1,1000,475,0]
    ],
    [ //Level 18: Intro to Multi Launchers
      [4,200,200,0]
    ],
    [
      [4,250,337.5,0],
      [0,1000,150,180],
      [0,1000,525,180]
    ],
    [
      [4,200,200,0],
      [4,1000,200,0],
      [3,200,475,0],
      [3,1000,475,0]
    ],
    [
      [1,200,200,0],
      [2,1000,200,180],
      [3,200,475,0],
      [4,1000,475,0]
    ]
  ];
let currLevel = 0;//11;//0;
let startTimer = 180;
let stopped = true;
let end = false;
let paused = false;
let storedSpeed = []; //Stores the speeds of missiles while paused
let storedDir = []; //Stores the directions of missiles while paused
let currCheckpoint; // Stores the Current Checkpoint Level
let checkpoints = [0,3,7,10,13,17]; //Stores all checkpoint levels
let lives = 3;
let phase = false;

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

//Images
let spritesheet;
let spritedata;
let idle_anim;
let move_anim;
let phase_start_anim;

function preload()
{
  s_shoot = loadSound("assets/s_shoot.wav");
  s_explode = loadSound("assets/s_explode.wav");
  s_hurt = loadSound("assets/s_hurt.wav");
  s_start = loadSound("assets/s_start.wav");
  s_wind = loadSound("assets/s_wind.wav");
  s_wind2 = loadSound("assets/s_wind2.wav");
  s_move = loadSound("assets/s_move.wav");
  spritedata = loadJSON('sprites_2.json');
  spritesheet = loadImage('assets/ghost_idle.png');//ghost2_sheet.png');
}


function setup() {
  createCanvas(1200, 675);
  p = createSprite(width / 2, height / 2, 25, 25);
  p.maxSpeed = MAX_SPEED;
  p.friction = FRICTION;

  //Animations
  idle_anim = loadAnimation('assets/anims/ghost/ghost1.png','assets/anims/ghost/ghost4.png');
  idle_anim.frameDelay = 10;
  p.addAnimation('idle',idle_anim);
  move_anim = loadAnimation('assets/anims/ghost/ghost5.png','assets/anims/ghost/ghost8.png');
  move_anim.frameDelay = 10;
  p.addAnimation('move',move_anim);
  phase_start_anim = loadAnimation('assets/anims/ghost/ghost9.png','assets/anims/ghost/ghost12.png');
  phase_start_anim.frameDelay = 10;
  p.addAnimation('phase_start',phase_start_anim);

  p.visible = false;
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
  drawLevel(currLevel);
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
  
  //Set p Position
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
    //s_shoot.play();
    //}
  }
  s_wind.stop();
  startTimer = 180;

  for(let i=0;i<checkpoints.length;i++)
  {
    if (currLevel == checkpoints[i])
    {
      currCheckpoint = currLevel;
    }
  }
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
  stroke(50,0,0);
  line(0,17.5,width,17.5);
  stroke(225,0,0);
  
  let actualHealth = health*width/5;
  if (actualHealth<shownHealth)
  {
    shownHealth-=10;
  }
  line(0,17.5,shownHealth,17.5);
}

function step()
{
  p.changeAnimation('move');
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
  if (keyWentDown(ESCAPE) && end == false)
  {
    if (paused == false)
    {
      
      p.setSpeed(0.0001);
      for(let i=0;i<m.length;i++)
      {
        if (typeof m[i] == "object")
        {
          angleMode(DEGREES);
          storedSpeed[i] = m[i].sprite.getSpeed();
          storedDir[i] = m[i].sprite.getDirection();
          //console.log(storedSpeed[i]);
          m[i].sprite.setSpeed(0.0001);//, m[i].sprite.velocity.heading());//, m[i].sprite.rotation);//,storedDir[i]);//velocity.mult(0);//setMag(0); //mult(0);//
          
          //console.log("DIR = "+ storedDir[i]);
          //console.log("ROT = " + m[i].sprite.velocity.heading());
          //console.log(m[i].sprite.getSpeed());
        }
      }
      paused = true;
      stopped = true;
    }
    else
    {
      console.log("UNPAUSE");
      for(let i=0;i<m.length;i++)
      {
        if (typeof m[i] == "object")
        {
          m[i].sprite.setSpeed(storedSpeed[i],storedDir[i]);// = createVector(,,storedSpeed[i].z);
          //console.log(storedSpeed[i]);
          //console.log(m[i].sprite.velocity);
        }
      }
      paused = false;
      stopped = false;
      
    }
  }
  if (currLevel == 0)
  {
    noStroke();
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(30);
    text("Controls: WASD to Move", width/2,height/2 + 175);
  }
  if (stopped == false)
  {
  //p Movement
    p.changeAnimation('idle');
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
      p.mirrorX(1);
      p.velocity.x += -1 * ACCELERATION;
      step();

    }
    if (keyDown("d")) {
      //p.velocity.x = 5;
      p.mirrorX(-1);
      p.velocity.x += ACCELERATION;
      step();
    }
    if (keyWentDown("SPACE"))
    {
      phase = true;
      //console.log(phase);
      p.changeAnimation('phase_start');
    }

    if (p.position.y < 17)
    {
      p.position.y = 17;
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
    //console.log(p.maxSpeed);
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
        if (stopped == false)
        {
          let clear = false;
          for(let j=0;j<m.length;j++)
          {
            if (m[j].id == l[i].id)
            {
              clear = true;
              console.log(l[i].id)
            }
          }
          if (clear == false && l[i].mtype!= 2)
          {
            m.push(new Missile(l[i].id));
            s_shoot.play();
            console.log("RESUP")
          }      
        }
      }
    }
  }

  

  drawSprites();
  fill(58,189,242);
  stroke(getOutline(58,189,242));
  ellipse(p.position.x, p.position.y, 50, 50);

  drawHealth();
  
  //Level Changer
  if (l.length < 1)
  {
    currLevel+=1;
    //console.log(currLevel);
    if (currLevel > levels.length-1)
    {
      currLevel = 0;
    }
    drawLevel(currLevel);
  }

  if (startTimer > 0)
  {
    startTimer -= 1;
    stopped = true;
    p.position.x = width/2;
    p.position.y = height/2;
    
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    textSize(45);
    let dispLevel = currLevel+1;
    text("Level "+ dispLevel, width/2,height/2-175)
    textSize(30);
    text(round(map(startTimer,0,180,0.5,3.5)),width/2,height/2);
    //console.log(round(map(startTimer,0,180,0.5,3.5)));
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
    if (lives == 1)
    {
      currCheckpoint = 0;
      text("Press SPACE to restart", width/2, height/2 + 75);
      text("You ran out of Lives", width/2, height/2 + 125);
    }
    else
    {
      text("Press SPACE to restart at the checkpoint", width/2, height/2 + 75);
      text("You have "+lives+" Lives", width/2, height/2 + 125);
    }
    
    for(let i=0;i<m.length;i++)
    {
      if (typeof m[i] == "object")
      {
        m[i].sprite.setSpeed(0.0001);
      }
    }
    if (keyDown("SPACE") && paused == false)
    {
      lives -= 1;
      health = 5;
      shownHealth = width;
      end = false;
      console.log("START IT UP");
      currLevel = currCheckpoint;
      drawLevel(currLevel);
      console.log(health);
      if (lives == 0)
      {
        lives = 3;
      }
    }
  }

  if (paused == true)
  {
    noStroke();
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(60);
    text("PAUSED", width/2,height/2);
    textSize(30);
    text("Press SPACE to resume", width/2, height/2 + 75);
    text("You have "+lives+" Lives", width/2, height/2 + 125);
    textSize(20);
    text("Debug: Type '0' to Restart, '1' for Level 1, '2' for Level 4, '3' for Level 8, '4' for Level 11, '5' for Level 14", width/2, height/2 + 300)
    stopped = true;
  }
  else
  {
    console.log(m);
    console.log(l);
  }

  noFill();
  stroke(230);
  strokeWeight(15);
  rect(0,0,width,height); //Draw whole outline
}

function mousePressed()
{
  console.log("TEST");
  if (s_wind.isPlaying() == false)
  {
    s_wind.play();
  }
}

function keyPressed()
{
  if (paused == true)
  {
    if (key === "0")
    {
      health = 5;
      shownHealth = width;
      end = false;
      console.log("START IT UP");
      currLevel = 0;
      drawLevel(0);
      paused = false;
    }
    //console.log("1");
    if (key == 1)
    {
      currLevel = 0;
      drawLevel(currLevel);
      console.log("1");
      paused = false;
    }
    if (key == 2)
    {
      currLevel = 3;
      drawLevel(currLevel);
      console.log("4");
      paused = false;
    }
    if (key == 3)
    {
      currLevel = 7;
      drawLevel(currLevel);
      console.log("8");
      paused = false;
    }
    if (key == 4)
    {
      currLevel = 10;
      drawLevel(currLevel);
      console.log("11");
      paused = false;
    }
    if (key == 5)
    {
      currLevel = 13;
      drawLevel(currLevel);
      console.log("14");
      paused = false;
    }
    if (key == 6)
    {
      currLevel = 17;
      drawLevel(currLevel);
      console.log("18");
      paused = false;
    }
  }
}