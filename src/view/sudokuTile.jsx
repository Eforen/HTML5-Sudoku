var React   = require('react');

var tileOBJ   = require("../js/tileOBJ.js");

/**
 * This makes the sudoku tile dom
 * @name SudokuTile
 * @module
 */
var SudokuTile = React.createClass({
  render: function() {
  	var id = null
  	if(this.props.x != null & this.props.y != null){
  		id = this.props.x+"x"+this.props.y
  	}

  	var style = {

  	}

  	var inside = null
  	switch (this.props.tile.getType()){
  		case tileOBJ.types.set:
  			inside = (<div className="set">{this.props.tile.getToken()}</div>)
  			break
  		case tileOBJ.types.locked:
  			inside = (<div className="locked">{this.props.tile.getToken()}</div>)
  			break
  		case tileOBJ.types.guess:
			var guessItems = []
			var guesses = this.props.tile.getGuesses();

			for (var i = 0; i < guesses.length; i++) {
				if(guesses[i]){
					guessItems.push(<span id={i} className="guess">{i}</span>)
				}
			}
  			inside = (<div className="guesses">{guessItems}</div>)
  			break
  		default:
  			inside = (<div className="empty"> </div>)
  	}
    return (<div style={style} id={id} className="SudokuTile"> {inside} </div>)
  }
});

module.exports = SudokuTile