//var React   = require('react');

var SudokuTile = require("./SudokuTile.jsx")
/**
 * This makes the sudoku board dom
 * @name SudokuBoard
 * @module
 */
var SudokuBoard = React.createClass({
  render: function() {
    var inside = []

    var tile = null
    for(var ry = 0; ry<9; ry+=3){
      var insideRow = []
      for(var rx = 0; rx<9; rx+=3){
        var box = []
        for(var y = ry; y<ry+3; y++){
          var row = []
          for(var x = rx; x<rx+3; x++){
            tile = this.props.sudoku.getTile(x,y)
            row.push(<SudokuTile x={x} y={y} key={x+"x"+y} tile={tile} />)
          }
          box.push(<div key={y} className={"row row-"+parseInt(ry/3)}>{row}</div>)
        }
        insideRow.push(<div key={rx} className={"region region-x-"+parseInt(rx/3)+" region-y-"+parseInt(ry/3) +" region-"+parseInt(rx/3)+"-"+parseInt(ry/3)}>{box}</div>)
      }
      inside.push(<div key={ry} className={"regionRow regionRow-"+parseInt(ry/3)}>{insideRow}</div>)
    }
    return (
      <div className="SudokuBoardWrapper">
        <div className="SudokuBoard">{inside}</div>
      </div>
      )
  }
});

module.exports = SudokuBoard