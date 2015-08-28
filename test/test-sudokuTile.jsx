//jsdom = require("jsdom")

sinon = require("mocha-sinon")

require("./dom_helper.js")

var expect = require("chai").expect;

var React          = require('react')
var ReactAddons    = require('react/addons') // require the addons
var ReactTestUtils = React.addons.TestUtils  // <- YEAH!

var tileOBJ = require("../src/js/tileOBJ.js");

var tokens = require("../src/js/tokenENUM.js");
var debug = require("../src/js/debugger.js");

describe("sudokuTile Comp", function() {

    beforeEach(function() {
        var container = this.document.createElement('div')
    })
	it("create the correct HTML on Set", function(done){

        var tileHTML = TestUtils.renderIntoDocument((<sudokuTile x={2} y={4} tile={tile} />), container)
		console.log(tileHTML.innerHTML())
		done();
	})
})