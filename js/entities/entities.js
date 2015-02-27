// player's class
game.PlayerEntity = me.Entity.extend ({
    //constructor function 
    init: function(x, y, settings){
        //setting super
        this.setSuper();
        //setting player timer
        this.setPlayerTimers();
        //setting sttributes
        this.setAttributes();
        //allows player to be interacted with
        this.type = "PlayerEntity";
        //setting flags
        this.setFlags();
        //makesit so the player is always on the screen
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimations();
        
        //the player's start animation
        this.renderable.setCurrentAnimation("idle");
    },

    setSuper: function(){
          //reachers the constructor function for enitity
        this._super(me.Entity, 'init', [x, y, {
            //settings. shoes the player
            image: "player",
            //sets aside a width of 64 pixels for the sprite
            width: 64,
            //sets aside a height of 64 pixels for the sprite
            height: 64,
            //gives the sprite a width of 64. 
            spritewidth : "64",
            //gives the sprite a width of 64
            spriteheight: "64",
            getShape: function(){
                //returns a rectangle of what the player walks into
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
            }
        }]);

    },

    setPlayerTimers: function(){
         //variable for keeping track of time and date
        this.now = new Date().getTime();
        //same ^^
        this.lastHit = this.now;
        //keeps the player from attacking multiple times
        this.lastAttack = new Date().getTime();
    },

    setAttributes: function(){
        //sets the player's health to 100
        this.health = game.data.playerHealth;
        //sets movemet speed. allows player to move horizantally and vertically
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
    },

    setFlags: function(){
         //keeps track of which way the character is going
        this.facing = "right";
        //says the player is not dead
        this.death = false;
    },

    addAnimation: function(){
        //gives player animation while standing
        this.renderable.addAnimation("idle", [78]);
        //gives player animation while walking
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        //gives player animation while attacking
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },

    //delta is the change in time that's happening
    update: function(delta){
        //keeps timer updated
        this.now = new Date().getTime();
        //runa when player's health reaches 0
        if (this.health <= 0) {
            //says player is dead
            this.dead = true;
        }
        //runs if the right key is pressed
        if(me.input.isKeyPressed("right")){
            //when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //so the program knows the character is facing right
            this.facing = "right";
            //flips the animation
            this.flipX(true);
        }

        else if(me.input.isKeyPressed("left")){
            //when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            //so the program knows the character is facing left
            this.facing = "left";
            //doesn't flip the animation
            this.flipX(false);
        }

        //if the right key isn't being pressed, the player doesn't move
        else{
            this.body.vel.x = 0;
        }
        //runs only if the up key is pressed, the player isn't already jumping or falling
        if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
            //makes the player jump
            this.body.jumping = true;
            //sets velocity of the jump and the time
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }

        //runs if the attack key is pressed
        if(me.input.isKeyPressed("attack")){
            if(!this.renderable.isCurrentAnimation("attack")){
                //sets current animation to attack. goes back to idle oncethe attack is over it goes back to idle
                this.renderable.setCurrentAnimation("attack", "idle")
                //makes it so that next time the button is pressed the player starts from the first animation, not where it left off
                this.renderable.setAnimationFrame();
            }
        }

        //runs if the player is moving horizantally and not attacking
        else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
            //runs if the player isn't already running the walk animation
            if(!this.renderable.isCurrentAnimation("walk")){
                //gives the player the walking animation
                this.renderable.setCurrentAnimation("walk");
            }
        }
        //runs if player is standing still and not attacking
        else if(!this.renderable.isCurrentAnimation("attack")){
            //gives the player the idle animation
            this.renderable.setCurrentAnimation("idle");
        }
        //checks to see if player is colliding with base
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //tells above code to work
        this.body.update(delta);
        //updates the code
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //runs when called
    loseHealth: function(damage){
        //subtracts set amount of health
        this.health = this.health - damage;
    },
    //function for when player collides with tower
    collideHandler: function(response){
        //runs if the player collides with the enemy base
        if (response.b.type === 'EnemyBaseEntity') {
            //represents the difference between player's y distance and enemy's y distance
            var ydif = this.pos.y - response.b.pos.y;
            //represents the difference between player's and enemy base's x distance
            var xdif = this.pos.x - response.b.pos.x;
            //runs if the player is on top of the enemy base
            if (ydif < -40 && xdif < 60 && xdif > -35) {
                //stops the player from moving down
                this.body.falling = false;
                //keeps the player from falling through the tower
                this.body.vel.y = -1;
            }
            //runs if the player's x position is 37 units away from the tower while facing right 
            else if (xdif > -36 && this.facing === "right" && xdif < 0) {
                //stops player from moving 
                this.body.vel.x = 0;
                //moves player slightly away from tower
                this.pos.x = this.pos.x -1;
            }
            //runs if the player's x position is 74 units away from the tower while facing left 
            else if (xdif < 75 && this.facing === "left" && xdif > 0) {
                //stops player from moving 
                this.body.vel.x = 0;
                //moves player slightly away from tower
                this.pos.x = this.pos.x +1;
            }
            //runs if the player is attacking and its been 1000 milliseconds since the last hit
            if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                //and if the y difference is less than 41
                && (Math.abs(ydif) <= 40) &&
                //and if the player is facing the creep's baack or front
                ((xdif > 0 ) && this.facing === "left") || ((xdif < 0) && this.facing === "right")) {
                //so the computer knows th eplayer just hit the tower
                this.lastHit = this.now;
                //calls the loseHealth function and sets the parameter to the playerAttack variable
                response.b.loseHealth(game.data.playerAttack);
            }
        }
        //runs if the player collides with the enemy creep
        else if (response.b.type === 'EnemyCreep') {
            //stores the horizantal distance from the player to the enemy creep
            var xdif = this.pos.x - response.b.pos.x;
            //stores the vertical distance from the player to the enemy creep
            var ydif = this.pos.y - response.b.pos.y; 
            //runs if the player is to the left of the enemy creep
            if (xdif > 0) {
                //pushes the player 1 unit to the right
                this.pos.x = this.pos.x + 1;
                //runs if the player is facing left
                if (this.facing === "left") {
                    //stops the player's movement
                    this.body.vel.x = 0;
                }
            }
            else {
                //pushes the player 1 unit to the left
                this.pos.x = this.pos.x - 1;
                //runs if the player is facing right
                if (this.facing === "right") {
                    //stops the player's movement
                    this.body.vel.x = 0;
                }
            }
            //runs the loseHealth function only if the player is attacking the enemy creep
            //can only take one life point per second
            if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
                //updates the timer
                this.lastHit = this.now;
                //calls the loseHealth function with a parameter of 1
                response.b.loseHealth(game.data.playerAttack);
            }
        }
    }
});







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//friend creep hack one
game.FriendCreep = me.Entity.extend({
    init: function(x, y, settings){
            //reaches the constructor function for enitity
            this._super(me.Entity, 'init', [x, y, {
                //settings. shows the creep
                image: "creep2",
                //sets aside a width of 64 pixels for the sprite
                width: 100,
                //sets aside a height of 64 pixels for the sprite
                height: 85,
                //gives the sprite a width of 64. 
                spritewidth : "100",
                //gives the sprite a width of 64
                spriteheight: "85",
                //gives creep a form
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 85)).toPolygon();
                }
            }]);
            //sets health to ten
            this.health = game.data.friendCreepHealth;
            //makes the creep's satus continuosly update
            this.alwaysUpdate = true;
            //says the creep is not attacking
            this.attacking = false;
            //records last time creep attacked anything
            this.lastAttacking = new Date().getTime();
            //records last time creep hit anything
            this.lastHit = new Date().getTime();
            //timer for attacking
            this.now = new Date().getTime();
            //sets the creep's horizantal and vertical speed
            this.body.setVelocity(3, 20);
            //sets the sprite's type
            this.type = "FriendCreep";
            //creates the walking animation
            this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 100);
            //applies the walking animation
            this.renderable.setCurrentAnimation("walk");
        },


        //delta is the change in time that's happening
        update: function(delta){
            //updates attack
            this.now = new Date().getTime();
            //makes the creep move
            this.body.vel.x += this.body.accel.x *  me.timer.tick;
            this.flipX(true);
            //checks for collisions with player
            me.collision.check(this, true, this.collideHandler.bind(this), true);
            //basic update functions
            this.body.update(delta);
            this._super(me.Entity, "update", [delta]);
            return true;
        },
        //function for creeps' collisions
        collideHandler: function(response){
            //runs if creep collides with tower 
            if (response.b.type === 'EnemyBaseEntity') {
                //makes the creep attack
                this.attacking = true;
                //timer that says when last attacked
                //this.lastAttacking = this.now;
                //prevents the creep from walking through the tower
                this.body.vel.x = 0;
                //pushes the creep back a little to maintain its position
                this.pos.x = this.pos.x - 1;
                //Only allows the creep to hit the tower once every second
                if ((this.now - this.lastHit >= game.data.friendCreepAttack)) {
                    //updates the lastHit timer
                    this.lastHit = this.now;
                    //runs the losehealth function, with 1 point damage
                    response.b.loseHealth(game.data.friendCreepAttack);
                }
            }
            // else if (response.b.type === 'EnemyCreep') {
            //  //see where the player is compared to the creep
            //  var xdif = this.pos.x - response.b.pos.x;
            //  //makes the creep attack
            //  this.attacking = true;
            //  //timer that says when last attacked
            //  //this.lastAttacking = this.now;
                
            //  //only runs if the creep's face is right in front of the orc or under
            //  if (xdif > 0) {
            //      //prevents the creep from walking through the player
            //      this.body.vel.x = 0;
            //      //pushes the creep back a little to maintain its position
            //      this.pos.x = this.pos.x - 1;
            //  }
            //  //Only allows the creep to hit the tower once every second and if the player is not behind the creep
            //  if ((this.now - this.lastHit >= game.data.friendCreepAttackTimer) && xdif > 0) {
            //      //updates the lastHit timer
            //      this.lastHit = this.now;
            //      //runs the losehealth function, with 1 point damage
            //      response.b.loseHealth(game.data.friendCreepAttack);
            //  }
            // }
        }
    
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////