game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
        //name is background tiles
        //in data then img then background tiles
        {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
        //name is meta tiles
        //in data then img then meta tiles
        {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
         //name is level 01
         //in data then map then test.tmx
        {name: "level01", type: "tmx", src: "data/map/test.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
