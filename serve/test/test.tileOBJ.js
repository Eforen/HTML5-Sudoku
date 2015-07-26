var expect = require("chai").expect;
var tileOBJ = require("../public/javascripts/tileOBJ.js");

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

})