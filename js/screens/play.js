game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //added a level director
                //added a laod level
                //level01
                me.levelDirector.loadLevel("level01");
                //adding the player
                //x is were he is starting
                //y is were he is empty settings
                //adding him to the world
                var player = me.pool.pull("player", 0, 420, {});
                me.game.world.addChild(player, 5);
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
