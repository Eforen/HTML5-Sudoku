var expect = require("chai").expect;
var sudokuSolver = require("../src/js/sudokuSolver.js");
var sudokuOBJ = require("../src/js/sudokuOBJ.js");
var tileStore = require("../src/js/tileStore.js");
var tileOBJ = require("../src/js/tileOBJ.js");

var tokens = require("../src/js/tokenENUM.js");

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


		expect(su.debugRow(0)).to.equal("|123456789|4|3|123456789|123456789|123456789|6|2|123456789|")
		expect(su.debugRow(1)).to.equal("|7|123456789|123456789|4|123456789|3|123456789|123456789|8|")
		expect(su.debugRow(2)).to.equal("|6|123456789|123456789|2|123456789|8|123456789|123456789|7|")
		expect(su.debugRow(3)).to.equal("|123456789|7|5|123456789|123456789|123456789|3|4|123456789|")
		expect(su.debugRow(4)).to.equal("|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		expect(su.debugRow(5)).to.equal("|123456789|9|8|123456789|123456789|123456789|5|7|123456789|")
		expect(su.debugRow(6)).to.equal("|9|123456789|123456789|5|123456789|7|123456789|123456789|3|")
		expect(su.debugRow(7)).to.equal("|1|123456789|123456789|6|123456789|2|123456789|123456789|5|")
		expect(su.debugRow(8)).to.equal("|123456789|8|7|123456789|123456789|123456789|2|6|123456789|")
		
		expect(solve.getSudoku().getTile(0,0).getType()).to.equal(tileOBJ.types.guess)

		var val = true;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				tile = solve.getSudoku().getTile(x,y);
				//tile = su.getTile(x,y);
				val = true;

				expect(tile.getType()).to.not.equal(tileOBJ.types.blank)

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
		//Confirming Start state
		expect(su.debugRow(0)).to.equal("|123456789|4|3|123456789|123456789|123456789|6|2|123456789|")
		//expect(su.debugRow(1)).to.equal("|7|123456789|123456789|4|123456789|3|123456789|123456789|8|")
		expect(solve.getSudoku().getTile(0,0).getType()).to.equal(tileOBJ.types.guess)

		solve.solveForRow(0);
		solve.solveForRow(1);
		solve.solveForRow(2);
		solve.solveForRow(3);
		solve.solveForRow(4);
		solve.solveForRow(5);
		solve.solveForRow(6);
		solve.solveForRow(7);
		solve.solveForRow(8);

		expect(solve.getSudoku().getTile(0,0).getType()).to.equal(tileOBJ.types.guess)

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

		expect(solve.getSudoku().debugRow(0)).to.equal("|15789|4|3|15789|15789|15789|6|2|15789|")
		expect(su.debugRow(1)).to.equal("|7|12569|12569|4|12569|3|12569|12569|8|")
		expect(su.debugRow(2)).to.equal("|6|13459|13459|2|13459|8|13459|13459|7|")
		expect(su.debugRow(3)).to.equal("|12689|7|5|12689|12689|12689|3|4|12689|")
		expect(su.debugRow(4)).to.equal("|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		expect(su.debugRow(5)).to.equal("|12346|9|8|12346|12346|12346|5|7|12346|")
		expect(su.debugRow(6)).to.equal("|9|12468|12468|5|12468|7|12468|12468|3|")
		expect(su.debugRow(7)).to.equal("|1|34789|34789|6|34789|2|34789|34789|5|")
		expect(su.debugRow(8)).to.equal("|13459|8|7|13459|13459|13459|2|6|13459|")
		done()
	})

	it("should remove all guesses of tile that are in col", function(done){
		//check start start state
		expect(su.debugRow(0)).to.equal("|123456789|4|3|123456789|123456789|123456789|6|2|123456789|")
		//expect(su.debugRow(1)).to.equal("|7|123456789|123456789|4|123456789|3|123456789|123456789|8|")
		//expect(su.debugRow(2)).to.equal("|6|123456789|123456789|2|123456789|8|123456789|123456789|7|")
		//expect(su.debugRow(3)).to.equal("|123456789|7|5|123456789|123456789|123456789|3|4|123456789|")
		//expect(su.debugRow(4)).to.equal("|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		//expect(su.debugRow(5)).to.equal("|123456789|9|8|123456789|123456789|123456789|5|7|123456789|")
		//expect(su.debugRow(6)).to.equal("|9|123456789|123456789|5|123456789|7|123456789|123456789|3|")
		//expect(su.debugRow(7)).to.equal("|1|123456789|123456789|6|123456789|2|123456789|123456789|5|")
		//expect(su.debugRow(8)).to.equal("|123456789|8|7|123456789|123456789|123456789|2|6|123456789|")

		solve.solveForCol(0);
		//solve.solveForCol(1);
		//solve.solveForCol(2);
		//solve.solveForCol(3);
		//solve.solveForCol(4);
		//solve.solveForCol(5);
		//solve.solveForCol(6);
		//solve.solveForCol(7);
		//solve.solveForCol(8);

		tile = solve.getSudoku().getTile(0,0);
		//expect(tile.getGuess(tokens.a)).to.equal(false); // 1
		//expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		//expect(tile.getGuess(tokens.c)).to.equal(true); // 3
		//expect(tile.getGuess(tokens.d)).to.equal(true); // 4
		//expect(tile.getGuess(tokens.e)).to.equal(true); // 5
		//expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		//expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		//expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		//expect(tile.getGuess(tokens.i)).to.equal(false); // 9

		expect()
		expect(su.debugCol(0)).to.equal("|23458|7|6|23458|23458|23458|9|1|23458|")
		//expect(su.debugRow(0)).to.equal("|23458|4|3|123456789|123456789|123456789|6|2|123456789|")
		//expect(su.debugRow(1)).to.equal("|7|123456789|123456789|4|123456789|3|123456789|123456789|8|")
		//expect(su.debugRow(2)).to.equal("|6|123456789|123456789|2|123456789|8|123456789|123456789|7|")
		//expect(su.debugRow(3)).to.equal("|23458|7|5|123456789|123456789|123456789|3|4|123456789|")
		//expect(su.debugRow(4)).to.equal("|23458|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		//expect(su.debugRow(5)).to.equal("|23458|9|8|123456789|123456789|123456789|5|7|123456789|")
		//expect(su.debugRow(6)).to.equal("|9|123456789|123456789|5|123456789|7|123456789|123456789|3|")
		//expect(su.debugRow(7)).to.equal("|1|123456789|123456789|6|123456789|2|123456789|123456789|5|")
		//expect(su.debugRow(8)).to.equal("|23458|8|7|123456789|123456789|123456789|2|6|123456789|")
		done()
	})

	// 0 d c
	// g 0 0
	// f 0 0
	it("should remove all guesses of tile that are in region", function(done){
		solve.solveForRegion(0);
		solve.solveForRegion(1);
		solve.solveForRegion(2);
		solve.solveForRegion(3);
		solve.solveForRegion(4);
		solve.solveForRegion(5);
		solve.solveForRegion(6);
		solve.solveForRegion(7);
		solve.solveForRegion(8);

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

		expect(su.debugRegion(0)).to.equal("|12589|4|3|7|12589|12589|6|12589|12589|")
		expect(su.debugRegion(1)).to.equal("|15679|15679|15679|4|15679|3|2|15679|8|")
		expect(su.debugRegion(2)).to.equal("|6|2|13459|13459|13459|8|13459|13459|7|")
		expect(su.debugRegion(3)).to.equal("|12346|7|5|12346|12346|12346|12346|9|8|")
		expect(su.debugRegion(4)).to.equal("|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		expect(su.debugRegion(5)).to.equal("|3|4|12689|12689|12689|12689|5|7|12689|")
		expect(su.debugRegion(6)).to.equal("|9|23456|23456|1|23456|23456|23456|8|7|")
		expect(su.debugRegion(7)).to.equal("|5|13489|7|6|13489|2|13489|13489|13489|")
		expect(su.debugRegion(8)).to.equal("|14789|14789|3|14789|14789|5|2|6|14789|")

		//expect(su.debugRow(0)).to.equal("|123456789|4|3|123456789|123456789|123456789|6|2|123456789|")
		//expect(su.debugRow(1)).to.equal("|7|123456789|123456789|4|123456789|3|123456789|123456789|8|")
		//expect(su.debugRow(2)).to.equal("|6|123456789|123456789|2|123456789|8|123456789|123456789|7|")
		//expect(su.debugRow(3)).to.equal("|123456789|7|5|123456789|123456789|123456789|3|4|123456789|")
		//expect(su.debugRow(4)).to.equal("|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|123456789|")
		//expect(su.debugRow(5)).to.equal("|123456789|9|8|123456789|123456789|123456789|5|7|123456789|")
		//expect(su.debugRow(6)).to.equal("|9|123456789|123456789|5|123456789|7|123456789|123456789|3|")
		//expect(su.debugRow(7)).to.equal("|1|123456789|123456789|6|123456789|2|123456789|123456789|5|")
		//expect(su.debugRow(8)).to.equal("|123456789|8|7|123456789|123456789|123456789|2|6|123456789|")

		done()
	})

	it("pass #01 basic solve", function(done){
		/* Checks each guess agenst every other tile
		   that is SET or LOCKED in the
		   posibility space (ROW, COL or REGION) */

		/* Blank Starter Test
		expect(su.debugRow(0)).to.equal("||4|3||||6|2||")
		expect(su.debugRow(1)).to.equal("|7|||4||3|||8|")
		expect(su.debugRow(2)).to.equal("|6|||2||8|||7|")
		expect(su.debugRow(3)).to.equal("||7|5||||3|4||")
		expect(su.debugRow(4)).to.equal("||||||||||")
		expect(su.debugRow(5)).to.equal("||9|8||||5|7||")
		expect(su.debugRow(6)).to.equal("|9|||5||7|||3|")
		expect(su.debugRow(7)).to.equal("|1|||6||2|||5|")
		expect(su.debugRow(8)).to.equal("||8|7||||2|6||")
		*/

		solve.solvePassBasic();

		expect(su.debugRow(0)).to.equal("|58|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|1569|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|149|1359|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|12689|169|3|4|1269|")
		expect(su.debugRow(4)).to.equal("|234|1236|1246|13789|123456789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|234|9|8|13|12346|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|246|5|148|7|148|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|3489|2|4789|89|5|")
		expect(su.debugRow(8)).to.equal("|345|8|7|139|1349|149|2|6|149|")

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
											"|087|000|260|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #02 basic solve", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		expect(su.debugRow(0)).to.equal("|58|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|1569|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|149|1359|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|1689|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|123456789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|12346|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|148|7|148|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|789|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")
/*

		expect(su.debugRow(0)).to.equal("|58|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|1569|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|149|1359|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|12689|169|3|4|1269|")
		expect(su.debugRow(4)).to.equal("|234|1236|1246|13789|123456789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|234|9|8|13|12346|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|246|5|148|7|148|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|2489|2|4789|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")
*/
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|1569|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|149|1359|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|1689|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|123456789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|12346|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|148|7|148|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|789|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")
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

		// *********************************************
		// Checks each tiles guesses agenst all other
		// tiles GUESSES in the same posibility REGION and sets it if there
		// are no other tiles with that guess in them in
		// the same region
		// *********************************************


		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|6|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|1689|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|123456789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|12346|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|148|7|148|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|6|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|12345789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|1234|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|148|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
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

		// *********************************************
		// Checks each tiles guesses agenst all other
		// tiles GUESSES in the same posibility ROW and sets it if there
		// are no other tiles with that guess in them in
		// the same region
		// *********************************************

		/*
		row = solve.getSudoku().getRow(6)
		tile = row.tiles[0];
		expect(tile.getToken()).to.equal(tokens.i);
		expect(tile.getType()).to.equal(tileOBJ.types.locked);

		tile = row.tiles[1];
		expect(tile.getGuess(tokens.a)).to.equal(false); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(false); // 5
		expect(tile.getGuess(tokens.f)).to.equal(true); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(false); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9
		
		tile = row.tiles[2];
		expect(tile.getGuess(tokens.a)).to.equal(false); // 1
		expect(tile.getGuess(tokens.b)).to.equal(true); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(false); // 5
		expect(tile.getGuess(tokens.f)).to.equal(true); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(false); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9

		tile = row.tiles[3];
		expect(tile.getToken()).to.equal(tokens.e);
		expect(tile.getType()).to.equal(tileOBJ.types.locked);
		
		tile = row.tiles[4];
		expect(tile.getToken()).to.equal(tokens.d);
		expect(tile.getType()).to.equal(tileOBJ.types.set);

		tile = row.tiles[5];
		expect(tile.getToken()).to.equal(tokens.g);
		expect(tile.getType()).to.equal(tileOBJ.types.locked);
		
		tile = row.tiles[6];
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(false); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(false); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9

		tile = row.tiles[7];
		expect(tile.getGuess(tokens.a)).to.equal(true); // 1
		expect(tile.getGuess(tokens.b)).to.equal(false); // 2
		expect(tile.getGuess(tokens.c)).to.equal(false); // 3
		expect(tile.getGuess(tokens.d)).to.equal(false); // 4
		expect(tile.getGuess(tokens.e)).to.equal(false); // 5
		expect(tile.getGuess(tokens.f)).to.equal(false); // 6
		expect(tile.getGuess(tokens.g)).to.equal(false); // 7
		expect(tile.getGuess(tokens.h)).to.equal(true); // 8
		expect(tile.getGuess(tokens.i)).to.equal(false); // 9

		tile = row.tiles[8];
		expect(tile.getToken()).to.equal(tokens.c);
		expect(tile.getType()).to.equal(tileOBJ.types.locked);
		*/

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|6|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|12345789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|1234|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|1349|149|2|6|149|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|6|3|19|159|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|1235789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|149|")


		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|008|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
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

		// *********************************************
		// Checks each tiles guesses agenst all other
		// tiles GUESSES in the same posibility COL and sets it if there
		// are no other tiles with that guess in them in
		// the same region
		// *********************************************

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|125|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|1235789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")


		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})


    /* Don't need to run these most of the time
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|15|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|1235789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|89|2|7|89|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|600|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|602|705|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

//////////

	it("pass #11 region Exclusion", function(done){
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|159|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|189|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|1235789|14569|189|189|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #12 Basic Pass should show no change in set", function(done){
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|189|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|123579|14569|189|18|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|000|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #13 row Exclusion", function(done){
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|13789|123579|14569|189|18|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		
		done()
	})

	it("pass #14 Basic Pass", function(done){
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|1379|123579|14569|189|18|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #15 Basic Pass should show no change in set", function(done){
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

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|1379|123579|14569|189|18|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");

		done()
	})

	it("pass #16 simple is stuck", function(done){
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic(); //No change start simple
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();
		solve.solvePassBasic(); //first run finished trying again
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solveColExclusion(); //No Change
		solve.solvePassBasic(); //No change running simple one more time
		solve.solveRegionExclusion();
		solve.solvePassBasic();
		solve.solveRowExclusion();
		solve.solvePassBasic();
		solve.solveColExclusion();

		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|1379|123579|14569|189|18|1269|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");

		done()
	})

	it("pass #17.a run pairs pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairsRow()


		expect(su.debugRow(0)).to.equal("|8|4|3|179|1579|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")

		expect(su.debugRow(4)).to.equal("|34|16|16|379|23579|459|89|8|29|")

		expect(su.debugRow(5)).to.equal("|34|9|8|13|123|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|139|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");

		done()
	})

	it("pass #17.b run pairs pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairsRow();

		solve.checkPairsCol();



		expect(su.debugCol(0)).to.equal("|8|7|6|2|34|34|9|1|5|")
		expect(su.debugCol(1)).to.equal("|4|12|5|7|16|9|26|3|8|")
		expect(su.debugCol(2)).to.equal("|3|129|19|5|16|8|26|4|7|")
		expect(su.debugCol(3)).to.equal("|179|4|2|8|379|13|5|6|139|")
		expect(su.debugCol(4)).to.equal("|57|6|19|19|2357|23|4|8|3|")
		expect(su.debugCol(5)).to.equal("|159|3|8|169|459|146|7|2|19|")
		expect(su.debugCol(6)).to.equal("|6|19|4|3|89|5|18|7|2|")
		expect(su.debugCol(7)).to.equal("|2|5|3|4|8|7|18|9|6|")
		expect(su.debugCol(8)).to.equal("|19|8|7|169|29|126|3|5|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");

		done()
	})

	it("pass #17.c run pairs pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairsRow()
		solve.checkPairsCol()

		solve.checkPairsRegion()

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");
		done()
	})
    */

	it("pass #17 run pairs pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs()


		expect(su.debugRow(0)).to.equal("|8|4|3|179|57|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|379|2357|459|89|8|29|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|23|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|139|3|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|620|\n"+
											"|700|463|058|\n"+
											"|650|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|000|000|000|\n"+
											"|098|000|570|\n"+
											"*---+---+---*\n"+
											"|900|547|003|\n"+
											"|134|682|795|\n"+
											"|587|000|264|\n"+
											"*---*---*---*\n");

		done()
	})

    /* Don't need to run these most of the time
	it("pass #18 Basic Pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();


		 expect(su.debugRow(0)).to.equal("|8|4|3|179|57|159|6|2|19|")
		 expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		 expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		 expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		 expect(su.debugRow(4)).to.equal("|34|16|16|379|2357|459|89|8|29|")
		 expect(su.debugRow(5)).to.equal("|34|9|8|13|23|146|5|7|126|")
		 expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|18|3|")
		 expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		 expect(su.debugRow(8)).to.equal("|5|8|7|139|3|19|2|6|4|")

		 expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											 "|843|000|620|\n"+
											 "|700|463|058|\n"+
											 "|650|208|437|\n"+
											 "*---+---+---*\n"+
											 "|275|800|340|\n"+
											 "|000|000|080|\n"+
											 "|098|000|570|\n"+
											 "*---+---+---*\n"+
											 "|900|547|003|\n"+
											 "|134|682|795|\n"+
											 "|587|030|264|\n"+
											 "*---*---*---*\n");

		done()
	})

	it("pass #19 Basic Pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();


		expect(su.debugRow(0)).to.equal("|8|4|3|179|57|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|19|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|169|")
		expect(su.debugRow(4)).to.equal("|34|16|16|379|257|459|9|8|29|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|2|146|5|7|126|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|18|1|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|19|3|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
			"|843|000|620|\n"+
			"|700|463|058|\n"+
			"|650|208|437|\n"+
			"*---+---+---*\n"+
			"|275|800|340|\n"+
			"|000|000|980|\n"+
			"|098|020|570|\n"+
			"*---+---+---*\n"+
			"|900|547|013|\n"+
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();


		expect(su.debugRow(0)).to.equal("|8|4|3|179|57|159|6|2|19|")
		expect(su.debugRow(1)).to.equal("|7|12|129|4|6|3|1|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|16|")
		expect(su.debugRow(4)).to.equal("|34|16|16|37|57|45|9|8|2|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|2|146|5|7|16|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|8|1|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|19|3|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
			"|843|000|620|\n"+
			"|700|463|158|\n"+
			"|650|208|437|\n"+
			"*---+---+---*\n"+
			"|275|800|340|\n"+
			"|000|000|982|\n"+
			"|098|020|570|\n"+
			"*---+---+---*\n"+
			"|900|547|813|\n"+
			"|134|682|795|\n"+
			"|587|030|264|\n"+
			"*---*---*---*\n");

		done()
	})

	it("pass #21 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();


		expect(su.debugRow(0)).to.equal("|8|4|3|179|57|159|6|2|9|")
		expect(su.debugRow(1)).to.equal("|7|2|29|4|6|3|1|5|8|")
		expect(su.debugRow(2)).to.equal("|6|5|19|2|19|8|4|3|7|")
		expect(su.debugRow(3)).to.equal("|2|7|5|8|19|169|3|4|16|")
		expect(su.debugRow(4)).to.equal("|34|16|16|37|57|45|9|8|2|")
		expect(su.debugRow(5)).to.equal("|34|9|8|13|2|146|5|7|16|")
		expect(su.debugRow(6)).to.equal("|9|26|26|5|4|7|8|1|3|")
		expect(su.debugRow(7)).to.equal("|1|3|4|6|8|2|7|9|5|")
		expect(su.debugRow(8)).to.equal("|5|8|7|19|3|19|2|6|4|")

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
			"|843|000|629|\n"+
			"|720|463|158|\n"+
			"|650|208|437|\n"+
			"*---+---+---*\n"+
			"|275|800|340|\n"+
			"|000|000|982|\n"+
			"|098|020|570|\n"+
			"*---+---+---*\n"+
			"|900|547|813|\n"+
			"|134|682|795|\n"+
			"|587|030|264|\n"+
			"*---*---*---*\n");
		done()
	})

	it("pass #22 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
			"|843|000|629|\n"+
			"|729|463|158|\n"+
			"|650|208|437|\n"+
			"*---+---+---*\n"+
			"|275|800|340|\n"+
			"|000|000|982|\n"+
			"|098|020|570|\n"+
			"*---+---+---*\n"+
			"|960|547|813|\n"+
			"|134|682|795|\n"+
			"|587|030|264|\n"+
			"*---*---*---*\n");
		done()
	})

	it("pass #23 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|629|\n"+
											"|729|463|158|\n"+
											"|651|208|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|010|000|982|\n"+
											"|098|020|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #24 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
											"|843|000|629|\n"+
											"|729|463|158|\n"+
											"|651|298|437|\n"+
											"*---+---+---*\n"+
											"|275|800|340|\n"+
											"|016|000|982|\n"+
											"|098|020|570|\n"+
											"*---+---+---*\n"+
											"|962|547|813|\n"+
											"|134|682|795|\n"+
											"|587|030|264|\n"+
											"*---*---*---*\n");
		done()
	})

	it("pass #25 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();



        expect(su.getStructure()).to.equal( "*---*---*---*\n"+
        "|843|000|629|\n"+
        "|729|463|158|\n"+
        "|651|298|437|\n"+
        "*---+---+---*\n"+
        "|275|810|340|\n"+
        "|016|000|982|\n"+
        "|098|020|570|\n"+
        "*---+---+---*\n"+
        "|962|547|813|\n"+
        "|134|682|795|\n"+
        "|587|030|264|\n"+
        "*---*---*---*\n");
		done()
	})

	it("pass #26 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
        "|843|000|629|\n"+
        "|729|463|158|\n"+
        "|651|298|437|\n"+
        "*---+---+---*\n"+
        "|275|810|346|\n"+
        "|016|000|982|\n"+
        "|098|320|570|\n"+
        "*---+---+---*\n"+
        "|962|547|813|\n"+
        "|134|682|795|\n"+
        "|587|030|264|\n"+
        "*---*---*---*\n");
		done()
	})

	it("pass #27 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

		expect(su.getStructure()).to.equal( "*---*---*---*\n"+
        "|843|000|629|\n"+
        "|729|463|158|\n"+
        "|651|298|437|\n"+
        "*---+---+---*\n"+
        "|275|819|346|\n"+
        "|016|700|982|\n"+
        "|498|320|571|\n"+
        "*---+---+---*\n"+
        "|962|547|813|\n"+
        "|134|682|795|\n"+
        "|587|030|264|\n"+
        "*---*---*---*\n");
		done()
	})
    */

	it("pass #28 Basic Pass should show no change in set", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();

        expect(su.getStructure()).to.equal( "*---*---*---*\n"+
        "|843|100|629|\n"+
        "|729|463|158|\n"+
        "|651|298|437|\n"+
        "*---+---+---*\n"+
        "|275|819|346|\n"+
        "|316|750|982|\n"+
        "|498|326|571|\n"+
        "*---+---+---*\n"+
        "|962|547|813|\n"+
        "|134|682|795|\n"+
        "|587|031|264|\n"+
        "*---*---*---*\n");
		done()
	})

	it("pass #29 Solve with one final Basic Pass", function(done){
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
		solve.solveRegionExclusion();
		solve.checkPairs();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();
		solve.solvePassBasic();

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
/*
	*/
})