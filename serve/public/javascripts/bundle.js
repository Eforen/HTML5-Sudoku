(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./sudokuOBJ.js":2,"./sudokuSolver.js":3,"./tokenENUM.js":6}],2:[function(require,module,exports){
console.log("Loaded SudokuOBJ.js");
var tileStore = require("./tileStore.js");
var tileOBJ   = require("./tileOBJ.js");
var token = require("./tokenENUM.js");

var sudokuOBJ = function(){
	var rows = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];
	var cols = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];
	var regions = [
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore(),
		new tileStore(), new tileStore(), new tileStore()
		];


	this.getRows=function(){
		return rows;
	}

	this.getRow=function(index){
		return rows[index];
	}

	this.getCols=function(){
		return cols;
	}

	this.getCol=function(index){
		return cols[index];
	}

	this.getRegions=function(){
		return regions;
	}

	this.getRegion=function(posX, posY){
		if(typeof posY === "undefined") return regions[posX];

		posX = parseInt(posX/3);
		posY = parseInt(posY/3);
		return regions[3*posY+posX];
	}

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

	this.getTile = function(x, y){
		var r = this.getRow(y)
		return r.tiles[x];
	}

	this.debugDataSet = function(data){
		var r = "|"
		for (var i = 0; i < data.length; i++) {
			if(data == null) continue
			if(data[i].getType() === tileOBJ.types.locked || data[i].getType() === tileOBJ.types.set) r += data[i].getToken()
			if(data[i].getType() === tileOBJ.types.guess){
				for (var n = 1; n <= 9; n++) {
					if(data[i].getGuess(n)) r += n
				}
			}
			r += "|"
		}
		return r
	}

	this.debugRow = function(y){
		return this.debugDataSet(this.getRow(y).tiles)
	}

	this.debugCol = function(x){
		return this.debugDataSet(this.getCol(x).tiles)
	}

	this.debugRegion = function(x, y){
		return this.debugDataSet(this.getRegion(x, y).tiles)
	}

	this.getStructure = function(){
		/*
*---*---*---*
|043|000|620|
|700|403|008|
|600|208|007|
*---+---+---*
|075|000|340|
|000|000|000|
|098|000|570|
*---+---+---*
|900|507|003|
|100|602|005|
|087|000|260|
*---*---*---*
		*/
		
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

module.exports = sudokuOBJ;
},{"./tileOBJ.js":4,"./tileStore.js":5,"./tokenENUM.js":6}],3:[function(require,module,exports){
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
		this.excludeInSet(tile.getRow());
	}

	this.solveForCol = function(x, y){
		//var col = su.getCol(x);
		var tile = su.getTile(x, y);
		this.excludeInSet(tile.getCol());
	}

	this.solveForRegion = function(x, y){
		//var region = su.getRegion(parseInt(x/3)-1, parseInt(y/3)-1);
		var tile = su.getTile(x, y);
		this.excludeInSet(tile.getRegion());
	}

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

	this.excludeInSet = function(container){
		var data = []

		//run through set and mark all present tokens as false in data set leave all others null
		for (var i = 0; i < container.tiles.length; i++) {
			//If tile is guess then skip it
			if(container.tiles[i].getType() === tileOBJ.types.guess){
				continue
			}
			//If tile is set then set data as false
			if(container.tiles[i].getType() == tileOBJ.types.locked || container.tiles[i].getType() == tileOBJ.types.set){
				data[container.tiles[i].getToken()] = false
			}
		}

		//Kill all bad guesses with the data array
		for (var i = 0; i < container.tiles.length; i++)
			if(container.tiles[i].getType() === tileOBJ.types.guess)
				container.tiles[i].setGuesses(data)
		
	}

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

	this.solvePassBasic = function(){
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				//if(y === 7) console.log("Solving For r"+9+" c"+x)
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
			this.excludeGuess(regions[i], true)
		}
	}
	this.solveRowExclusion = function(){
		//var row = this.getSudoku().getRows()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(this.getSudoku().getRow(i), true, i === 6)
		}
	}

	/*

	this.solveColExclusion = function(){
		var col = this.getSudoku().getCols()
		for (var i = 0; i < 9; i++) {
			this.excludeGuess(col[i], true)
		}
	}
	*/

	//Start of Constructor

	this.prepSudoku();

	//End of Constructor
}

module.exports = sudokuSolver;
},{"./sudokuOBJ.js":2,"./tileOBJ.js":4,"./tileStore.js":5,"./tokenENUM.js":6}],4:[function(require,module,exports){
console.log("Loaded tileOBJ.js");

var tokens = require("./tokenENUM.js");
//as
var tileOBJ = function(){
	this.isSetup = false;



	var _row, _col, _region, _x, _y;
	this.setup = function(row, col, region, x, y){
		_row = row;
		_col = col;
		_region = region;
		_x = x;
		_y = y;
		this.isSetup = true;
	}

	this.getRow = function(){
		return _row;
	}

	this.getCol = function(){
		return _col;
	}

	this.getRegion = function(){
		return _region;
	}

	this.getX = function(){
		return _x;
	}

	this.getY = function(){
		return _y;
	}

	this._value = 1;
	this._type = 1;

	this.set = function(val, type){
		this._value = val;
		if(typeof(type) == "undefined") this._type = tileOBJ.types.set
		else this._type = type;
	}
	this.get = function(){
		return {
			token: this._value,
			type: this._type
		}
	}

	this.getType=function(){
		return this._type;
	}
	this.setType=function(t){
		this._type = t;
	}

	this.getToken=function(){
		return this._value;
	}

	this.setToken=function(v){
		this._value = v;
		this._type = tileOBJ.types.set
	}
	//row.tiles[rowP] = this;
	//col.tiles[colP] = this;
	//var areaP = parseInt(rowP/3) + parseInt(colP % 3);
	//area = 
	//TODO: Make Areas make sense!
	
	//this.tiles = [];

	var _guesses = [];

	this.setGuess = function(token, state){
		if(typeof(state) == "undefined") state = true;
		_guesses[token] = state;

		this.checkGuessState();
	}

	this.checkGuessState = function(){
		//set counter for guess
		var count = 0;
		for (var i = 0; i < _guesses.length; i++) {
			if(_guesses[i] === true) count++;
		}
		if(count > 0) this._type = tileOBJ.types.guess;
		else if(this._type == tileOBJ.types.guess) this._type = tileOBJ.types.blank;
	}

	this.unsetGuess = function(token){
		_guesses[token] = false;
		this.checkGuessState();
	}

	this.getGuess = function(token){
		if(typeof(_guesses[token]) == "undefined") return false;
		if(_guesses[token] === true) return true;
		return false;
	}
	this.getGuesses = function(){
		return _guesses;
	}

	this.setGuesses = function(data){
		if(Array.isArray(data)) {
			var check = function(token){
				if(data[token] === true || data[token] === false){
					_guesses[token] = data[token];
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
			_guesses[tokens.a] = data[tokens.a];
			_guesses[tokens.b] = data[tokens.b];
			_guesses[tokens.c] = data[tokens.c];
			_guesses[tokens.d] = data[tokens.d];
			_guesses[tokens.e] = data[tokens.e];
			_guesses[tokens.f] = data[tokens.f];
			_guesses[tokens.g] = data[tokens.g];
			_guesses[tokens.h] = data[tokens.h];
			_guesses[tokens.i] = data[tokens.i];
			*/
			this.checkGuessState();
			return;
		}
		if(data !== true) data = false;
		_guesses = [];
		_guesses[tokens.a] = data;
		_guesses[tokens.b] = data;
		_guesses[tokens.c] = data;
		_guesses[tokens.d] = data;
		_guesses[tokens.e] = data;
		_guesses[tokens.f] = data;
		_guesses[tokens.g] = data;
		_guesses[tokens.h] = data;
		_guesses[tokens.i] = data;
		this.checkGuessState();
	}
}

tileOBJ.types = {
	blank: 1,
	set:2,
	guess:3,
	locked:4
}

module.exports = tileOBJ;
},{"./tokenENUM.js":6}],5:[function(require,module,exports){
console.log("Loaded tileStore.js");

module.exports = function(){
	this.available = function(){
		var av = [];
		for (var i = 0; i < 9; i++) {
			if(i in this.tiles) av[i] = false;
			else av[i] = true;
		}
		return av;
	}
	
	this.tiles = [];
}
},{}],6:[function(require,module,exports){
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
