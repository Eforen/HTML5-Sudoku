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
		solve.getSudoku().getTile(1,1).setType(tileOBJ.types.locked)
		expect(solve.getSudoku()).to.be.equal(su);
		expect(su.getTile(1,1).getType()).to.be.equal(tileOBJ.types.locked);
		done();
	})

	it("should prep object sudoku by filling every tile with all guesses", function(done){
		var tile;
		var val = true;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				tile = solve.getSudoku().getTile(x,y);
				//tile = su.getTile(x,y);
				val = true;
				if(tile.getType() == tileOBJ.types.locked) val = false;

				expect(tile.getGuess(tokens.a)).to.equal(val);
				expect(tile.getGuess(tokens.b)).to.equal(val);
				expect(tile.getGuess(tokens.c)).to.equal(val);
				expect(tile.getGuess(tokens.d)).to.equal(val);
				expect(tile.getGuess(tokens.e)).to.equal(val);
				expect(tile.getGuess(tokens.f)).to.equal(val);
				expect(tile.getGuess(tokens.g)).to.equal(val);
				expect(tile.getGuess(tokens.h)).to.equal(val);
				expect(tile.getGuess(tokens.i)).to.equal(val);
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
		solve.solveForRow(0,0);
		tile = solve.getSudoku().getTile(0,0);
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(false); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(true); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(true); // 9
		done()
	})

	it("should remove all guesses of tile that are in col", function(done){
		solve.solveForCol(0,0);
		tile = solve.getSudoku().getTile(0,0);
		expect(tile.getGuess(tokens.a)).to.equal(false); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(true); // 3
		expect(tile.getGuess(tokens.d)).to.equal(true); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9
		done()
	})

	// 0 d c
	// g 0 0
	// f 0 0
	it("should remove all guesses of tile that are in region", function(done){
		solve.solveForRegion(0,0);
		tile = solve.getSudoku().getTile(0,0);
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(true); // 9
		done()
	})

	it("pass #01 basic solve", function(done){
		/* Checks each guess agenst every other tile
		   that is SET or LOCKED in the
		   posibility space (ROW, COL or REGION) */

		solve.solvePassBasic();
		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|043|000|620|\n"+
											"|700|403|008|\n"+
											"|600|208|007|\n"+
											"*---+---+---*\n"+
											"|075|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|005|\n"+
											"|087|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #02 basic solve", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|043|000|620|\n"+
											"|700|403|008|\n"+
											"|600|208|007|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|005|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #03 basic solve", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|403|008|\n"+
											"|600|208|007|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|005|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #04 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|403|008|\n"+
											"|600|208|007|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|005|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #05 Region Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();

		/*********************************************
		Checks each tiles guesses agenst all other
		tiles GUESSES in the same posibility REGION and sets it if there
		are no other tiles with that guess in them in
		the same region
		*********************************************/

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|070|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|705|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #06 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|070|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|507|003|\n"+
											"|134|602|705|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #07 Row Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();

		/*********************************************
		Checks each tiles guesses agenst all other
		tiles GUESSES in the same posibility ROW and sets it if there
		are no other tiles with that guess in them in
		the same region
		*********************************************/


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|700|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #08 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|700|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #09 Col Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();

		/*********************************************
		Checks each tiles guesses agenst all other
		tiles GUESSES in the same posibility COL and sets it if there
		are no other tiles with that guess in them in
		the same region
		*********************************************/


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|750|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #10 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|750|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #12 region Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|750|000|\n"+
											"|098|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #13 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|750|000|\n"+
											"|098|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #14 region Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|098|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #13 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();


		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #14 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #15 region Exclusion", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #16 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|020|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #17 Region Exclusion Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #18 Basic Pass should show no change in set", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|002|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #19 Row Exclusion Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|902|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #20 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|620|\n"+
											"|700|463|158|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|902|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #21 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|075|629|\n"+
											"|720|463|158|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|902|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|900|547|803|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #22 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|300|754|902|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|960|547|813|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #23 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|310|754|982|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|930|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #24 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|310|754|982|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|930|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #25 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|810|340|\n"+
											"|316|754|982|\n"+
											"|498|320|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|931|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #26 Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|810|346|\n"+
											"|316|754|982|\n"+
											"|498|326|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|931|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #27 Solve with one final Basic Pass", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic();
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		structure = solve.getSudoku().getstructure();
		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|175|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|819|346|\n"+
											"|316|754|982|\n"+
											"|498|326|571|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|931|264|\n"+
											"*---*---*---*\n");
		done()
	})
})