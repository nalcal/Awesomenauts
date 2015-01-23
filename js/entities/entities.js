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
        this.body.setVelocity(5, 0);
        
    },
    
    update: function(delta){
        if(me.input.isKeyPressed("right")){
            //adds to the postiton of my x by the velocity above in
            //setvelocity() and multiplying it by timer tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }else{
            //sets the body to vel x 0
            this.body.vel.x = 0;
        }
        //the body is update to delta
        //the return is true
        this.body.update(delta);
        return true;
    }
});