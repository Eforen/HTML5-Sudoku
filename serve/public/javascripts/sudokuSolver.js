console.log("Loaded SudokuSolver.js");
var sudokuOBJ = require("./sudokuOBJ.js");
var tileStore = require("./tileStore.js");
var tileOBJ   = require("./tileOBJ.js");
var token = require("./tokenENUM.js");

var sudokuSolver = function(sudoku){
	var su = sudoku;
	this.getSudoku = function(){
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

		return su;
	}

	this.solveForRow = function(x, y){
		var row = su.getRow(y);
		var tile = su.getTile(x, y);
		this.excludeSet(tile, row);
	}

	this.solveForCol = function(x, y){
		var col = su.getCol(x);
		var tile = su.getTile(x, y);
		this.excludeSet(tile, col);
	}

	this.solveForRegion = function(x, y){
		var region = su.getRegion(parseInt(x/3), parseInt(y/3));
		var tile = su.getTile(x, y);
		this.excludeSet(tile, region);
	}

	this.excludeSet = function(tile, container){
		for (var i = 0; i < container.tiles.length; i++) {
			if(container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set){
				tile.setGuess(container.tiles[i].getToken(), false);
			}
		}
	}
}

module.exports = sudokuSolver;