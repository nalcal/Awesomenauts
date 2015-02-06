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
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
        //sets the velocity to 5 and 0
        this.body.setVelocity(5, 20);
        me.game.viewpore.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //adding animation
        //idle is 78
        //walk is 117, 119, 120, 121, 122, 123, 124, 125], 80
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 119, 120, 121, 122, 123, 124, 125], 80);
        //renderable is idle 78
        this.renderable.setCurrentAnimation("idle");     
    },
    
    update: function(delta){
        if(me.input.isKeyPressed("right")){
            //adds to the postiton of my x by the velocity above in
            //setvelocity() and multiplying it by timer tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
           
        }else{
            //sets the body to vel x 0
            this.body.vel.x = 0;
        }
        if(this.body.vel.x !==0){
            //can see what the guy is doing
            if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }
    }else{
      this.renderable.setCurrentAnimation("idle");  
    }
        //,make him stop moving a lot
        //the body is update to delta
        //the return is true
        this.body.update(delta);
        //updating our image
        this._super(me.Entity, "update", [delta]);
        return true;
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
                    return(new me.Rect(0, 0, 100, 100)).toPolygon();
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
