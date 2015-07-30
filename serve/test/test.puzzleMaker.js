var expect = require("chai").expect;

var puzzleMaker = require("../public/javascripts/puzzleMaker.js");
var sudoku = require("../public/javascripts/sudokuOBJ.js");
var tileStore = require("../public/javascripts/tileStore.js");
var tileOBJ = require("../public/javascripts/tileOBJ.js");

var tokens = require("../public/javascripts/tokenENUM.js");

describe("Puzzle Maker", function() {

	//var su = null;
	var puzzle = null;

	beforeEach(function(done) {
		//su = new sudoku(); //should not need this
		//su = null; //Debug setup expectation
		//expect(su).not.to.be.null; //Test setup expectation

		puzzle = new puzzleMaker();
		expect(puzzle).not.to.be.null;
		done();
	})

	it("should instansiate", function(done){
		expect(puzzle).not.to.be.null;
		expect(puzzle).to.be.instanceof(puzzleMaker);
		done();
	})
})