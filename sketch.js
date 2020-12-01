var PLAY;
var END;
var gameState;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground,groundImage,invisibleGround;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  groundImage=loadImage("background.png");
  
  PLAY = 1;
  END = 0;
  gameState = 1;
  score=0;
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(100,570,20,50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.2;
  
  ground = createSprite(600,200,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.addImage(groundImage);
  ground.scale=1.5;
  ground.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
  invisibleGround = createSprite(300,580,600,10);
  invisibleGround.depth=ground.depth-1;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  var survivalTime=0;
}


function draw() {
  background("white");

    monkey.collide(invisibleGround);

  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 500) {
        monkey.velocityY = -13;
  }
  
    monkey.velocityY=monkey.velocityY+0.5;
    
    banana();
    obstacle();
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time : "+survivalTime, 100,50);
    
    stroke("white");
    textSize(20);
    fill("white");
    text("Score = "+score, 500,50);
    
    if(monkey.isTouching(FoodGroup)) {
      score = score+2;
      FoodGroup.destroyEach();
      
      switch(score) {
        case 10: monkey.scale=0.25;
                 break;
        case 20: monkey.scale=0.3;
                 break;
        case 30: monkey.scale=0.35;
                 break;
        case 40: monkey.scale=0.4;
                 break;
      }
    }
  
    if(monkey.isTouching(obstacleGroup)) {
      monkey.scale=0.2;
    }
 
  drawSprites();
}

function banana (){
  
 if(World.frameCount%80===0){ 
var banana=createSprite(600,300,20,20);
 banana.addImage(bananaImage);
 banana.scale=0.1
 banana.y=Math.round(random(330,430)); 
 banana.velocityX=-4;
 banana.setlifetime=410;
   
 FoodGroup.add(banana);  
}
}

function obstacle () {
 if(World.frameCount%300===0){ 
var obstacle=createSprite(600,530,20,20);
 obstacle.addImage(obstaceImage);
 obstacle.scale=0.2;
 obstacle.y=530;  
 obstacle.x=Math.round(random(500,600)); 
 obstacle.velocityX=-4;
 obstacle.setlifetime=1;
   
obstacleGroup.add(obstacle);  
}
}