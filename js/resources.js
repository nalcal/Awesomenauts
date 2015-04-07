game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	//loads the background tiles from the data folder, allowing it to display them on the map
	{name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	//loads the background tiles from the data folder, allowing it to display them on the map
	{name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//custom background
	//{name: "tree", type:"image", src: "data/img/tree.png"},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//loads the orc player from the data folder, allowing it to display it on the map
	{name: "player", type:"image", src: "data/img/orcSpear.png"},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//enmy hero hack and custom sprite
	//loads the orc player from the data folder, allowing it to display it on the map
	{name: "enemyhero", type:"image", src: "data/img/dragonwarrior.png"},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//loads the tower entity from the data folder, allowing it to display it on the map
	{name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	//loads the brainmonster entity from the data folder, allowing it to display it on the map
	{name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//freind creep hack
	//loads the oneeye entity from the data folder, allowing it to display it on the map
	{name: "creep2", type:"image", src: "data/img/gloop.png"},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//loads the title-screen image from the data folder, allowing it to display it on the map
	{name: "title-screen", type:"image", src: "data/img/skyrim.jpg"},
	//loads the exp-screen image from the data folder, allowing it to display it on the map
	{name: "exp-screen", type:"image", src: "data/img/perktree.jpg"},
	//loads the pause-screen image from the data folder, allowing it to display it on the map
	{name: "pause-screen", type:"image", src: "data/img/paused.jpg"},
	//loads the load-screen image from the data folder, allowing it to display it on the map
	{name: "load-screen", type:"image", src: "data/img/ebony.jpg"},
	//loads the new-screen image from the data folder, allowing it to display it on the map
	{name: "new-screen", type:"image", src: "data/img/catjit.jpg"},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//throw Spear hack
	{name: "spear", type:"image", src: "data/img/spear.png"},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */

 	//loads the map from the map folder and dislplays it
 	{name: "level01", type: "tmx", src: "data/map/test.tmx"},


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//backgorund music hack
	{name: "AOF", type: "audio", src: "data/bgm/"},
	{name: "sky", type: "audio", src: "data/bgm/"}
	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];