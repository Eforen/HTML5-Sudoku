console.log("Loaded tileStore.js");

/**
 * tileStore
 * @module tileStore
 * @class
 */
var tileStore = function(){
	/**
	 * Gets all valid tokens.
	 * @method tileStore#available
	 * @returns {Array} some stuff.
	 */
	this.available = function(){
		var av = [];
		for (var i = 0; i < 9; i++) {
			if(i in this.tiles) av[i] = false;
			else av[i] = true;
		}
		return av;
	}
	
	/**
	 * Stores all 9 tiles as an array of tileObj.
	 * @member tileStore#tiles
	 * @type {Array}
	 */
	this.tiles = [];
}

module.exports = tileStore;