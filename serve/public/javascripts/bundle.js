(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var su = require("./sudokuOBJ.js");
},{"./sudokuOBJ.js":2}],2:[function(require,module,exports){
console.log("Loaded SudokuOBJ.js");
var tileStore = require("./tileStore.js");

module.exports = function(){
	var rows = new tileStore();
	var cols = new tileStore();
	var area = new tileStore();
}
},{"./tileStore.js":3}],3:[function(require,module,exports){
console.log("Loaded tileStore.js");

module.exports = function(){
	this.available = function(){
		var av = [];
		for (var i = 0; i < 9; i++) {
			if(i in this.tiles) av[i] = false;
			else av[i] = true;
		};
		return av;
	}
	
	this.tiles = [];
}
},{}]},{},[1]);
