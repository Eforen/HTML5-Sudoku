console.log("Loaded SudokuSolver.js");
var sudokuOBJ = require("./sudokuOBJ.js");
var tileStore = require("./tileStore.js");
var tileOBJ   = require("./tileOBJ.js");
var token = require("./tokenENUM.js");

var sudokuSolver = function(sudoku){
	//Private Vars
	var su = sudoku;

	//Public Vars

	//Methods
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


	this.getSudoku = function(){
		return su;
	}

	this.solveForRow = function(x, y){
		//var row = su.getRow(y);
		var tile = su.getTile(x, y);
		this.excludeSet(tile, tile.getRow());
	}

	this.solveForCol = function(x, y){
		//var col = su.getCol(x);
		var tile = su.getTile(x, y);
		this.excludeSet(tile, tile.getCol());
	}

	this.solveForRegion = function(x, y){
		//var region = su.getRegion(parseInt(x/3)-1, parseInt(y/3)-1);
		var tile = su.getTile(x, y);
		this.excludeSet(tile, tile.getRegion());
	}

	this.excludeSet = function(tile, container){
		for (var i = 0; i < container.tiles.length; i++) {
			if(container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set){
				tile.setGuess(container.tiles[i].getToken(), false);
			}
		}
	}

	this.excludeGuess = function(container){
		for (var n = 1; n < 10; n++) {
			var inMoreThenOne = 0
			var index = 0
			for (var i = 0; i < container.tiles.length; i++) {
				if(container.tiles[i].getType() === tileOBJ.types.guess){
					if(container.tiles[i].getGuess(n)){
						inMoreThenOne++
						index = i
					}
				}
				/*
				if(container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set){
					if(container.tiles[i].getGuess(n)){
						inMoreThenOne++
						index = i
					}
				}
				*/
			}
			if(inMoreThenOne === 1){
				//console.log("found one")
				container.tiles[index].setToken(n)
				container.tiles[index].setType(tileOBJ.types.set)
			}
		}
	}

	this.solvePassBasic = function(){
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				this.solveForRow(x, y)
				this.solveForCol(x, y)
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

	this.solveRegionExclusion = function(){
		var regions = this.getSudoku().getRegions()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(regions[i])
		}
	}
	this.solveRowExclusion = function(){
		//var row = this.getSudoku().getRows()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(this.getSudoku().getRow(i))
		}
	}

	/*

	this.solveColExclusion = function(){
		var col = this.getSudoku().getCols()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(col[i])
		}
	}
	*/

	//Start of Constructor

	this.prepSudoku();

	//End of Constructor
}

module.exports = sudokuSolver;