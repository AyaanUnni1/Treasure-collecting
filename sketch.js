var path,boy,cash,diamonds,jwellery,sword;
var pathImage,boyImage,cashImage,diamondsImage,jwelleryImage;

var swordImage;
var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImage = loadImage("Road.png");
  boyImage = loadAnimation("runner1.png","runner2.png");
  cashImage = loadImage("cash.png");
  diamondsImage = loadImage("diamonds.png");
  jwelleryImage = loadImage("jwell.png");
  swordImage = loadImage("sword.png");
  endImage =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImage);
path.velocityY = 4;


//learnt to use width , height etc in substitution class
boy = createSprite(300,550,20,20);
boy.addAnimation("SahilRunning",boyImage);
boy.scale=0.08;
  
gameOver = createSprite(windowWidth/2,300,50,10);  
gameOver.addAnimation("over",endImage);
gameOver.visible = false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

 if(gameState === PLAY){
  background(0);
  boy.x = World.mouseX;
 }
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(path.y > 700 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
  
  
    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }
      else if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }      
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
      
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();           
      
        gameOver.visible = true;
        
        boy.x = windowWidth/2;
           
        //i set their velocity to 0 but they still move...pls clear this doubt.
     
    }
      
    }
  drawSprites();
  textSize(20);
  fill("yellow");
  text("Treasure: "+ treasureCollection,width-150,30);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImage);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImage);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 180;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImage);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 180;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImage);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 180;
  swordGroup.add(sword);
  }
}
