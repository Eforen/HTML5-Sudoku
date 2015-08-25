jsdom = require("jsdom")

require("mocha-sinon")

// move into beforeEach and flip global.window.close on to improve
// cleaning of environment during each test and prevent memory leaks
document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'))

beforeEach( function(){
    this.document = document
    global.document = this.document
    global.window = this.document.parentWindow
})

afterEach( function(){
    // setting up and closing a "window" every run is really heavy
    // it prevents contamination between tests and prevents memory leaks
    global.window.close()
})