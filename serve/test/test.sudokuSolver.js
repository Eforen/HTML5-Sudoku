var expect = require("chai").expect;
var sudokuSolver = require("../public/javascripts/sudokuSolver.js");
var sudokuOBJ = require("../public/javascripts/sudokuOBJ.js");
var tileStore = require("../public/javascripts/tileStore.js");
var tileOBJ = require("../public/javascripts/tileOBJ.js");

var tokens = require("../public/javascripts/tokenENUM.js");

describe("sudoku solver", function() {

	var su = null;
	var solve = null;

	beforeEach(function(done) {
		var test = {
			name: "Simple Test",	
			puzzle: "043000620700403008600208007075000340000000000098000570900507003100602005087000260"
		}

		su = sudokuOBJ.loadFromOBJ(test);
		//su = null; //Debug setup expectation
		expect(su).not.to.be.null; //Test setup expectation
		expect(su).to.be.instanceof(sudokuOBJ); //Test setup expectation

		solve = new sudokuSolver(su);
		expect(solve).not.to.be.null; //Test setup expectation
		expect(solve).to.be.instanceof(sudokuSolver); //Test setup expectation

		done();
	})

	it("should instansiate and be available", function(done){
		expect(solve).not.to.be.null;
		expect(solve).to.be.instanceof(sudokuSolver); //Test setup expectation
		done();
	})

	it("it should contain the sudoku provided before", function(done){
		expect(solve.getSudoku()).to.be(su);
		done();
	})

	it("should prep object sudoku by filling every tile with all guesses", function(done){

		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
			}
		}
		done();
	})


})