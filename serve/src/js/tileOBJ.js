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