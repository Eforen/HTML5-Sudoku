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
		return this.getRow(y).tiles[x];
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