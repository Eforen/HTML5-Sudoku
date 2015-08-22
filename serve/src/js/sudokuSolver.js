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