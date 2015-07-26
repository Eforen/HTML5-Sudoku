var expect = require("chai").expect;
var sudoku = require("../public/javascripts/sudokuOBJ.js");

describe("sudoku Object", function() {
	it("should instansiate available", function(done){
		var su = new sudoku();
		expect(su).not.to.be.null;
		done();
	})
})