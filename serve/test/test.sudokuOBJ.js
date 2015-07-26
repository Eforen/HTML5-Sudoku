var expect = require("chai").expect;
var sudoku = require("../public/javascripts/sudokuOBJ.js");
var tileStore = require("../public/javascripts/tileStore.js");
var tileOBJ = require("../public/javascripts/tileOBJ.js");

describe("sudoku Object", function() {

	var su = null;

	beforeEach(function(done) {
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
				};
				done();
			})

			it("should all be full of tileOBJs", function(done){
				for (var r = 0; r < 9; r++) {
					var ro = su.getRow(r);
					for (var c = 0; c < 9; c++) {
						expect(r.tiles[c]).to.be.instanceof(tileOBJ);
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
				};
				done();
			})

			it("should all be full of tileOBJs", function(done){
				for (var c = 0; c < 9; c++) {
					var ro = su.getRow(r);
					for (var r = 0; r < 9; r++) {
						expect(r.tiles[c]).to.be.instanceof(tileOBJ);
					}
				}
				done();
			})
		})

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
			};
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
					expect(r.tiles[c]).to.be.instanceof(tileOBJ);
				}
			}
			done();
		})

		it("should all be the correct tileOBJs", function(done){
			var r = su.getRegions();
			for (var x = 0; x < 9; x++) {
				for (var y = 0; y < 9; y++) {
					var xx = null;
					if(x > 0 && x < 3) rx = 0;
					if(x > 2 && x < 6) rx = 1;
					if(x > 5 && x < 9) rx = 2;
					var yy = null;
					if(y > 0 && y < 3) ry = 0;
					if(y > 2 && y < 6) ry = 1;
					if(y > 5 && y < 9) ry = 2;

					expect(r[3*ry+rx].tiles(3*(y%3)+(x%3)).to.equal(su.getTile(x, y)));
				}
			}
			done();
		})
	})

})