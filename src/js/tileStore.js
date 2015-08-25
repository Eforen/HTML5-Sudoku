/**
 * @file tileStore Code
 * @author Ariel Lothlorien
 */

 console.log("Loaded tileStore.js");

/**
 * This object stores an amount of tiles it is intended to hold 9 tiles but nothing is stopping it from holding more.
 * @module tileStore
 * @class
 */
var tileStore = function(){
	/**
	 * Gets all remaining valid tokens.
	 * @method tileStore#available
	 * @returns {number[]} some stuff.
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
	 * Stores all 9 tiles as an array of {@link tileObj}.
	 * @member tileStore#tiles
	 * @type {tileOBJ[]}
	 */
	this.tiles = [];
}

module.exports = tileStore;