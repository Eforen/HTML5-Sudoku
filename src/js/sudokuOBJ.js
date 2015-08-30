/**
 * @file sudokuOBJ Code
 * @author Ariel Lothlorien
 */

 console.log("Loaded SudokuOBJ.js");
var tileStore = require("./tileStore.js");
var tileOBJ   = require("./tileOBJ.js");
var token = require("./tokenENUM.js");

/**
 * The core object that holds the data to describe a sudoku.
 * @class
 */
var sudokuOBJ = function(){
	/**
	 * Stores all 9 rows as an array of tileStores
	 * @member sudokuOBJ#rows
	 * @type {tileStore[]}
	 * @private
	 */
	var rows = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];

	/**
	 * Stores all 9 columns as an array of tileStores
	 * @member sudokuOBJ#cols
	 * @type {tileStore[]}
	 * @private
	 */
	var cols = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];

	/**
	 * Stores all 9 regions as an array of tileStores
	 * @member sudokuOBJ#regions
	 * @type {tileStore[]}
	 * @private
	 */
	var regions = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];


	/**
	 * Gets all Rows in the Sudoku Object.
	 * @method sudokuOBJ#getRows
	 * @returns {tileStore[]} 9 tileStore objects in as elements.
	 */
	this.getRows=function(){
		return rows;
	}

	/**
	 * Gets a row in the Sudoku Object as an tileStore.
	 * @method sudokuOBJ#getRow
	 * @param {number} index - The index of the target row also can be refured to as the tiles Y position.
	 * @returns {tileStore} The returned tileStore.
	 */
	this.getRow=function(index){
		return rows[index];
	}

	/**
	 * Gets all columns in the Sudoku Object.
	 * @method sudokuOBJ#getCols
	 * @returns {tileStore[]} 9 tileStore objects in as elements.
	 */
	this.getCols=function(){
		return cols;
	}

	/**
	 * Gets a column in the Sudoku Object as an tileStore.
	 * @method sudokuOBJ#getCol
	 * @param {number} index - The index of the target column also can be refured to as the tiles X position.
	 * @returns {tileStore} The returned tileStore.
	 */
	this.getCol=function(index){
		return cols[index];
	}

	/**
	 * Gets all regions in the Sudoku Object.
	 * @method sudokuOBJ#getRegions
	 * @returns {tileStore[]} 9 tileStore objects in as elements.
	 */
	this.getRegions=function(){
		return regions;
	}

	/**
	 * Gets a region in the Sudoku Object as an {@link tileStore}.
	 * @method sudokuOBJ#getRegion
	 * @param {number} posX - The X position of the target region.
	 * @param {number} posY - The Y position of the target region.
	 * @returns {tileStore} The returned tileStore.
	 */
	this.getRegion=function(posX, posY){
		if(typeof posY === "undefined") return regions[posX];

		posX = parseInt(posX/3);
		posY = parseInt(posY/3);
		return regions[3*posY+posX];
	}



	/**
	 * Internal method used to setup the tiles in a sudokuOBJ to the desired starting state.
	 * @method sudokuOBJ#putTile
	 * @param {number} x - The X position of the target tile.
	 * @param {number} y - The Y position of the target tile.
	 * @private
	 */
	this.putTile = function(x, y){
		var r = rows[y];
		var c = cols[x];
		var re = this.getRegion(x, y);

		var t = new tileOBJ();

		t.setup(r, c, re, x, y);

		r.tiles[x] = t;
		c.tiles[y] = t;
		re.tiles[3*parseInt(y%3)+parseInt(x%3)] = t;
	}

	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			this.putTile(x, y);
		}
	}


	/**
	 * Gets a tile.
	 * @method sudokuOBJ#getTile
	 * @param {number} x - The X position of the target tile.
	 * @param {number} y - The Y position of the target tile.
	 */
	this.getTile = function(x, y){
		var r = this.getRow(y)
		return r.tiles[x];
	}

	/**
	 * This gets a {@link tileStore} as a string. This method is used in the debug methods.
	 * @method sudokuOBJ#debugRow
	 * @param {tileStore} y - The X position of the target row.
	 */
	this.debugRow = function(y){
		return sudokuOBJ.debugDataSet(this.getRow(y).tiles)
	}

	/**
	 * This gets a column as a string via [sudoku.debugDataSet(data)]{@link debugDataSet}.
	 * @method sudokuOBJ#debugCol
	 * @param {number} x - The X position of the target column.
	 */
	this.debugCol = function(x){
		return sudokuOBJ.debugDataSet(this.getCol(x).tiles)
	}

	/**
	 * This gets a {@link tileStore} as a string. This method is used in the debug methods.
	 * @method sudokuOBJ#debugRegion
	 * @param {number} x - The X position of the target region.
	 * @param {number} y - The Y position of the target region.
	 */
	this.debugRegion = function(x, y){
		return sudokuOBJ.debugDataSet(this.getRegion(x, y).tiles)
	}

	/**
	 * This gets this sudokuOBJ as a string. This method is used in the debug primarily.
	 * @example
	 * *---*---*---*
	 * |043|000|620|
	 * |700|403|008|
	 * |600|208|007|
	 * *---+---+---*
	 * |075|000|340|
	 * |000|000|000|
	 * |098|000|570|
	 * *---+---+---*
	 * |900|507|003|
	 * |100|602|005|
	 * |087|000|260|
	 * *---*---*---*
	 * @method sudokuOBJ#getStructure
	 */
	this.getStructure = function(){
		//TODO: add an option to get everything including type and guesses
		var r = "*---*---*---*\n"
		var row //storage for a row
		for (var y = 0; y < 9; y++) {
			r += "|"
			row = this.getRow(y);
			for (var x = 0; x < 9; x++) {
				r += row.tiles[x].getToken()
				if(x % 3 === 2) r += "|"
			}

			if(y === 2 || y === 5) r += "\n*---+---+---*"
			r += "\n"
		}

		r += "*---*---*---*\n"

		return r
	}

    this.isSolved = function(){
        //TODO: code this function
    }

	var debug = "breakpointable";
}

/**
 * This static method loads a sudoku from an object
 * @static sudokuOBJ#loadFromOBJ
 * @param {Object} obj - Puzzle data in an object to be loaded.
 * @param {String} obj.name - The name of the puzzle.
 * @param {String} obj.puzzle - The data in the form of a string of 81 intergers 0 through 9, where 0 is an empty tile and 1-9 are tokens.
 * @returns {sudokuOBJ}
 */
sudokuOBJ.loadFromOBJ = function(obj){
	var su = new sudokuOBJ();

	var arr = obj.puzzle.split("");
	var x = 0;
	var y = 0;

	var proc = false;

	var p = function(value, check){
		if(value == check){
			su.getTile(x,y).set(check, tileOBJ.types.locked);
			proc = true;
		}
	}

	for (var i = 0; i < arr.length; i++) {
		if(arr[i] == 0){ // jshint ignore:line
			su.getTile(x,y).set(0, tileOBJ.types.blank);
			proc = true;
		}
		p(arr[i], token.a);
		p(arr[i], token.b);
		p(arr[i], token.c);
		p(arr[i], token.d);
		p(arr[i], token.e);
		p(arr[i], token.f);
		p(arr[i], token.g);
		p(arr[i], token.h);
		p(arr[i], token.i);
		if(proc){
			x++;
			if(x>=9){
				x=0;
				y++;
			}
		}
	}

	return su;
}

/**
 * This static method loads a sudoku from a JSON string
 * @todo This function has not been implimented yet.
 * @todo Parse JSON string and send it to {@link sudokuOBJ#loadFromOBJ}
 * @static sudokuOBJ#loadFromJSON
 * @param {JSON} jobj - Puzzle data in a JSON string to be loaded.
 * @param {String} jobj.name - The name of the puzzle.
 * @param {String} jobj.puzzle - The data in the form of a string of 81 intergers 0 through 9, where 0 is an empty tile and 1-9 are tokens.
 * @returns {sudokuOBJ}
 */
sudokuOBJ.loadFromJSON = function(jobj){
}

/**
 * This gets a {@link tileStore} as a string. This method is used in the debug methods.
 * @example This example shows how it would look with just locks and sets.
 * ||4|3||||6|2||
 * @example This example shows both locks/sets and guesses.
 * |58|4|3|179|1579|159|6|2|19|
 * @static sudokuOBJ#getTile
 * @param {tileStore} data - The tileStore to be debuged.
 */
sudokuOBJ.debugDataSet = function(data){
	var r = "|"
	for (var i = 0; i < data.length; i++) {
		if(data[i] == null) continue
		if(data[i].getType() === tileOBJ.types.locked || data[i].getType() === tileOBJ.types.set) r += data[i].getToken()
		if(data[i].getType() === tileOBJ.types.guess){
			for (var n = 1; n <= 9; n++) {
				if(data[i].getGuess(n)) {
					r += n
					//console.log(i+"|"+data[i].getType()+":"+data[i].getToken()+"n="+n) //debug
				}// else console.log(i+"|"+data[i].getType()+":"+data[i].getToken()+"n"+n) //debug
			}
		}// else console.log(i+"|"+data[i].getType()+":"+data[i].getToken()) //debug
		//r += ":" + data[i].getToken() //debug
		r += "|"
	}
	return r
}

module.exports = sudokuOBJ;