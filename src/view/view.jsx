/**
 * Sets up and runs the view
 * @file view.jsx
 * @author Ariel Lothlorien
 */
var React   = require('react');
window.React = React

var SudokuBoard = require('./SudokuBoard.jsx')


/**
 * Renders the window using the current Sudoku at window.su
 * @function
 */
window.renderView = function() {
	React.render(
		<SudokuBoard sudoku={window.su}/>
	  ,
	  document.body
	);
}

/**
 * Calls a method and then calls window render
 * @example
 * window.dnr(alert, this, "This is an alert!")
 * @function
 * @param {Function} f The function to call.
 * @param {Function} [t=null] The context to call the function in such as this.
 * @param {arguments} [*=null] all remaining arguments are passed to the function
 */
window.dnr = function(f, t ){
	var args = Array.prototype.splice.call(arguments, 2);
	f.apply(t, args)
	window.renderView();
}

window.renderView();