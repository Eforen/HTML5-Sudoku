var expect = require("chai").expect;

var puzzleMaker = require("../src/js/puzzleMaker.js");
var sudoku = require("../src/js/sudokuOBJ.js");
var tileStore = require("../src/js/tileStore.js");
var tileOBJ = require("../src/js/tileOBJ.js");

var tokens = require("../src/js/tokenENUM.js");

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