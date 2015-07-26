console.log("Loaded tileOBJ.js");

var tokens = require("../public/javascripts/tokenENUM.js");

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

	this.setTo = function(val, type){

	}
	//row.tiles[rowP] = this;
	//col.tiles[colP] = this;
	//var areaP = parseInt(rowP/3) + parseInt(colP % 3);
	//area = 
	//TODO: Make Areas make sense!
	
	//this.tiles = [];
}

tileOBJ.types = {
	blank,
	set,
	planned
}

module.exports = tileOBJ;