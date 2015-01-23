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
    },
    
    update: function(){
        
    }
});