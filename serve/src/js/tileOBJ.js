console.log("Loaded tileOBJ.js");

var tokens = require("./tokenENUM.js");

/**
 * This object stores data to describe a tile in the sudoku.
 * @todo Document this object
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
	//row.tiles[rowP] = this;
	//col.tiles[colP] = this;
	//var areaP = parseInt(rowP/3) + parseInt(colP % 3);
	//area = 
	//TODO: Make Areas make sense!
	
	//this.tiles = [];

	/**
	 * Stores the tiles guesses as token values.
	 * @member tileOBJ#_guesses
	 * @type {tokenENUM[]}
	 * @private
	 */
	var _guesses = [];

	/**
	 * Stores the type of this tile.
	 * @method tileOBJ#set
	 * @param {tokenENUM} val - The desired token for this tile.
	 * @param {tileOBJ.types} [type=tileOBJ.types.set] - (Optional) The desired type for this tile.
	 */
	this.setGuess = function(token, state){
		if(typeof(state) == "undefined") state = true;
		_guesses[token] = state;

		this.checkGuessState();
	}

	/**
	 * @todo Document this method
	 * @method tileOBJ#checkGuessState
	 */
	this.checkGuessState = function(){
		//set counter for guess
		var count = 0;
		for (var i = 0; i < _guesses.length; i++) {
			if(_guesses[i] === true) count++;
		}
		if(count > 0) this._type = tileOBJ.types.guess;
		else if(this._type == tileOBJ.types.guess) this._type = tileOBJ.types.blank;
	}


	/**
	 * @todo Document this method
	 * @method tileOBJ#unsetGuess
	 */
	this.unsetGuess = function(token){
		_guesses[token] = false;
		this.checkGuessState();
	}

	/**
	 * @todo Document this method
	 * @method tileOBJ#getGuess
	 */
	this.getGuess = function(token){
		if(typeof(_guesses[token]) == "undefined") return false;
		if(_guesses[token] === true) return true;
		return false;
	}

	/**
	 * @todo Document this method
	 * @method tileOBJ#getGuesses
	 */
	this.getGuesses = function(){
		return _guesses;
	}

	/**
	 * @todo Document this method
	 * @method tileOBJ#setGuesses
	 */
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

/**
 * Enum of Tile Types
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