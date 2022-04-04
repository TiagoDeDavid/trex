var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restart, gameOver;

var restartimg, gameOverimg;

var jump;
var die;
var check;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartimg = loadImage ("restart.png");
  gameOverimg = loadImage ("gameOver.png");
  
  jump = loadSound ("jump.mp3");
  die = loadSound ("die.mp3");
  check = loadSound ("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  restart = createSprite (300, 120, 30, 30);
  restart.addImage(restartimg);
  restart.scale = 0.7;

  gameOver = createSprite (300, 80, 30, 30);
  gameOver.addImage (gameOverimg);
  gameOver.scale = 0.7;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //criar os Grupos de Obstáculos e Nuvens
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  score = 0
}

function draw() {
  background(180);


  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
   
    ground.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    
    
    }
    
    if (mousePressedOver (restart)){

      reset();

    }

    if(keyDown("space")&& trex.y >=150) {
        
      trex.velocityY = -13;

      jump.play();
      
    }
    
    if (score % 200 == 0){

      check.play();
    }

    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        
      gameState = END;

      die.play();
    }
  }
   else if (gameState === END) {
      
     ground.velocityX = 0;

     trex.changeAnimation ("collided");

     obstaclesGroup.setVelocityXEach(0);

     cloudsGroup.setVelocityXEach(0);

     cloudsGroup.setLifetimeEach (-1);

     obstaclesGroup.setLifetimeEach (-1);

     restart.addImage(restartimg);

     gameOver.addImage(gameOverimg);

    }
  
    trex.collide(invisibleGround);
  
    drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;S
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //escreva o código aqui para gerar nuvens
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribuir tempo de vida à variável
    cloud.lifetime = 134;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicionar nuvens ao grupo
   cloudsGroup.add(cloud);
    }
}

function reset(){

  gameState = PLAY;
  
  obstaclesGroup.detroyEach();
  cloudsGroup.detroyEach();

}
