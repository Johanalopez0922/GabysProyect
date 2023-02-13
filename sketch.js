var fond, fondImg, invisibleGround, fondEnd1Img;
var end, end1Img, end2Img, end4Img, end5Img, end6Img;
//
var dog, dogRunning, dogCollided;
//
var win, win1Img, win2Img, win3Img, win4Img, win5Img, win6Img, win7Img, win8Img;
//
var gamerestart, gamerestartImg;
//
var endGroup, winGroup;
//
var score, scoreT;
//
var winSound, endSound, jumpSound;
//
var START = 0; 
var PLAY = 1;
var END = 2;
var gameState = START;

function preload(){
     fondImg = loadAnimation("fondi.jpg");
     fondEnd1Img = loadAnimation("fondo 1.jpg");
     //
     end1Img = loadImage("end 1.png");
     end2Img = loadImage("end 2.png");
     end4Img = loadImage("end 4.png");
     end5Img = loadImage("end 5.png");
     end6Img = loadImage("end 6.png");
     //
     dogRunning = loadAnimation("run 1.png", "run 2.png", "run 2.png");
     dogCollided = loadAnimation("o1.png");
     //
     win1Img = loadImage("1.png");
     win2Img = loadImage("2.png");
     win3Img = loadImage("3.png");
     win4Img = loadImage("4.png");
     win5Img = loadImage("5.png");
     win6Img = loadImage("6.png");
     win7Img = loadImage("7.png");
     win8Img = loadImage("8.png");
     //
     gameResartImg = loadImage("restart.png");
     //
     winSound = loadSound("win.wav");
     endSound = loadSound("collided.wav");
     jumpSound = loadSound("jump.wav");
}

function setup() {
     createCanvas(windowWidth, windowHeight);     //
     invisibleGround = createSprite(width/2,height-100,width,25);
     invisibleGround.visible = true;
     
     //
     score = 150;
     scoreT = 0;
     //
     
     fond = createSprite(width/2,height/2,windowWidth, windowHeight);
     fond.addAnimation("Play",fondImg);
     fond.addAnimation("End", fondEnd1Img);
     // Solo recibe un parámetro y deberá ser decimal
     fond.scale = (windowWidth/600);
    
     // cambiar posicion en x ancho y alto por los siguientes numeros
     dog = createSprite(width/14,0,windowWidth-80,windowHeight-50);    
     dog.addAnimation("running", dogRunning);
     dog.addAnimation("collided", dogCollided);
     dog.setCollider("circle",25,0,130);
     dog.scale = 0.35;
     //
     gamerestart = createSprite(width-100,height/2,400,10);
     gamerestart.addImage("gameResart", gameResartImg);
     gamerestart.scale = 0.5;
     //
     endGroup = new Group();
     winGroup = new Group();
}

function draw() {
     background("white");
     drawSprites();

     if(gameState === START){
          gamerestart.visible = false;
          //textSize solo recibe un argumento y es un número, lo dejé en width/40 :) 
          //recuerda que es para asignar un tamaño a la letra
          textSize((width/40));
          fill("black")
          text("Recoge las cosas buenas y evita las malas", width/4,height/4);
          text("Pero que la puntuación no llegue a 0", width/3.5,height/2.3);
          text("Presiona ENTER para iniciar", width/3,height/1.5);
          dog.visible = false;

          if(keyDown("enter")){
               gameState = PLAY;               
               winSound.play();
              // touches = []
          }
     }
     
     if(gameState === PLAY){         
          gamerestart.visible = false;
          scoreT = scoreT + Math.round(getFrameRate()/60);          
           //DOG
           dog.visible = true;
          
          if (keyDown("up_arrow")) {
              console.log("Play!!!")
               jumpSound.play();
               dog.velocityY = dog.velocityY - 10;  
                                      
               //touches = []
          }

          dog.velocityY = dog.velocityY + 08;

         
    
          //FONDO
          fond.velocityX = -(4 + 3*scoreT/100);
           if (fond.x < 0) {
                fond.x = fond.width/5;
          }

          spawnObstacles();
          spawnAwards();
              
          if(dog.isTouching(winGroup)){
                winGroup.destroyEach();
                winSound.play();
                score = score +50;
          }
          if(dog.isTouching(endGroup)){
                endGroup.destroyEach();
                score = score -50;
                endSound.play();
          }

          if(score === 0){
               endSound.play();
               gameState = END;
          }
     } 
     
     if(gameState === END){
          gamerestart.visible = true;

          //fond.velocityX = 0;
          //dog.velocityY = 0;
          endGroup.setVelocityXEach(0);
          winGroup.setVelocityXEach(0);

          dog.changeAnimation("collided", dogCollided);
          fond.changeAnimation("End", fondEnd1Img);
          fond.x = windowWidth/2;
          fond.y = windowHeight/2;
          // Solo recibe un parámetro y deberá ser decimal
          fond.scale = windowWidth/1100;
          background(0);

          winGroup.destroyEach();
          endGroup.destroyEach();

          if( mousePressedOver(gamerestart)){
               reset();
              // touches = [];
            }
     }
      
     
     dog.collide(invisibleGround);    
    
     //textSize solo recibe un argumento y es un número, lo dejé en width/35 :)
     //recuerda que es para asignar un tamaño a la letra
     textSize(width/35);
     fill("black")
     text("Puntuación: "+ score + " Time: " + scoreT,width-width/2.5,height-height+100);
     
}


function spawnObstacles(){
     if(frameCount % 80 === 0){
          end = createSprite(width-10,height-200,100,30);
          end.velocityX = -(7 + 3*scoreT/100);
          end.lifetime = width/16; 
          // Solo recibe un parámetro y deberá ser decimal
          end.scale = windowHeight/3000;
          endGroup.add(end);

          var obstacles = Math.round(random(1,6));
          
          switch(obstacles){
               case 1: end.addImage(end1Img);
                    break;
               case 2: end.addImage(end2Img);
                    break;
               case 3: end.addImage(win1Img);
                    break;
               case 4: end.addImage(end4Img);
                    break;
               case 5: end.addImage(end5Img);
                    break;
               case 6: end.addImage(end6Img);
                    break;
          }
          dog.depth = end.depth;
          dog.depth = dog.depth +5;
         
     }
}

function spawnAwards(){
     if(frameCount % 225 === 0){
          win = createSprite(width-10,height-200,100,30);
          win.velocityX = -(7 + 3*scoreT/100);
          win.lifetime = width/16; 
          // scale Solo recibe un parámetro y deberá ser decimal
          win.scale = windowHeight/3000;
          winGroup.add(win);

          var awards = Math.round(random(2,8));
          
          switch(awards){
               case 2: win.addImage(win2Img);
                    break;
               case 3: win.addImage(win3Img);
                    break;
               case 4: win.addImage(win4Img);
                    break;
               case 5: win.addImage(win5Img);
                    break;
               case 6: win.addImage(win6Img);
                    break;
               case 7: win.addImage(win7Img);
                    break;
               case 8: win.addImage(win8Img);
                    break;
               default: break;
          }
         
      dog.depth = win.depth;
      dog.depth = dog.depth +5;
     }
}

function reset(){
     gameState = START;
     score = 150;
     fond.changeAnimation("Play", fondImg);
     dog.changeAnimation("running",dogRunning);
}
