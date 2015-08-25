/**
 * Just some floating debug helper methods
 * @name Debugger
 * @module
 */

/**
 * Gets the current stack.
 * @function
 * @returns {string} The current stack as a string
 */
exports.getstack = function(){
	//create dubby error to get stack
	var e = new Error('stackTrace');
	//format stack
	var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
		.replace(/^\s+at\s+/gm, '')
		.replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
		.split('\n');
	//return stack
	return stack
}
