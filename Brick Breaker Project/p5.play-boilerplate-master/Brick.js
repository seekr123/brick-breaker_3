class Brick{
    constructor(x,y,strength,img){
        console.log(img);
        this.body=createSprite(x,y,25,90);
        this.color=strength;
        this.body.shapeColor=this.color;
        this.body.addImage('img',img);
        this.body.scale=0.6;
        this.body.debug=true;
        this.body.setCollider('rectangle',-10,-10,10,40);
      
        
    }
    display(){
        
        drawSprites();
    }
    destroy(){
        this.body.destroy();
    }

}