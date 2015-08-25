var React   = require('react');
var SudokuBoard = require('./SudokuBoard.jsx')

//window.startView = function(argument) {
	React.render(
		<SudokuBoard sudoku={window.su}/>
	  ,
	  document.body
	);