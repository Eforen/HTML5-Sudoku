var expect = require("chai").expect;

var sudoku = require("../src/js/sudokuOBJ.js");
var tileStore = require("../src/js/tileStore.js");
var tileOBJ = require("../src/js/tileOBJ.js");

var tokens = require("../src/js/tokenENUM.js");

describe("tile Object", function() {

	//var su = null;
	var tile = null;

	beforeEach(function(done) {
		//su = new sudoku(); //should not need this
		//su = null; //Debug setup expectation
		//expect(su).not.to.be.null; //Test setup expectation

		tile = new tileOBJ();
		expect(tile).not.to.be.null;
		done();
	})

	it("should instansiate available", function(done){
		expect(tile).not.to.be.null;
		expect(tile).to.be.instanceof(tileOBJ);
		done();
	})

	describe("setup", function() {
		var su = null;
		beforeEach(function(done){
			su = new sudoku(); //should not need this
			expect(su).not.to.be.null; //Test setup expectation

			expect(tile.setup).to.be.a('function');
			tile.setup(su.getRow(1), su.getCol(2), su.getRegion(1), 3,2);

			done();
		})

		it("before setup isSetup should be false", function(done){
			var t = new tileOBJ();
			expect(t.isSetup).to.be.false;
			done();
		})

		it("after setup isSetup should be true", function(done){
			expect(tile.isSetup).to.be.true;
			done();
		})

		it("rows match", function(done){
			expect(tile.getRow()).to.equal(su.getRow(1));
			done();
		})
		it("cols match", function(done){
			expect(tile.getCol()).to.equal(su.getCol(2));
			done();
		})
		it("region match", function(done){
			expect(tile.getRegion()).to.equal(su.getRegion(1));
			done();
		})
		it("pos x match", function(done){
			expect(tile.getX()).to.equal(3);
			done();
		})
		it("pos y match", function(done){
			expect(tile.getY()).to.equal(2);
			done();
		})

	})

	describe("data Values", function() {
		var su = null;
		beforeEach(function(done){
			done();
		})

		it("default Token", function(done){
			expect(tile.getToken()).to.equal(1);
			done();
		})	

		it("default Type", function(done){
			expect(tile.getType()).to.equal(tileOBJ.types.blank);
			done();
		})		

		it("set Token", function(done){
			tile.setToken(tokens.c);
			done();
		})

		it("set Type", function(done){
			tile.setType(tileOBJ.types.guess);
			done();
		})

		it("set Both", function(done){
			tile.set(tokens.c, tileOBJ.types.guess);
			done();
		})

		it("get token Token", function(done){
			tile.setToken(tokens.c);
			expect(tile.getToken()).to.equal(tokens.c);
			done();
		})

		it("get type Type", function(done){
			tile.setType(tileOBJ.types.guess);
			expect(tile.getType()).to.equal(tileOBJ.types.guess);
			done();
		})

		it("get both", function(done){
			tile.set(tokens.c, tileOBJ.types.guess);
			expect(tile.get().token).to.equal(tokens.c);
			expect(tile.get().type).to.equal(tileOBJ.types.guess);
			done();
		})

	})

	describe("Guessing", function(){
		it("guess default should be false", function(done){
			expect(tile.getGuess(tokens.b)).to.equal(false);
			done();
		})
		it("can set guess (value)", function(done){
			expect(tile.getGuess(tokens.c)).to.equal(false);
			tile.setGuess(tokens.c);
			expect(tile.getGuess(tokens.c)).to.equal(true);
			done();
		})
		
		it("can set guess (type)", function(done){
			expect(tile.getType()).to.equal(tileOBJ.types.blank);
			tile.setGuess(tokens.d);
			expect(tile.getType()).to.equal(tileOBJ.types.guess);
			done();
		})

		it("can get guesses as array", function(done){
			expect(tile.getGuesses()).to.be.instanceof(Array);
			done();
		})
		
		it("can set guesses as array partial range", function(done){
			expect(tile.getGuess(tokens.a)).to.equal(false);
			expect(tile.getGuess(tokens.b)).to.equal(false);
			expect(tile.getGuess(tokens.c)).to.equal(false);
			expect(tile.getGuess(tokens.d)).to.equal(false);
			expect(tile.getGuess(tokens.e)).to.equal(false);
			expect(tile.getGuess(tokens.f)).to.equal(false);

			var arr = []
			arr[tokens.a] = true;
			arr[tokens.b] = false;
			arr[tokens.c] = true;
			arr[tokens.d] = true;
			arr[tokens.f] = true;

			tile.setGuesses(arr);

			expect(tile.getGuess(tokens.a)).to.equal(true);
			expect(tile.getGuess(tokens.b)).to.equal(false);
			expect(tile.getGuess(tokens.c)).to.equal(true);
			expect(tile.getGuess(tokens.d)).to.equal(true);
			expect(tile.getGuess(tokens.e)).to.equal(false);
			expect(tile.getGuess(tokens.f)).to.equal(true);
			done();
		})
		
		it("can set guesses as array full range", function(done){
			expect(tile.getGuess(tokens.a)).to.equal(false);
			expect(tile.getGuess(tokens.b)).to.equal(false);
			expect(tile.getGuess(tokens.c)).to.equal(false);
			expect(tile.getGuess(tokens.d)).to.equal(false);
			expect(tile.getGuess(tokens.e)).to.equal(false);
			expect(tile.getGuess(tokens.f)).to.equal(false);
			expect(tile.getGuess(tokens.g)).to.equal(false);
			expect(tile.getGuess(tokens.h)).to.equal(false);
			expect(tile.getGuess(tokens.i)).to.equal(false);

			var arr = []
			arr[tokens.a] = true;
			arr[tokens.b] = true;
			arr[tokens.c] = true;
			arr[tokens.d] = true;
			arr[tokens.e] = true;
			arr[tokens.f] = true;
			arr[tokens.g] = true;
			arr[tokens.h] = true;
			arr[tokens.i] = true;

			tile.setGuesses(arr);

			expect(tile.getGuess(tokens.a)).to.equal(true);
			expect(tile.getGuess(tokens.b)).to.equal(true);
			expect(tile.getGuess(tokens.c)).to.equal(true);
			expect(tile.getGuess(tokens.d)).to.equal(true);
			expect(tile.getGuess(tokens.e)).to.equal(true);
			expect(tile.getGuess(tokens.f)).to.equal(true);
			expect(tile.getGuess(tokens.g)).to.equal(true);
			expect(tile.getGuess(tokens.h)).to.equal(true);
			expect(tile.getGuess(tokens.i)).to.equal(true);
			done();
		})
		
		it("can set all guesses to value", function(done){
			expect(tile.getGuess(tokens.a)).to.equal(false);
			expect(tile.getGuess(tokens.b)).to.equal(false);
			expect(tile.getGuess(tokens.c)).to.equal(false);
			expect(tile.getGuess(tokens.d)).to.equal(false);
			expect(tile.getGuess(tokens.e)).to.equal(false);
			expect(tile.getGuess(tokens.f)).to.equal(false);
			expect(tile.getGuess(tokens.g)).to.equal(false);
			expect(tile.getGuess(tokens.h)).to.equal(false);
			expect(tile.getGuess(tokens.i)).to.equal(false);

			tile.setGuesses(true);

			expect(tile.getGuess(tokens.a)).to.equal(true);
			expect(tile.getGuess(tokens.b)).to.equal(true);
			expect(tile.getGuess(tokens.c)).to.equal(true);
			expect(tile.getGuess(tokens.d)).to.equal(true);
			expect(tile.getGuess(tokens.e)).to.equal(true);
			expect(tile.getGuess(tokens.f)).to.equal(true);
			expect(tile.getGuess(tokens.g)).to.equal(true);
			expect(tile.getGuess(tokens.h)).to.equal(true);
			expect(tile.getGuess(tokens.i)).to.equal(true);

			tile.setGuesses(false);

			expect(tile.getGuess(tokens.a)).to.equal(false);
			expect(tile.getGuess(tokens.b)).to.equal(false);
			expect(tile.getGuess(tokens.c)).to.equal(false);
			expect(tile.getGuess(tokens.d)).to.equal(false);
			expect(tile.getGuess(tokens.e)).to.equal(false);
			expect(tile.getGuess(tokens.f)).to.equal(false);
			expect(tile.getGuess(tokens.g)).to.equal(false);
			expect(tile.getGuess(tokens.h)).to.equal(false);
			expect(tile.getGuess(tokens.i)).to.equal(false);
			done();
		})
		
		it("should change type to set when was guess", function(done){
			tile.setGuesses(true);
			tile.set(tokens.a);
			expect(tile.getType()).to.equal(tileOBJ.types.set);
			done();
		})
		
		it("should change type to set when was guess 2", function(done){
			tile.setGuesses(true);
			tile.setToken(tokens.a);
			expect(tile.getType()).to.equal(tileOBJ.types.set);
			done();
		})
	})
})