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
		var tile;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				tile = su.getTile(x,y);
				expect(tile.getGuess(tokens.a)).to.equal(true);
				expect(tile.getGuess(tokens.b)).to.equal(true);
				expect(tile.getGuess(tokens.c)).to.equal(true);
				expect(tile.getGuess(tokens.d)).to.equal(true);
				expect(tile.getGuess(tokens.e)).to.equal(true);
				expect(tile.getGuess(tokens.f)).to.equal(true);
				expect(tile.getGuess(tokens.g)).to.equal(true);
				expect(tile.getGuess(tokens.h)).to.equal(true);
				expect(tile.getGuess(tokens.i)).to.equal(true);
			}
		}
		done();
	})

	// 0dc 000 fb0
	// g00 d0c 00h
	// f00 b0h 00g

	// 0ge 000 cd0
	// 000 000 000
	// 0ih 000 eg0

	// i00 e0g 00c
	// a00 f0b 00e
	// 0hg 000 bf0

	it("should remove all guesses of tile that are in row", function(done){
		solve.solveRow(0,0);
		tile = su.getTile(x,y);
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(false); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(true); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(true); // 9
	})

	it("should remove all guesses of tile that are in col", function(done){
		solve.solveRow(0,0);
		tile = su.getTile(x,y);
		expect(tile.getGuess(tokens.a)).to.equal(false); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(true); // 3
		expect(tile.getGuess(tokens.d)).to.equal(true); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9
	})

	// 0 d c
	// g 0 0
	// f 0 0
	it("should remove all guesses of tile that are in region", function(done){
		solve.solveRow(0,0);
		tile = su.getTile(x,y);
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(true); // 9
	})


})