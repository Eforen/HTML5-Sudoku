var expect = require("chai").expect;
var tileStore = require("../src/js/tileStore.js");
var sudoku = require("../src/js/sudokuOBJ.js");

describe("tileStore Object", function() {
	it("should have all available", function(done){
		var store = new tileStore();
		expect(store.available()).to.deep.equal([true,true,true,true,true,true,true,true,true]);
		done();
	})

	it("should have no tiles at construction", function(done){
		var store = new tileStore();
		expect(store.tiles).to.have.length(0);
		done();
	})
})