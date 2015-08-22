var expect = require("chai").expect;
var sudoku = require("../src/js/sudokuOBJ.js");
var tileStore = require("../src/js/tileStore.js");
var tileOBJ = require("../src/js/tileOBJ.js");

var tokens = require("../src/js/tokenENUM.js");

describe("sudoku Object", function() {

	var su = null;
	var testJSON = "{}";
	var testOBJ = {};

	beforeEach(function(done) {
		test = '{"name": "Simple Test",	"puzzle": "043000620700403008600208007075000340000000000098000570900507003100602005087000260"}';
		testOBJ = {
			name: "Simple Test",	
			puzzle: "043000620700403008600208007075000340000000000098000570900507003100602005087000260"
		}
		su = new sudoku();
		//su = null; //Debug setup expectation
		expect(su).not.to.be.null; //Test setup expectation
		done();
	})

	it("should instansiate and be available", function(done){
		expect(su).not.to.be.null;
		done();
	})

	describe("lines", function(){
		describe("rows", function() {
			it("should be and array", function(done){
				expect(su.getRows()).to.be.an('array');
				done();
			})

			it("should create 9", function(done){
				expect(su.getRows()).to.have.length(9);
				done();
			})

			it("should all be tileStores", function(done){
				for (var i = 0; i < 9; i++) {
					expect(su.getRow(i)).to.be.an.instanceof(tileStore);
				}
				done();
			})

			it("should all be full of tileOBJs", function(done){
				for (var r = 0; r < 9; r++) {
					var ro = su.getRow(r);
					for (var c = 0; c < 9; c++) {
						expect(ro.tiles[c]).to.be.instanceof(tileOBJ);
					}
				}
				done();
			})
		})

		describe("cols", function() {
			it("should be and array", function(done){
				expect(su.getCols()).to.be.an('array');
				done();
			})

			it("should create 9", function(done){
				expect(su.getCols()).to.have.length(9);
				done();
			})

			it("should all be tileStores", function(done){
				for (var i = 0; i < 9; i++) {
					expect(su.getCol(i)).to.be.an.instanceof(tileStore);
				}
				done();
			})

			it("should all be full of tileOBJs", function(done){
				for (var c = 0; c < 9; c++) {
					var co = su.getCol(c);
					for (var r = 0; r < 9; r++) {
						expect(co.tiles[r]).to.be.instanceof(tileOBJ);
					}
				}
				done();
			})
		})
	})


	describe("regions", function() {
		it("should be and array", function(done){
			expect(su.getRegions()).to.be.an('array');
			done();
		})

		it("should create 9", function(done){
			expect(su.getRegions()).to.have.length(9);
			done();
		})

		it("should all be tileStores", function(done){
			for (var i = 0; i < 9; i++) {
				expect(su.getRegion(i)).to.be.an.instanceof(tileStore);
			}
			done();
		})

		it("get from posision should return the correct tileStores", function(done){
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					var xx = null;
					if(x > 0 && x < 3) xx = 0;
					if(x > 2 && x < 6) xx = 1;
					if(x > 5 && x < 9) xx = 2;
					var yy = null;
					if(y > 0 && y < 3) yy = 0;
					if(y > 2 && y < 6) yy = 1;
					if(y > 5 && y < 9) yy = 2;

					expect(su.getRegion(x, y)).to.equal(su.getRegion(3*yy+xx));
				}
			}
			done();
		})

		it("should all be full of tileOBJs", function(done){
			for (var r = 0; r < 9; r++) {
				var ro = su.getRegion(r);
				for (var i = 0; i < 9; i++) {
					expect(ro.tiles[i]).to.be.instanceof(tileOBJ);
				}
			}
			done();
		})
	})

	describe("Data", function(){

		beforeEach(function(done) {
			//su = sudoku.loadFromJSON(test);
			su = sudoku.loadFromOBJ(testOBJ);
			//su = null; //Debug setup expectation
			expect(su).not.to.be.null; //Test setup expectation
			expect(su).to.be.instanceof(sudoku); //Test setup expectation
			done();
		})
		it("should load from JSON", function(done){
			//var su = sudoku.loadFromJSON(test);
			su = sudoku.loadFromOBJ(testOBJ);
			done();
		})
		describe("should be the correct data:", function(){
			it("token check...", function(done){
				//console.log("wtf! "+tokens.a+" "+tokens.b)
				expect(su.getTile(1,0).getToken()).to.equal(tokens.d);
				expect(su.getTile(2,0).getToken()).to.equal(tokens.c);

				// 043 000 620
				expect(su.getTile(1,0).getToken()).to.equal(4);
				expect(su.getTile(2,0).getToken()).to.equal(3);
				expect(su.getTile(6,0).getToken()).to.equal(6);
				expect(su.getTile(7,0).getToken()).to.equal(2);

				// 700 403 008
				expect(su.getTile(0,1).getToken()).to.equal(7);
				expect(su.getTile(3,1).getToken()).to.equal(4);
				expect(su.getTile(5,1).getToken()).to.equal(3);
				expect(su.getTile(8,1).getToken()).to.equal(8);

				// 600 208 007
				expect(su.getTile(0,2).getToken()).to.equal(6);
				expect(su.getTile(3,2).getToken()).to.equal(2);
				expect(su.getTile(5,2).getToken()).to.equal(8);
				expect(su.getTile(8,2).getToken()).to.equal(7);

				// 075 000 340
				expect(su.getTile(1,3).getToken()).to.equal(7);
				expect(su.getTile(2,3).getToken()).to.equal(5);
				expect(su.getTile(6,3).getToken()).to.equal(3);
				expect(su.getTile(7,3).getToken()).to.equal(4);

				// 000 000 000

				// 098 000 570
				expect(su.getTile(1,5).getToken()).to.equal(9);
				expect(su.getTile(2,5).getToken()).to.equal(8);
				expect(su.getTile(6,5).getToken()).to.equal(5);
				expect(su.getTile(7,5).getToken()).to.equal(7);

				// 900 507 003
				expect(su.getTile(0,6).getToken()).to.equal(9);
				expect(su.getTile(3,6).getToken()).to.equal(5);
				expect(su.getTile(5,6).getToken()).to.equal(7);
				expect(su.getTile(8,6).getToken()).to.equal(3);
				
				// 100 602 005
				expect(su.getTile(0,7).getToken()).to.equal(1);
				expect(su.getTile(3,7).getToken()).to.equal(6);
				expect(su.getTile(5,7).getToken()).to.equal(2);
				expect(su.getTile(8,7).getToken()).to.equal(5);
				
				// 087 000 260
				expect(su.getTile(1,8).getToken()).to.equal(8);
				expect(su.getTile(2,8).getToken()).to.equal(7);
				expect(su.getTile(6,8).getToken()).to.equal(2);
				expect(su.getTile(7,8).getToken()).to.equal(6);
				done();
			})

			it("type check...", function(done){
				// 043 000 620
				expect(su.getTile(0,0).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(1,0).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(2,0).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(3,0).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(4,0).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,0).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(6,0).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(7,0).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(8,0).getType()).to.equal(tileOBJ.types.blank);

				// 700 403 008
				expect(su.getTile(0,1).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(1,1).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(2,1).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(3,1).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(4,1).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,1).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(6,1).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(7,1).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(8,1).getType()).to.equal(tileOBJ.types.locked);

				// 600 208 007
				expect(su.getTile(0,2).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(1,2).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(2,2).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(3,2).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(4,2).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,2).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(6,2).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(7,2).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(8,2).getType()).to.equal(tileOBJ.types.locked);

				// 075 000 340
				expect(su.getTile(0,3).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(1,3).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(2,3).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(3,3).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(4,3).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,3).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(6,3).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(7,3).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(8,3).getType()).to.equal(tileOBJ.types.blank);

				// 000 000 000
				expect(su.getTile(0,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(1,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(2,4).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(3,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(4,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,4).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(6,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(7,4).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(8,4).getType()).to.equal(tileOBJ.types.blank);

				// 098 000 570
				expect(su.getTile(0,5).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(1,5).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(2,5).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(3,5).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(4,5).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,5).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(6,5).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(7,5).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(8,5).getType()).to.equal(tileOBJ.types.blank);

				// 900 507 003
				expect(su.getTile(0,6).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(1,6).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(2,6).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(3,6).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(4,6).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,6).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(6,6).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(7,6).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(8,6).getType()).to.equal(tileOBJ.types.locked);
				
				// 100 602 005
				expect(su.getTile(0,7).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(1,7).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(2,7).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(3,7).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(4,7).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,7).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(6,7).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(7,7).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(8,7).getType()).to.equal(tileOBJ.types.locked);
				
				// 087 000 260
				expect(su.getTile(0,8).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(1,8).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(2,8).getType()).to.equal(tileOBJ.types.locked);

				expect(su.getTile(3,8).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(4,8).getType()).to.equal(tileOBJ.types.blank);
				expect(su.getTile(5,8).getType()).to.equal(tileOBJ.types.blank);

				expect(su.getTile(6,8).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(7,8).getType()).to.equal(tileOBJ.types.locked);
				expect(su.getTile(8,8).getType()).to.equal(tileOBJ.types.blank);

				done();
			})
		})

		describe("structure", function() {

			it("should be the correct tileOBJs", function(done){
				for (var x = 0; x < 9; x++) {
					for (var y = 0; y < 9; y++) {
						var r = su.getRow(y);
						var c = su.getCol(x);
						expect(r.tiles[x]).to.equal(c.tiles[y]);
					}
				}
				done();
			})

			it("get tile should get the correct tileOBJ", function(done){
				for (var x = 0; x < 9; x++) {
					for (var y = 0; y < 9; y++) {
						var r = su.getRow(y);
						var c = su.getCol(x);
						expect(r.tiles[x]).to.equal(c.tiles[y]);
						expect(su.getTile(x, y)).to.equal(r.tiles[x]);
					}
				}
				done();
			})

			it("regions should all be the correct tileOBJs", function(done){
				var r = su.getRegions();
				for (var x = 0; x < 9; x++) {
					for (var y = 0; y < 9; y++) {
						var rx = null;
						if(x > 0 && x < 3) rx = 0;
						if(x > 2 && x < 6) rx = 1;
						if(x > 5 && x < 9) rx = 2;
						var ry = null;
						if(y > 0 && y < 3) ry = 0;
						if(y > 2 && y < 6) ry = 1;
						if(y > 5 && y < 9) ry = 2;

						expect(r[3*ry+rx].tiles[3*parseInt(y%3)+parseInt(x%3)]).to.equal(su.getTile(x, y));
					}
				}
				done();
			})

			describe("debug methods", function() {

				it("should return correct structure in string", function(done){
					
					/*
	*---*---*---*
	|043|000|620|
	|700|403|008|
	|600|208|007|
	*---+---+---*
	|075|000|340|
	|000|000|000|
	|098|000|570|
	*---+---+---*
	|900|507|003|
	|100|602|005|
	|087|000|260|
	*---*---*---*
					*/
					var target =	"*---*---*---*\n"+
									"|043|000|620|\n"+
									"|700|403|008|\n"+
									"|600|208|007|\n"+
									"*---+---+---*\n"+
									"|075|000|340|\n"+
									"|000|000|000|\n"+
									"|098|000|570|\n"+
									"*---+---+---*\n"+
									"|900|507|003|\n"+
									"|100|602|005|\n"+
									"|087|000|260|\n"+
									"*---*---*---*\n"
					expect(su.getStructure()).to.equal(target);

					done()
				})

				it("should print debug of tiles in row with .debugRow(y)", function(done){

					expect(su.debugRow(0)).to.equal("||4|3||||6|2||")
					expect(su.debugRow(1)).to.equal("|7|||4||3|||8|")
					expect(su.debugRow(2)).to.equal("|6|||2||8|||7|")
					expect(su.debugRow(3)).to.equal("||7|5||||3|4||")
					expect(su.debugRow(4)).to.equal("||||||||||")
					expect(su.debugRow(5)).to.equal("||9|8||||5|7||")
					expect(su.debugRow(6)).to.equal("|9|||5||7|||3|")
					expect(su.debugRow(7)).to.equal("|1|||6||2|||5|")
					expect(su.debugRow(8)).to.equal("||8|7||||2|6||")

					done();
				})

				it("should print debug of tiles in row with .debugRow(y) with guesses", function(done){

					var row = su.getRow(0).tiles

					// a b c  d e f  g h i
					// 1 2 3  4 5 6  7 8 9

					var arr = []
					arr[tokens.e] = true;
					arr[tokens.h] = true;
					row[0].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					row[3].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					row[4].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.i] = true;
					row[5].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.i] = true;
					row[8].setGuesses(arr)

					expect(su.debugRow(0)).to.equal("|58|4|3|179|1579|159|6|2|19|")
					expect(su.debugRow(1)).to.equal("|7|||4||3|||8|")
					expect(su.debugRow(2)).to.equal("|6|||2||8|||7|")
					expect(su.debugRow(3)).to.equal("||7|5||||3|4||")
					expect(su.debugRow(4)).to.equal("||||||||||")
					expect(su.debugRow(5)).to.equal("||9|8||||5|7||")
					expect(su.debugRow(6)).to.equal("|9|||5||7|||3|")
					expect(su.debugRow(7)).to.equal("|1|||6||2|||5|")
					expect(su.debugRow(8)).to.equal("||8|7||||2|6||")

					done();
				})

				it("should print debug of tiles in col with .debugCol(x)", function(done){


					expect(su.debugCol(0)).to.equal("||7|6||||9|1||")

					done();
				})

				it("should print debug of tiles in col with .debugCol(x) with guesses", function(done){

					var col = su.getCol(0).tiles

					// a b c  d e f  g h i
					// 1 2 3  4 5 6  7 8 9

					var arr = []
					arr[tokens.e] = true;
					arr[tokens.h] = true;
					col[0].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					col[3].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					col[4].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.i] = true;
					col[5].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.i] = true;
					col[8].setGuesses(arr)

					expect(su.debugCol(0)).to.equal("|58|7|6|179|1579|159|9|1|19|")

					done();
				})

				it("should print debug of tiles in region with .debugRegion(y)", function(done){

					expect(su.debugRegion(0,0)).to.equal("||4|3|7|||6|||")

					done();
				})

				it("should print debug of tiles in region with .debugRegion(x, y) with guesses", function(done){

					var region = su.getRegion(0,0).tiles

					// a b c  d e f  g h i
					// 1 2 3  4 5 6  7 8 9

					var arr = []
					arr[tokens.e] = true;
					arr[tokens.h] = true;
					region[0].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					region[4].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.g] = true;
					arr[tokens.i] = true;
					region[5].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.e] = true;
					arr[tokens.i] = true;
					region[7].setGuesses(arr)

					arr = []
					arr[tokens.a] = true;
					arr[tokens.i] = true;
					region[8].setGuesses(arr)

					expect(su.debugRegion(0,0)).to.equal("|58|4|3|7|179|1579|6|159|19|")

					done();
				})
			})
		})
	})
})