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