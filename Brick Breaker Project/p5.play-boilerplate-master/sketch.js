var vhbrick1=[];
var hbrick1=[];
var brick1=[];
var vhbrick2=[]
var hbrick2=[];
var brick2=[];
var brick3=[];
var mbrick,mbrickFrame=0;
var paddle,ball,ballimg,paddleimg,ballAnimation;
var gameState=0;
var brickState=1;
var vhbrickState=3;
var hbrickState=2;
var edges;
var brick3img,brick2img,brick1img,hbrick1img,hbrick2img,vhbrick1img,vhbrick2img,mbrickimg;


function preload(){
 
  ballimg=loadImage('images/hammer.png');
  ballAnimation=loadAnimation('images/hammer.png','images/hammer1.png','images/hammer2.png','images/hammer3.png');
  brick1img=loadImage('images/brick.png');
  brick2img=loadImage('images/brick.png');
  brick3img=loadImage('images/brick.png');
  hbrick1img=loadImage('images/hbrick.png');
  hbrick2img=loadImage('images/hbrick.png');
  vhbrick1img=loadImage('images/vhbrick.png');
  vhbrick2img=loadImage('images/vhbrick.png');
  mbrickimg=loadImage('images/mbrick.png');


}

function setup() {
  

  createCanvas(displayWidth,displayHeight);

  paddle=createSprite(displayWidth/21,displayHeight/2,25,90);

  ball=createSprite(displayWidth/12,displayHeight/2,10,10);
  ball.addImage(ballimg);
  ball.addAnimation('1',ballAnimation);
  ball.scale=0.4;
  ball.debug=true;
  ball.setCollider('circle',0,0,20);
  
  for(var i=65;i<displayHeight-40;i+=110){
    vhbrick1.push(new Brick(displayWidth-40,i,'white',vhbrick1img))
  }
  for(var i=120;i<displayHeight-40;i+=110){
    vhbrick2.push(new Brick(displayWidth-120,i,'white',vhbrick2img))
  }
  for(var i=175;i<displayHeight-80;i+=110){
    hbrick1.push(new Brick(displayWidth-200,i,'lightBlue',hbrick1img))
  }
  for(var i=230;i<displayHeight-100;i+=110){
    hbrick2.push(new Brick(displayWidth-280,i,'lightBlue',hbrick2img))
  }
  for(var i=285;i<displayHeight-180;i+=110){
    brick1.push(new Brick(displayWidth-360,i,'orange',brick1img))
  }
  for(var i=340;i<displayHeight-220;i+=110){
    brick2.push(new Brick(displayWidth-440,i,'orange',brick2img))
  }
  for(var i=395;i<displayHeight-280;i+=110){
    brick3.push(new Brick(displayWidth-520,i,'orange',brick3img))
  }
  

 
  
  
 
  
}

function draw() {
  background(180);  

  if(frameCount%100===0){
    mbrick=new Brick(random(displayWidth/2,displayWidth/3),random(0,displayHeight),'red',mbrickimg);

    mbrickFrame=frameCount;
 
  }
  
  if(mbrickFrame+50===frameCount&&mbrick){
    mbrick.destroy();
  }
  if(gameState===0){
    ball.addImage(ballimg);
  }
  if(keyDown(32)&&gameState===0){
    ball.changeAnimation('1',ballAnimation);
    ball.velocityX=4;
    gameState=1;
    
  }

  if(keyDown(UP_ARROW)){
    paddle.y=paddle.y+10;
  }
  if(keyDown(DOWN_ARROW)){
    paddle.y=paddle.y-10;
  }
  



  if (ball.isTouching(paddle)){
      ball.bounceOff(paddle);
    
  }
  
  
  for(var i=0;i<vhbrick1.length;i++){
     
    if(detectCollision(ball,vhbrick1[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,1);
     // console.log(detectCollision(ball,vhbrick1[i]));
      vhbrickState-=1;
      //console.log(vhbrickState);

    }
  }
  for(var i=0;i<vhbrick2.length;i++){
     
    if(detectCollision(ball,vhbrick2[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,1);
      //console.log(detectCollision(ball,vhbrick2[i]));
      vhbrickState-=1;
     // console.log(vhbrickState);

    }
  }
  for(var i=0;i<hbrick1.length;i++){
     
    if(detectCollision(ball,hbrick1[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,-2);
     // console.log(detectCollision(ball,hbrick1[i]));
      vhbrickState-=1;
     // console.log(vhbrickState);

    }
  }
  for(var i=0;i<hbrick2.length;i++){
     
    if(detectCollision(ball,hbrick2[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,-2);
     // console.log(detectCollision(ball,hbrick2[i]));
      vhbrickState-=1;
     // console.log(vhbrickState);

    }
  }
  for(var i=0;i<brick1.length;i++){
     
    if(detectCollision(ball,brick1[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,-2);
     // console.log(detectCollision(ball,brick1[i]));
      brick1[i].destroy();
      console.log(brick3[i]);
     // console.log(vhbrickState);

    }
  }
  for(var i=0;i<brick2.length;i++){
     
    if(detectCollision(ball,brick2[i])){      
      ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,-2);
     // console.log(detectCollision(ball,brick2[i]));
      brick2[i].destroy();
      console.log(brickState);

    }
  }  
  for(var i=0;i<brick3.length;i++){
     
    if(detectCollision(ball,brick3[i])){      
     ball.velocityX+=random(-1,-2);
      ball.velocityY+=random(-1,-2);
      console.log(brick3);
      
      brick3[i].destroy();
      //brick3[i].pop();
      
    //  console.log(brickState);
      

    }
  }


  

  edges=createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[1]);
  paddle.bounceOff(edges[3]);
  paddle.bounceOff(edges[2]);



  drawSprites();
}

function detectCollision(iball,ibrick){
  
  var distance=dist(iball.x,iball.y,ibrick.body.x,ibrick.body.y);
 // console.log(distance+" distance");
  //console.log(ibrick.body.width+iball.width +" width");
  if (distance<=ibrick.body.width+iball.width){
    return true; 
  }
  else{
    return false;
  }
  
}
