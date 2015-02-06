//both letters have to be capitual
//in the bracets you do the work
//melon js uses the init function
//function is x and y
//super reaching to to conductor of the entity
//image is 64 and width is 64
//it returns to polygon
//updates function
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64, 
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
        //sets the velocity to 5 and 0
        this.body.setVelocity(5, 20);
        //keep the direction of the player going right
        this.facing = "right";
        me.game.viewpore.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //adding animation
        //idle is 78
        //walk is 117, 119, 120, 121, 122, 123, 124, 125], 80
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 69, 70, 71, 72], 80);
        //renderable is idle 78
        this.renderable.setCurrentAnimation("idle");     
    },
    
    update: function(delta){
        if(me.input.isKeyPressed("right")){
            //adds to the postiton of my x by the velocity above in
            //setvelocity() and multiplying it by timer tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        }
    }else if(this.body.vel.x !==0){
            this.facing = "left";
            //can see what the guy is doing
            if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }
    }else{
      this.renderable.setCurrentAnimation("idle");  
    }
     if(me.input.isKeyPressed("attack")){
            if(!this.renderable.isCurrentAnimation("attack")){
                console.log(!this.renderable.isCurrentAnimation("attack"));
                //sets the current animation to attack and once that is over
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that the next time we start this sequence begin
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //,make him stop moving a lot
        //the body is update to delta
        //the return is true
        me.collision.check(this, true, this.collideMandler.bind(this), true);
        this.body.update(delta);
        //updating our image
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //collide handler
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
          var ydif = this.pos.y - response.b.pos.y;
          var xdif = this.pos.x - response.b.pos.x;
          //console log is xdif
          console.log("xdif " + xdif + " ydif " + ydif);
          //if is -35
          //it is on the right
          //it is ydif and xdif
          //the body vel is -1
           }else if(ydif<-40){
           this.body.falling = false;
           this.body.vel.y = -1;
          }
          if(xdif>-35 && this.facing==='right' && (xdif<0)){
           this.body.vel.x = 0;
           this.pos.x = this.pos.x -1;
       }else if(xdif<60 && this facing==='left' && (xdif>0))
           this.body.vel.x = 0;
           this.pos.x = this.pos.x +1;
      }
      //adding a renderable
      //current animation is attack
      if(this.renderable.isCurrentAnimation("attack")){
          response.b.lossellealth();
    }
});
//adding the towers 
//player entity is extend
game.PlayerEntity = me.Entity.extend(   );
//image is tower//both letters have to be capitual
//in the bracets you do the work
//melon js uses the init function
//function is x and y
//super reaching to to conductor of the entity
//image is 64 and width is 64
//it returns to polygon
//updates function
game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100, 
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        //playerBaseEntity
        this.type = "EnemyBaseEntity";
        //updated the function  
        this.renderable.addAnimation("idle", [0]);
        //t set animation
        this.renderable.addAnimation("broken", [1]);
        //set animation
        this.renderable.setCurrentAnimation("idle");
    },
    //have an collision function
    //and then it will colision
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
});
