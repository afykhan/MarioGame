var bcg, bird, bee, insect, stone, turtle;
var robo, man, mario,mj,ground_run,win;
var bcgImage, birdImage, insectImage, stoneImage, turtleImage;
var roboImage, manImage, humanImage, winImage, gameOverImage,restartImage,flagImage,beeImage;

var gameState = "play";
var survivalTime=0;

var rs, gameOver;
var obstacleGroup;
var flag;
var stoneGroup,beeGroup;

function preload()
{
    bcgImage=loadImage("backgroundimage.jpg");

    beeImage=loadImage("beeimage.jpg");
    humanImage=loadImage("mariostandingimage.png");
    stoneImage=loadImage("stoneimage.jpg");
    
    restartImage=loadImage("resetbuttonimage.jpg");
    gameOverImage=loadImage("gameoverimage.jpg");
    
}

function setup() 
{
  
    createCanvas(windowWidth,windowHeight); 

    bcg = createSprite(10,width/2,width,height);
    bcg.addImage(bcgImage);
    bcg.velocityX = -4;

    mario = createSprite(30,400,10,10);
    mario.addImage("move",humanImage);
    mario.scale =0.5;
    mario.velocityX = 0.5;

    ground_run = createSprite(40,450,width,height-20);
    ground_run.visible = false;

    gameOver=createSprite(width/2,height/2);
    gameOver.addImage("over",gameOverImage);
    gameOver.scale=0.8;
    gameOver.visible = false;

    rs=createSprite(width/2,height/2);
    rs.addImage("reset",restartImage);
    rs.scale=1;
    rs.visible = false;

    stoneGroup = new Group();
    beeGroup = new Group();
  
}

function draw() 
{
  
  background(bcg);

  stroke("green");
  strokeWeight(3);
  fill("yellow")
  textSize(22);
  text("Mario's Survival Time:"+ survivalTime,50,80);
  
  if(gameState === "play")
     {       
      
       spawnBees();
      
       spawnStones();   
       
        survivalTime = survivalTime + 1; 
       
        if (bcg.x < 0)
            {
            bcg.x = bcg.width/2; 
            }
          
                if(keyDown("space"))
                  {
                    mario.velocityY = -10;          
                  }
                  
       mario.velocityY = mario.velocityY + 0.8; 
       
          if(stoneGroup.isTouching(mario))
              {
                gameState = "end";
              }
       }

  else if(gameState === "end")
     {
              bcg.velocityX = 0;
              stoneGroup.setLifetimeEach(0);
              mario.velocityX= 0;
              rs.visible = true;
              gameOver.visible = true;
            
  
  if(mousePressedOver(rs) && gameState === "end") 
           {
            gameState = "play";
            gameOver.visible = false;
            rs.visible = false;
            win.visible = false;
            bcg.velocityX = -4;
            survivalTime=0;
           }
          }     
  
  mario.collide(ground_run);
  drawSprites();
  
}

    function spawnBees()
    {
          if(frameCount % 150 === 0)
          {
            bee = createSprite(200,400,10,10);
            bee.addImage("bb",beeImage);
            bee.scale =0.3;
            bee.velocityX = -2;
            bee.lifetime = 150;
            beeGroup.add(bee);
          }
    }


          function spawnStones()
          {
                if(frameCount % 200 === 0)
                  {
                    stone = createSprite(400,450,10,10);
                    stone.addImage("stones",stoneImage);
                    stone.scale = 0.1;
                    stone.collide(ground_run);
                    stone.velocityX = -2;
                    stone.lifetime = 200;
                    stoneGroup.add(stone);
                  }
          }
