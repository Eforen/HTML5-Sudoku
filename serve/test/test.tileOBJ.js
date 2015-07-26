var expect = require("chai").expect;

var sudoku = require("../public/javascripts/sudokuOBJ.js");
var tileStore = require("../public/javascripts/tileStore.js");
var tileOBJ = require("../public/javascripts/tileOBJ.js");

var tokens = require("../public/javascripts/tokenENUM.js");

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

	describe("data Value", function() {
		var su = null;
		beforeEach(function(done){
			su = new sudoku(); //should not need this
			expect(su).not.to.be.null; //Test setup expectation

			expect(tile.setup).to.be.a('function');
			tile.setup(su.getRow(1), su.getCol(2), su.getRegion(1), 3,2);

			done();
		})

		it("set Value", function(done){
			tile.set()
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

})