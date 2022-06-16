const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var blackH1, blackH2, blackH3, blackH4;
var blackH1Img, blackH2Img, blackH3Img, blackH4Img;
var PC;
var bullet, missile, bulletLeftImg, bulletRightImg, missileImg;
var PCImg, ball1Img, ball2Img;
var backgroundImg;

var HealthBar, Health0Img, Health1Img, Health2Img, Health3Img, Health4Img, Health5Img;

var coins = 0;
var health = 5;

var ballR, ballL, ballA, ballB;
var ballGroup

var gameState = 0;

function preload(){

  blackH1Img = loadImage("blackhole1.png");
  blackH2Img = loadImage("blackhole2.png");
  blackH3Img = loadImage("blackhole3.png");
  blackH4Img = loadImage("blackhole4.png");

  PCImg = loadImage("PC.png");

  bulletLeftImg = loadImage("bulletLeft.png");
  bulletRightImg = loadImage("bulletRight.png");
  missileImg = loadImage("missile.png");
  
  ball1Img = loadImage("ball1.png");
  ball2Img = loadImage("ball2.png");

  backgroundImg = loadImage("background.webp");

  PCImg = loadImage("PC UFO.png");

  Health0Img = loadImage("Health0.png");
  Health1Img = loadImage("Health1.png");
  Health2Img = loadImage("Health2.png");
  Health3Img = loadImage("Health3.png");
  Health4Img = loadImage("Health4.png");
  Health5Img = loadImage("Health5.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  edges=createEdgeSprites();


  blackH1 = createSprite(windowWidth-100,windowHeight-(windowHeight-100),10,10);
  blackH1.addImage(blackH1Img, "blackhole1Image");
  blackH1.scale = 0.3;
  blackH1.debug = true;

  blackH2 = createSprite(windowWidth-100,windowHeight-100,10,10);
  blackH2.addImage(blackH2Img,"blackhole2Image");
  blackH2.scale = 0.3;
  blackH2.debug = true;

  blackH3 = createSprite(windowWidth-(windowWidth-100),windowHeight-(windowHeight-600),10,10);
  blackH3.addImage(blackH3Img,"blackhole3Image");
  blackH3.scale = 0.3;
  blackH3.debug = true;

  blackH4 = createSprite(windowWidth-(windowWidth-100),windowHeight-(windowHeight-100),10,10);
  blackH4.addImage(blackH4Img,"blackhole4Image");
  blackH4.scale = 0.3;
  blackH4.debug = true

  PC = createSprite(windowWidth-(0.5*windowWidth), windowHeight-(0.5*windowHeight),100,100);
  PC.addImage(PCImg, "playingCharaterImage");
  PC.scale = 0.35;
  PC.setCollider("rectangle", 0, 0, 400, 200, 0);
  PC.debug = true;

  ballGroup = new Group();

  coins = 0;
  health = 5;
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  PC.bounceOff(edges);
  

    /*fill ("blue");
    textSize(17);
    text("Press 'P' to start playing",450, windowHeight-(windowHeight-250));*/



  //if(gameState===1){
  //PC.bounceOff(edges);
  //PC.bounciness = 0.5;


PC.rotateToDirection = true;


if(PC.collide(blackH1)||PC.collide(blackH2)||PC.collide(blackH3)||PC.collide(blackH4)){
  PC.destroy();
  PC.visible = false;
}

if(mousePressedOver(blackH1)){
  blackH1.destroy();
}
if(mousePressedOver(blackH2)){
  blackH2.destroy();
}
if(mousePressedOver(blackH3)){
  blackH3.destroy();
}
if(mousePressedOver(blackH4)){
  blackH4.destroy();
}

  /*if(keyDown("SPACE")){
    bullet = createSprite(windowWidth-(0.5*windowWidth), windowHeight-(0.5*windowHeight),5,5);
    bullet.addImage(bulletImg, "bulletImage");
    bullet.scale = 0.4;
    bullet.lifetime = 38;
    bullet.bounceOff(edges);
    bullet.bounciness = 0.5
  }*/
  
  if(PC.visible===true){
    // to make the PC shoot bullets from left
  if(keyWentDown(37)){
    bullet = createSprite(PC.x-100, PC.y, 10, 10);
    bullet.addImage(bulletLeftImg,"bulletLfromPCImage");
    bullet.setVelocity(-10,0);
    bullet.scale = 0.25;
    if(bullet.collide(ballGroup)){
      bullet.destroy();
      coins = coins+1;
    }
  }

  // to make the PC shoot bullets from right
  if(keyWentDown(39)){
    bullet = createSprite(PC.x+100, PC.y, 10, 10);
    bullet.addImage(bulletRightImg,"bulletRfromPCImage");
    bullet.setVelocity(+10,0);
    bullet.scale = 0.25;
    if(bullet.collide(ballGroup)){
      bullet.destroy();
      coins = coins+1;
    }
  }
  }

/*if(bullet.isTouching(ballR)){
    ballR.destroy();
    score = score+1;
  }*/

  if(PC.collide(ballGroup)){
    health = health-1;
    console.log(health);
    ballGroup.destroyEach();
  }

  
  if(health===4){
    HealthBar.changeAnimation(Health4Img, "only4hearts");
  }
  if(health===3){
    HealthBar.changeAnimation(Health3Img, "only3hearts");
  }

  if(health===2){
    HealthBar.changeAnimation(Health2Img, "only2hearts");
  }

  if(health===1){
    HealthBar.changeAnimation(Health1Img, "only1hearts");
  }

  if(health===0){
    HealthBar.changeAnimation(Health0Img, "0hearts");
  }

  if(health===0){
    PC.destroy();
    PC.visible = false;
  }


  if(PC.visible === false){
    var gameState = 2;
  }

  if(gameState===2){
    background("Black");
    fill("red");
    textSize(20);
    text("THE END",windowWidth-(windowWidth/2), windowHeight-(windowHeight/2));
  }

  spawnBallsRight();
  spawnBallsLeft();
  spawnBallsBelow();
  spawnBallsAbove();

  windowResized();
  PCMovement();

  showHealthBar();
  showCoins();

  drawSprites();
}


// to spawn the balls/NPC/obstacles from the right border of the canvas
function spawnBallsRight() {
  if(frameCount % 65 === 0) {
    ballR = createSprite(random(windowWidth+15, windowWidth), random(windowHeight-(windowHeight/2+30), windowHeight-(windowHeight/2-30)),10,40);
    //ball.velocityX = -(6 + 3*score/100);
    ballR.setVelocity(random(-6,-12), random(-1,1));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ballR.addImage(ball1Img);
              break;
      case 2: ballR.addImage(ball2Img);
              break;
      default: break;
    }

    ballR.debug = true;
    ballR.scale = 0.25;
    ballR.lifetime = 150;
    ballGroup.add(ballR);
  }
}

// to spawn the balls/NPC/obstacles from the left border of the canvas
function spawnBallsLeft() {
  if(frameCount % 85 === 0) {
    ballL = createSprite(random(windowWidth-(windowWidth-15), windowWidth-windowWidth), random(windowHeight-(windowHeight/2+30), windowHeight-(windowHeight/2-30)),10,40);
    //ball.velocityX = -(6 + 3*score/100);
    ballL.setVelocity(random(6,12), random(-1,1));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ballL.addImage(ball1Img);
              break;
      case 2: ballL.addImage(ball2Img);
              break;
      default: break;
    }
    ballL.debug = true;
    ballL.scale = 0.25;
    ballL.lifetime = 150;
    ballGroup.add(ballL);
  }
}

// to spawn the balls/NPC/obstacles from the bottom border of the canvas
function spawnBallsBelow() {
  if(frameCount % 75 === 0) {
    ballB = createSprite(random(windowWidth-(windowWidth/2-150), windowWidth-(windowWidth/2+150)), random(windowHeight+15, windowHeight),10,40);
    //ball.velocityX = -(6 + 3*score/100);
    ballB.setVelocity(random(-6,6), random(-8,-12));


    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ballB.addImage(ball1Img);
              break;
      case 2: ballB.addImage(ball2Img);
              break;
      default: break;
    }
    ballB.debug = true;
    ballB.scale = 0.25;
    ballB.lifetime = 150;
    ballGroup.add(ballB);
  }
}

// to spawn the balls/NPC/obstacles from the top border of the canvas
function spawnBallsAbove() {
  if(frameCount % 105 === 0) {
    var ballA = createSprite(random(windowWidth-(windowWidth/2-150), windowWidth-(windowWidth/2+150)), random(windowHeight-(windowHeight-15), windowHeight-windowHeight),10,40);
    //ball.velocityX = -(6 + 3*score/100);
    ballA.setVelocity(random(-6,6), random(8,12));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ballA.addImage(ball1Img);
              break;
      case 2: ballA.addImage(ball2Img);
              break;
      default: break;
    }
    ballA.debug = true;
    ballA.scale = 0.25;
    ballA.lifetime = 150;
    ballGroup.add(ballA);
  }
}

// a function to resize the window when for example inspect is opened in the browser
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundImg);

  blackH1.x = windowWidth-100;
  blackH1.y = windowHeight-(windowHeight-100);

  blackH2.x = windowWidth-100;
  blackH2.y = windowHeight-100

  blackH3.x = windowWidth-(windowWidth-100);
  blackH3.y = windowHeight-(windowHeight-600);

  blackH4.x = windowWidth-(windowWidth-100);
  blackH4.y = windowHeight-(windowHeight-100);

  edges=createEdgeSprites();

  fill ("red");
  textSize(10);
  text("RULES",windowWidth-(windowWidth-700),windowHeight-(windowHeight-50));
  
  fill ("white");
  textSize(8);
  text("PRESS THE LEFT AND RIGHT ARROW KEYS TO FIRE LASERS", windowWidth-(windowWidth/2+150), windowHeight-(windowHeight-75));

  fill ("white");
  textSize(8);
  text("PRESS THE SHIFT KEY FIRST AND THEN YOUR PREFERRED DIRECTION KEYS (W,A,S,D) TO INCRESE YOUR SPEED", windowWidth-(windowWidth/2+150) , windowHeight-(windowHeight-85));

  fill ("white");
  textSize(8);
  text("DO NOT TOUCH THE GUNS OR YOUR SPACESHIP WILL GET DESTROYED", windowWidth-(windowWidth/2+150), windowHeight-(windowHeight-95));

}



// a function to move the playing charater
function PCMovement(){
  if(keyWentDown(65)){
    PC.velocityX = PC.velocityX-8;
    if(keyDown(16)){
      PC.velocityX = PC.velocityX-14;
    }
  }
  if(keyWentUp(65)){
    PC.velocityX = 0;
  }
  
  if(keyWentDown(87)){
    PC.velocityY = PC.velocityY-8;
    if(keyDown(16)){
      PC.velocityY = PC.velocityY-14;
    }
  }
  if(keyWentUp(87)){
    PC.velocityY = 0;
  }
  
  if(keyWentDown(68)){
    PC.velocityX = PC.velocityX+8;
    if(keyDown(16)){
      PC.velocityX = PC.velocityX+14;
    }
  }
  if(keyWentUp(68)){
    PC.velocityX = 0;
  }
  
  if(keyWentDown(83)){
    PC.velocityY = PC.velocityY+8;
    if(keyDown(16)){
      PC.velocityY = PC.velocityY+14;
    }
  }
  if(keyWentUp(83)){
    PC.velocityY = 0;
  }
}

function showHealthBar(){
  HealthBar = createSprite(windowWidth-(windowWidth-350), windowHeight-(windowHeight-50),10,10);
  HealthBar.addImage(Health5Img, "fullhealth");
  HealthBar.scale = 0.18;
  
  if(health===4){
    HealthBar.addImage(Health4Img, "healthbarwith4hearts");
  }

  if(health===3){
    HealthBar.addImage(Health3Img, "healthbarwith3hearts");
  }

  if(health===2){
    HealthBar.addImage(Health2Img, "healthbarwith2hearts");
  }

  if(health===1){
    HealthBar.addImage(Health1Img, "healthbarwith1heart");
  }

  if(health===0){
    HealthBar.addImage(Health0Img, "healthbarwith0hearts");
  }
  

}

function showCoins(){
  textSize(15);
  fill("gold");
  text("Coins:"+coins, windowWidth-(windowWidth-350), windowHeight-(windowHeight-100));
}