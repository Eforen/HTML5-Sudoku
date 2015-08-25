var React   = require('react');

var SudokuTile = require("./SudokuTile.jsx")
/**
 * This makes the sudoku board dom
 * @name SudokuBoard
 * @module
 */
var SudokuBoard = React.createClass({
  render: function() {
    var inside = []
    for(var x = 0; x<9; x++){
      for(var y = 0; y<9; y++){
        inside.push(<SudokuTile x={x} y={y} tile={this.props.sudoku.getTile(x,y)} />)
      }
    }
    return (
      <div className="SudokuBoardWrapper">
        <div className="SudokuBoard">{inside}</div>
      </div>
      )
  }
});

module.exports = SudokuBoard