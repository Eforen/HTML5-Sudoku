(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Main App Code
 * @author Ariel Lothlorien
 */

 window.sudokuOBJ = require("./sudokuOBJ.js");
window.sudokuSolver = require("./sudokuSolver.js");
window.token = require("./tokenENUM.js");

//test = new window.sudokuOBJ();
window.testData = {
			name: "Simple Test",	
			puzzle: "043000620700403008600208007075000340000000000098000570900507003100602005087000260"
		}

window.su = window.sudokuOBJ.loadFromOBJ(window.testData);
window.solve = new window.sudokuSolver(window.su);
window.su2 = window.solve.getSudoku();
/*
*/
window.runTest = function(){
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solveRegionExclusion();
	solve.solvePassBasic();
	solve.solveRowExclusion();
	solve.solvePassBasic();
	solve.solveColExclusion();
	solve.solvePassBasic();
	solve.solveRegionExclusion();
	solve.solvePassBasic();
	solve.solveRowExclusion();
	solve.solvePassBasic();
	solve.solvePassBasic();
}
},{"./sudokuOBJ.js":2,"./sudokuSolver.js":3,"./tokenENUM.js":6}],2:[function(require,module,exports){
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
		if(data == null) continue
		if(data[i].getType() === tileOBJ.types.locked || data[i].getType() === tileOBJ.types.set) r += data[i].getToken()
		if(data[i].getType() === tileOBJ.types.guess){
			for (var n = 1; n <= 9; n++) {
				if(data[i].getGuess(n)) r += n
			}
		}
		//r += ":" + data[i].getToken() //debug
		r += "|"
	}
	return r
}

module.exports = sudokuOBJ;
},{"./tileOBJ.js":4,"./tileStore.js":5,"./tokenENUM.js":6}],3:[function(require,module,exports){
/**
 * @file SudokuSolver Code
 * @author Ariel Lothlorien
 */

console.log("Loaded SudokuSolver.js");
var sudokuOBJ = require("./sudokuOBJ.js");
var tileStore = require("./tileStore.js");
var tileOBJ   = require("./tileOBJ.js");
var token = require("./tokenENUM.js");

/**
 * Holds all the logic to solve a sudoku or preform parts of solving.
 * @todo Document this object
 * @class
 */

var sudokuSolver = function(sudoku){
	//Private Vars
	/**
	 * @todo Document this member
	 * @member sudokuSolver#su
	 * @private
	 */
	var su = sudoku;

	//Public Vars

	//Methods
	/**
	 * @todo Document this method
	 * @method sudokuSolver#prepSudoku
	 */
	this.prepSudoku=function(){
		var defaultGuesses = [];
			defaultGuesses[token.a] = true;
			defaultGuesses[token.b] = true;
			defaultGuesses[token.c] = true;
			defaultGuesses[token.d] = true;
			defaultGuesses[token.e] = true;
			defaultGuesses[token.f] = true;
			defaultGuesses[token.g] = true;
			defaultGuesses[token.h] = true;
			defaultGuesses[token.i] = true;

		var tile = null;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				tile = su.getTile(x,y);
				if(tile.getType()!=tileOBJ.types.locked){
					tile.setGuesses(defaultGuesses);
				}
			}
		}
	}


	/**
	 * @todo Document this method
	 * @method sudokuSolver#getSudoku
	 */
	this.getSudoku = function(){
		return su;
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveForRow
	 */
	this.solveForRow = function(y){
		this.excludeInSet(su.getRow(y));
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveForCol
	 */
	this.solveForCol = function(x){
		this.excludeInSet(su.getCol(x));
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveForRegion
	 */
	this.solveForRegion = function(x, y){
		this.excludeInSet(getRegion(x, y));
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#excludeSet
	 */
	this.excludeSet = function(tile, container){

		for (var n = 1; n < 10; n++) {
			for (var i = 0; i < container.tiles.length; i++) {
				if(container.tiles[i].getToken() === n || container.tiles[i].getType() === tileOBJ.types.locked || container.tiles[i].getType() === tileOBJ.types.set){
					console.log("Making "+n+"|"+i+" falsy")
					tile.setGuess(n, false);
					break;
				}
			}
		}
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#excludeInSet
	 */
	this.excludeInSet = function(container){
		var data = []

		//run through set and mark all present tokens as false in data set leave all others null
		for (var i = 0; i < container.tiles.length; i++) {
			//If tile is guess then skip it
			if(container.tiles[i].getType() === tileOBJ.types.guess){
				continue
			}
			//If tile is set then set data as false
			if((container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set ) && container.tiles[i].getToken() !== 0){
				data[container.tiles[i].getToken()] = false
			}
		}

		//Kill all bad guesses with the data array
		for (var i = 0; i < container.tiles.length; i++)
			if(container.tiles[i].getType() === tileOBJ.types.guess)
				container.tiles[i].setGuesses(data)
		
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#excludeGuess
	 */
	this.excludeGuess = function(container, includeGuesses, debug){
		if(includeGuesses == null) includeGuesses = false
		var data = []
		for (var n = 1; n < 10; n++) {
			data[n]={
				inMoreThenOne: 0,
				index: 0
			}
			for (var i = 0; i < container.tiles.length; i++) {
				if(container.tiles[i].getType() === tileOBJ.types.guess){
					if(container.tiles[i].getGuess(n)){
						data[n].inMoreThenOne++
						data[n].index = i
					}
				}
				if(container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set){
					if(container.tiles[i].getToken() == n){
						data[n].inMoreThenOne += 10
						data[n].index = i
					}
				}
				/*
				*/
			}
		}
		if(typeof(window) != "undefined") window.testGuess = data //debug
		for (var n = 1; n < 10; n++) {
			/*if(n == 4 && debug === true) {//debug 
				console.log("\n\n********************************************\nSolve for N"+n+" is "+data[n].inMoreThenOne+"|"+data[n].index+"\n********************************************\n\n")
			}*/
			if(data[n].inMoreThenOne === 1){
				//console.log("found one")
				container.tiles[data[n].index].setToken(n)
				container.tiles[data[n].index].setType(tileOBJ.types.set)
			}
		}
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solvePassBasic
	 */
	this.solvePassBasic = function(){
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				//if(y === 7) console.log("Solving For r"+9+" c"+x)
				this.solveForRow(y)
				this.solveForCol(x)
			}
		}
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				this.solveForRegion(x, y)
			}
		}

		var tile = null;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				tile = this.getSudoku().getTile(x, y)
				if(tile.getType() === tileOBJ.types.guess){
					var count = 0
					var guesses = tile.getGuesses()
					var lastToken = 0
					for (var i = 0; i < guesses.length; i++) {
						if(guesses[i]){
							count++
							lastToken = i
						}
					}
					if(count === 1) {
						tile.setToken(lastToken)
						tile.setType(tileOBJ.types.set)
					}
				}
			}
		}
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveRegionExclusion
	 */
	this.solveRegionExclusion = function(){
		var regions = this.getSudoku().getRegions()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(regions[i], true)
		}
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveRowExclusion
	 */
	this.solveRowExclusion = function(){
		//var row = this.getSudoku().getRows()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(this.getSudoku().getRow(i), true)
		}
	}

	/**
	 * @todo Document this method
	 * @method sudokuSolver#solveColExclusion
	 */
	this.solveColExclusion = function(){
		for (var i = 0; i < 9; i++) {
			console.log(su.debugCol(i)) //debug
			this.excludeGuess(this.getSudoku().getCol(i), true)
		}
	}

	//Start of Constructor

	this.prepSudoku();

	//End of Constructor
}

module.exports = sudokuSolver;
},{"./sudokuOBJ.js":2,"./tileOBJ.js":4,"./tileStore.js":5,"./tokenENUM.js":6}],4:[function(require,module,exports){
/**
 * @file tileOBJ Code
 * @author Ariel Lothlorien
 */

 console.log("Loaded tileOBJ.js");

var tokens = require("./tokenENUM.js");

/**
 * This object stores data to describe a tile in the sudoku.
 * @module tileOBJ
 * @class
 */
var tileOBJ = function(){
	/**
	 * Tells if the this instance has been setup or not.
	 * @member tileOBJ#isSetup
	 * @type {Boolean}
	 */
	this.isSetup = false;

	/**
	 * Stores a refrence to the {@link tileStore} that contains all the tiles in the same row.
	 * @member tileOBJ#_row
	 * @type {tileStore}
	 * @private
	 */
	/**
	 * Stores a refrence to the {@link tileStore} that contains all the tiles in the same column.
	 * @member tileOBJ#_column
	 * @type {tileStore}
	 * @private
	 */
	/**
	 * Stores a refrence to the {@link tileStore} that contains all the tiles in the same region.
	 * @member tileOBJ#_region
	 * @type {tileStore}
	 * @private
	 */
	/**
	 * Stores a copy of the X position.
	 * @readonly
	 * @member tileOBJ#_x
	 * @type {Number}
	 * @private
	 */
	/**
	 * Stores a copy of the Y position.
	 * @readonly
	 * @member tileOBJ#_y
	 * @type {Number}
	 * @private
	 */
	var _row, _col, _region, _x, _y;

	/**
	 * Gets all remaining valid tokens.
	 * @method tileOBJ#available
	 * @returns {number[]} some stuff.
	 */
	this.setup = function(row, col, region, x, y){
		_row = row;
		_col = col;
		_region = region;
		_x = x;
		_y = y;
		this.isSetup = true;
	}

	/**
	 * Gets the stored refrence to the {@link tileStore} that contains all the tiles in the same row.
	 * @method tileOBJ#getRow
	 * @returns {tileStore}
	 */
	this.getRow = function(){
		return _row;
	}

	/**
	 * Gets the stored refrence to the {@link tileStore} that contains all the tiles in the same column.
	 * @method tileOBJ#getCol
	 * @returns {tileStore}
	 */
	this.getCol = function(){
		return _col;
	}

	/**
	 * Gets the stored refrence to the {@link tileStore} that contains all the tiles in the same region.
	 * @method tileOBJ#getRegion
	 * @returns {tileStore}
	 */
	this.getRegion = function(){
		return _region;
	}

	/**
	 * Gets the stored copy of the X position.
	 * @readonly
	 * @method tileOBJ#getX
	 * @returns {Number}
	 */
	this.getX = function(){
		return _x;
	}

	/**
	 * Gets the stored copy of the Y position.
	 * @readonly
	 * @method tileOBJ#getY
	 * @returns {Number}
	 */
	this.getY = function(){
		return _y;
	}

	/**
	 * Stores the token value of this tile.
	 * @member tileOBJ#_value
	 * @type {Number}
	 * @private
	 */
	this._value = 1;

	/**
	 * Stores the type of this tile.
	 * @member tileOBJ#_value
	 * @type {Number}
	 * @private
	 */
	this._type = 1;

	/**
	 * Stores the type of this tile.
	 * @method tileOBJ#set
	 * @param {tokenENUM} val - The desired token for this tile.
	 * @param {tileOBJ.types} [type=tileOBJ.types.set] - (Optional) The desired type for this tile.
	 */
	this.set = function(val, type){
		this._value = val;
		if(typeof(type) == "undefined") this._type = tileOBJ.types.set
		else this._type = type;
	}

	/**
	 * Gets an object that represents the data in this {@link tileOBJ}.
	 * @method tileOBJ#get
	 * @returns {tokenENUM} object.token - The token that the tile currently is set to.
	 * @returns {tileOBJ.types} object.type - The type this tile currently is set to.
	 * @private
	 */
	this.get = function(){
		return {
			token: this._value,
			type: this._type
		}
	}

	/**
	 * Gets the [Type]{@link tileOBJ#types} of this tileOBJ.
	 * @readonly
	 * @method tileOBJ#getType
	 * @returns {Number}
	 */
	this.getType=function(){
		return this._type;
	}

	/**
	 * Sets the [Type]{@link tileOBJ#types} of this tileOBJ.
	 * @readonly
	 * @method tileOBJ#setType
	 * @returns {Number}
	 */
	this.setType=function(t){
		this._type = t;
	}

	
	/**
	 * Gets the [Token]{@link tokenENUM} of this tileOBJ.
	 * @readonly
	 * @method tileOBJ#getToken
	 * @returns {Number}
	 */
	this.getToken=function(){
		return this._value;
	}

	/**
	 * Sets the [Token]{@link tokenENUM} of this tileOBJ.
	 * @readonly
	 * @method tileOBJ#setToken
	 * @returns {Number}
	 */
	this.setToken=function(v){
		this._value = v;
		this._type = tileOBJ.types.set
	}

	/**
	 * Stores the tiles guesses as token values.
	 * @member tileOBJ#_guesses
	 * @type {tokenENUM[]}
	 */
	this._guesses = [];

	/**
	 * Stores a guess for this tile.
	 * @method tileOBJ#setGuess
	 * @param {tokenENUM} val - The desired token for this tile.
	 * @param {boolean} [state=true] - (Optional) The desired state of this guess for tile.
	 */
	this.setGuess = function(token, state){
		if(typeof(state) == "undefined") state = true;
		this._guesses[token] = state;

		this.checkGuessState();
	}

	/**
	 * This method is used in guess manipulation functions to check it the tiles type should be changed.
	 * @method tileOBJ#checkGuessState
	 * @private 
	 */
	this.checkGuessState = function(){
		//set counter for guess
		var count = 0;
		for (var i = 0; i < this._guesses.length; i++) {
			if(this._guesses[i] === true) count++;
		}
		if(this._type == tileOBJ.types.blank && count > 0) this._type = tileOBJ.types.guess;
		else if(this._type == tileOBJ.types.guess) this._type = tileOBJ.types.blank;
	}


	/**
	 * This function will unset the provided token.
	 * This is just a simple helper funtion that basicly calls instance.[setGuess]{@link tileOBJ#set}(token, false)
	 * @see {@link tileOBJ#setGuess}
	 * @method tileOBJ#unsetGuess
	 */
	this.unsetGuess = function(token){
		this._guesses[token] = false;
		this.checkGuessState();
	}

	/**
	 * Gets state of the token provided.
	 * @method tileOBJ#getGuess
	 * @param {tokenENUM} token - The token to retrieve state of.
	 * @return {boolean} If the token provided token is a guess on this tile and if it is an active guess.
	 */
	this.getGuess = function(token){
		if(typeof(this._guesses[token]) == "undefined") return false;
		if(this._guesses[token] === true) return true;
		return false;
	}

	/**
	 * Retreves all the guesses for the current tile in an array.
	 * @example
	 * [null,true,true,true,true,true,true,true,true,true]
	 * @method tileOBJ#getGuesses
	 * @return the array of guesses
	 */
	this.getGuesses = function(){
		return this._guesses;
	}

	/**
	 * Sets guesses using an array.
	 * @example
	 * tile = new Tile();
	 * ...
	 * var arr = [];
	 *
	 * // The array does not need to contain a value for all 9 tokens. Only values set in the array are touched.
	 * arr[tokenENUM.c] = true;
	 * arr[tokenENUM.d] = true;
	 * arr[tokenENUM.i] = true;
	 *
	 * // You can insure that a token is false by setting it in the array to false
	 * arr[tokenENUM.f] = false;
	 *
	 * console.log(arr);
	 * // Output: [null,null,null,true,true,null,false,null,null,true]
	 * tile.setGuesses(arr);
	 *
	 * console.log(tile.getGuesses());
	 * // Output: [null,false,false,true,true,false,false,false,false,true]
	 * @method tileOBJ#setGuesses
	 */
	this.setGuesses = function(data){
		if(Array.isArray(data)) {
			var guesses = this._guesses
			var check = function(token){
				if(data[token] === true || data[token] === false){
					guesses[token] = data[token];
				}
			}
			check(tokens.a);
			check(tokens.b);
			check(tokens.c);
			check(tokens.d);
			check(tokens.e);
			check(tokens.f);
			check(tokens.g);
			check(tokens.h);
			check(tokens.i);
			/*
			this._guesses[tokens.a] = data[tokens.a];
			this._guesses[tokens.b] = data[tokens.b];
			this._guesses[tokens.c] = data[tokens.c];
			this._guesses[tokens.d] = data[tokens.d];
			this._guesses[tokens.e] = data[tokens.e];
			this._guesses[tokens.f] = data[tokens.f];
			this._guesses[tokens.g] = data[tokens.g];
			this._guesses[tokens.h] = data[tokens.h];
			this._guesses[tokens.i] = data[tokens.i];
			*/
			if(this.getType != tileOBJ.types.set && this.getType != tileOBJ.types.locked) this.checkGuessState();
			return;
		}
		if(data !== true) data = false;
		this._guesses = [];
		this._guesses[tokens.a] = data;
		this._guesses[tokens.b] = data;
		this._guesses[tokens.c] = data;
		this._guesses[tokens.d] = data;
		this._guesses[tokens.e] = data;
		this._guesses[tokens.f] = data;
		this._guesses[tokens.g] = data;
		this._guesses[tokens.h] = data;
		this._guesses[tokens.i] = data;
		if(this.getType != tileOBJ.types.set && this.getType != tileOBJ.types.locked) this.checkGuessState();
	}
}



/**
 * Enum of Tile Types
 * @name Tile Types
 * @readonly
 * @prop {number} tileOBJ.types.blank 1
 * @prop {number} tileOBJ.types.set 2
 * @prop {number} tileOBJ.types.guess 3
 * @prop {number} tileOBJ.types.locked 4
 * @enum {number}
 * @see {@link tileOBJ#types}
 * @global
 */
/**
 * Enum of Tile Types
 * @prop {number} blank 1
 * @prop {number} set 2
 * @prop {number} guess 3
 * @prop {number} locked 4
 * @name tileOBJ.types
 * @readonly
 * @enum {number}
 */
tileOBJ.types = {
	blank: 1,
	set:2,
	guess:3,
	locked:4
}

module.exports = tileOBJ;
},{"./tokenENUM.js":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/**
 * @file tokenENUM Code
 * @author Ariel Lothlorien
 */

/**
 * Enum of Token Values
 * @readonly
 * @enum {number}
 */

/*
var tokenENUM = {
	a: 1,
	b: 2,
	c: 3,

	d: 4,
	e: 5,
	f: 6,

	g: 7,
	h: 8,
	i: 9
}
exports = tokenENUM
*/

exports.a = 1;
exports.b = 2;
exports.c = 3;

exports.d = 4;
exports.e = 5;
exports.f = 6;

exports.g = 7;
exports.h = 8;
exports.i = 9;
},{}]},{},[1]);
