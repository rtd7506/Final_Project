// Shoot Camp

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
    [ //Level 19
      [4,250,337.5,0],
      [0,1000,150,180],
      [0,1000,525,180]
    ],
    [ //Level 20
      [4,200,200,0],
      [4,1000,200,0],
      [3,200,475,0],
      [3,1000,475,0]
    ],
    [ //Level 21
      [1,200,200,0],
      [2,1000,200,180],
      [3,200,475,0],
      [4,1000,475,0]
    ],
    [ //Level 22: Intro to Moving Launchers
      [5,200,200,90,[200,1000],[200,200]]
    ],
    [ //Level 23
      [6,200,575,90,[200,600,1000],[575,100,575]]
    ],
    [ //Level 24
      [5,200,200,0,[200,200],[200,475]],
      [5,1000,475,180,[1000,1000],[475,200]]
    ],
    [ //Level 25
      [5,950,300,180,[950,1050],[300,300]],
      [5,1050,375,180,[950,1050],[375,375]],
      [6,1100,100,90,[1100,1100,100,100],[100,575,575,100]]
    ],
    [ //Level 26: Final
      [0,300,150,90],
      [1,600,150,90],
      [2,900,150,90],
      [3,300,525,-90],
      [4,900,525,-90],
      [5,100,200,0,[100,100],[200,575]],
      [6,1100,575,180,[1100,1100],[200,575]]
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
let checkpoints = [0,3,7,10,13,17,21,25]; //Stores all checkpoint levels
let lives = 3;
let phase = false;
let e = []; //List of explosions
screen = 0; //0 is Title Screen, 1 is Tutorial, 2 is Levels, 3 is Final Game Over
let printSpace = 0;
let printList = [];
let mainFont;
let tutLog = [
  "Welcome to Shoot Camp recruit!",
  "Here we will teach you how to fight enemies of all kinds.",
  "I will be your instructor: Sergeant Circle.",
  "First, let's discuss movement.",
  "Use the 'W', 'A', 'S', and 'D' keys to move to the yellow square.",
  "Great, now we can introduce enemies.",
  "This is Bob.",
  "Bob will help us demonstrate common enemy behaviors.",
  "Enemies shoot Missiles.",
  "Missiles track and try to home in on you.",
  "Use your movement to try not to get hit.",
  "To defeat enemies, you need to send their own missiles back at them.",
  "Use your tricky movement to redirect Bob's missile back at him.",
  "Great Job!",
  "Now you're ready for the field.",
  "There will be plenty of enemies out there, and they won't all be as nice as Bob.",
  "But just remember the essentials:",
  "Move, Dodge, and Destroy!"
]
let tutPlace = 0;
let printList2 = [];
let tutSquare = false;
let ghostMode = false;


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
let hurt_anim;
let phase_start_anim;
let hTimer = 0;
let hurt = false;
let title;

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
  title = loadImage('assets/title.png');
  mainFont = loadFont('assets/Gunplay.ttf');
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
  hurt_anim = loadAnimation('assets/anims/ghost/ghost17.png','assets/anims/ghost/ghost21.png');
  hurt_anim.frameDelay = 10;
  p.addAnimation('hurt',hurt_anim);
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
    let type = levels[level][i][0];
    if (type == 5 || type == 6)
    {
      let px = [];
      let py = [];
      for(let j=0;j<levels[level][i][4].length;j++)
      {
        px.push(levels[level][i][4][j]);
        py.push(levels[level][i][5][j]);
      }
      l[i] = new Launcher(i,posX,posY,head,type,px,py);
    }
    else
    {
      l[i] = new Launcher(i,posX,posY,head,type);
    }
    //if (levels[level][i][0] == 0)
    //{
    //m[i] = new Missile(i);
    
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

function getOutline(r,g,b,a)
{
  let res = color(r-40,g-40,b-40,a);
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
  if (hurt == false)
  {
    p.changeAnimation('move');
  }
  if (s_move.isPlaying() == false)
  {
    //s_move.play();
  }
}

function draw()
{
  if (ghostMode == true)
  {
    p.visible = true;
  }
  else
  {
    p.visible = false;
  }

  if (screen == 0)
  {
    titleScreen();
  }
  else if (screen == 1)
  {
    tutorialScreen();
  }
  else
  {
    gameScreen();
  }
}

function gameScreen() {
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
  if (keyWentDown("SPACE") && end == false)
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
  if (stopped == false)
  {
  //p Movement
    if (hurt == false)
    {
      p.changeAnimation('idle');
    }
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
      //p.changeAnimation('phase_start');
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
      if (l[i].sprite.removed == false)
      {
        l[i].render();
        if (stopped == false)
        {
          let clear = false;
          for(let j=0;j<m.length;j++)
          {
            if (l[i].sprite.removed == false)
            {
              if (m[j].id == l[i].id)
              {
                clear = true;
                //console.log(l[i].id)
              }
            }
          }
          if (l.length>0)
          {
            if (clear == false && l[i].mtype != 2 && l[i].sprite.removed == false)
            {
              m.push(new Missile(l[i].id));
              if (ghostMode == true)
              {
                s_shoot.play();
              }
              console.log("RESUP")
            }      
          }
          if (l[i].moving == true)
          {
            l[i].move();
          }
        }
      }
    }
  }

  //Explosion rendering
  if (e.length>0)
  {
    for (let i=0;i<e.length;i++)
    {
      e[i].render();
    }
  }  

  drawSprites();
  fill(58,189,242);
  stroke(getOutline(58,189,242));
  if (ghostMode == false)
  {
    ellipse(p.position.x, p.position.y, 50, 50);
  }

  drawHealth();
  
  //Level Changer
  if (l.length < 1)
  {
    currLevel+=1;
    //console.log(currLevel);
    if (currLevel > levels.length-1)
    {
      ghostMode = true;
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
    if (ghostMode == true)
    {
      s_start.play();
    }
  }
  if (startTimer == 0)
  {
    stopped = false;
  }
  //console.log(map(amp.getLevel(),0,1.0,10,100));
  //console.log(amp.getLevel());

  if (hurt == true)
  {
    hTimer += 1;
    console.log("HURT");
    p.changeAnimation('hurt');
    if (hTimer > 50)
    {
      hurt = false;
      hTimer = 0;
    }
  }

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
    textSize(15);
    text("Secret Codes: Type '0' to Restart, '1' for Level 1, '2' for Level 4, '3' for Level 8, '4' for Level 11, '5' for Level 14, '6' for Level 17, '7' for Level 22, '8' for Level 26, 'G' for Ghost Mode", width/2, height/2 + 300)
    stopped = true;
  }
  else
  {
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
    //s_wind.play();
  }
  if (screen == 0)
  {
    screen += 1;
  }
}

function titleScreen()
{
  image(title, 0,0);
  if (keyWentDown("SPACE"))
  {
    screen+=1;
  } 
}

function tutorialScreen()
{
  background(255);
  //stopped = false;

  //PLAYER MOVEMENT
  if (stopped == false)
  {
  //p Movement
    if (hurt == false)
    {
      p.changeAnimation('idle');
    }
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
    

    if (p.position.y < 17)
    {
      p.position.y = 17;
    }
    else if ( p.position.y > 450)
    {
      p.position.y = 450;
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

  if (tutSquare)
  {
    rectMode(CENTER);
    strokeWeight(10);
    fill(235,203,36, 100);//l[this.id].color;
    stroke(195,163,0,100);//l[this.id].outline;
    rect(200,height/2,100,100);
  }

  drawSprites();
  fill(58,189,242);
  stroke(getOutline(58,189,242));
  strokeWeight(5);
  if (ghostMode == false)
  {
    ellipse(p.position.x, p.position.y, 50, 50);
  }

  rectMode(CENTER);
  strokeWeight(15);
  fill(230,230,230);
  stroke(179,179,179);
  rect(width/2,550,1000,200);
  fill(250,250,250);
  rect(200,550,150,150);
  fill(69,219,78);
  stroke(getOutline(69,219,78));
  ellipse(200,555,110,110);
  noStroke();
  fill(0);
  print(tutLog[tutPlace]);

  if ((keyWentDown("SPACE") && !(tutPlace == 12 || tutPlace == 4)) || (tutSquare && dist(p.position.x,p.position.y,200,height/2) < 100))
  {
    
    printList = [];
    printList2 = [];
    printSpace = 0;
    tutPlace ++;
    
    if (tutPlace > tutLog.length-1)
    {
      stopped = true;
      currLevel = -1;
      screen++;
      console.log("NEXT");
    }
    //console.log(phase);
    //p.changeAnimation('phase_start');
  }

  if (tutPlace > 5 && l.length == 0)
  {

    if (tutPlace < 13)
    {
      printList = [];
      printList2 = [];
      printSpace = 0;
      tutPlace = 13;
    }
  }
  if (tutPlace == 0)
  {
    textSize(25);
    text("Press SPACE to advance", 830,610);
  }
  if (tutPlace == 3) 
  {
    stopped = false;
  }
  if (tutPlace == 4) 
  {
    tutSquare = true;
  }
  if (tutPlace == 5) 
  {
    tutSquare = false;
    l[0] = new Launcher(0, 1000, height / 2, 180, 0);
  }
  if (tutPlace > 7) {
    if (l.length > 0) {

      for (let i = 0; i < l.length; i++) {
        if (l[i].sprite.removed == false) {
          l[i].render();
          if (stopped == false) {
            let clear = false;
            for (let j = 0; j < m.length; j++) {

              if (l[i].sprite.removed == false) {
                if (m[j].id == l[i].id) {
                  clear = true;
                  //console.log(l[i].id)
                }
              }
            }
            if (l.length > 0) {
              if (clear == false && l[i].mtype != 2 && l[i].sprite.removed == false) {
                m.push(new Missile(l[i].id));
                //s_shoot.play();
                console.log("RESUP")
              }
            }
            if (l[i].moving == true) {
              l[i].move();
            }
          }
        }
      }
    }
    if (l.length > 0)
    {
      m[0].move();
      m[0].render();
      //m[0].launched = true;
      m[0].update();
      health = 5;
    }
    if (e.length>0)
    {
      for (let i=0;i<e.length;i++)
      {
        e[i].render();
      }
    }  
  }

  if (tutPlace > 5) 
  {
    if (l.length > 0)
    {
      l[0].render();
    }
  }
  

  
}

function print(input)
{
  if (printSpace<input.length && int(millis()) % 2 == 0)
  {
    if (printSpace > 43 || (tutPlace == 7 && printSpace > 41) || (tutPlace == 11 && printSpace > 41) || (tutPlace == 15 && printSpace > 42) || (tutPlace == 12 && printSpace > 42))
    {
      printList2.push(input[printSpace]);
    }
    else
    {
      printList.push(input[printSpace]);
    }
    printSpace+=1;
  }
  else
  {

  }
  textFont(mainFont);
  textSize(40);
  textAlign(LEFT,TOP);
  text(join(printList,""),325,480);
  text(join(printList2,""),325,525);
  
}

function keyPressed()
{
  if (paused == true && screen == 2)
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
    if (key == 7)
    {
      currLevel = 21;
      drawLevel(currLevel);
      console.log("22");
      paused = false;
    }
    if (key == 8)
    {
      currLevel = 25;
      drawLevel(currLevel);
      console.log("26");
      paused = false;
    }
    if (key == 'G')
    {
      ghostMode = true;
      paused = false;
    }
  }
}