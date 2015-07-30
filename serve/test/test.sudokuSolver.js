var expect = require("chai").expect;
var sudoku = require("../public/javascripts/sudokuOBJ.js");
var tileStore = require("../public/javascripts/tileStore.js");
var tileOBJ = require("../public/javascripts/tileOBJ.js");

var tokens = require("../public/javascripts/tokenENUM.js");

describe("sudoku solver", function() {

	var su = null;

	beforeEach(function(done) {
		var test = [
			["0", "4", "3", "0", "0", "0", "6", "2", "0"],
			["7", "0", "0", "4", "0", "3", "0", "0", "8"],
			["6", "0", "0", "2", "0", "8", "0", "0", "7"],
			["0", "7", "5", "0", "0", "0", "3", "4", "0"],
			["0", "0", "0", "0", "0", "0", "0", "0", "0"],
			["0", "9", "8", "0", "0", "0", "5", "7", "0"],
			["9", "0", "0", "5", "0", "7", "0", "0", "3"],
			["1", "0", "0", "6", "0", "2", "0", "0", "5"],
			["0", "8", "7", "0", "0", "0", "2", "6", "0"]
		]

		su = sudoku.loadFromJSON(test);
		//su = null; //Debug setup expectation
		expect(su).not.to.be.null; //Test setup expectation
		done();
	})

	it("should instansiate and be available", function(done){
		expect(su).not.to.be.null;
		done();
	})

})