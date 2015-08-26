'use strict';
//var React = require("react");
var classNames = require("classnames");
var tileOBJ = require("../js/tileOBJ.js");

/**
 * This makes the sudoku tile dom
 * @name SudokuTile
 * @module
 */
var SudokuTile = React.createClass({
  getClassName: function getClassNameFn() {
    var classes = {};
    
    if (this.props.x && this.props.y) {
      var tileId = this.props.x + "x" + this.props.y;
      
      classes["tile-" + tileId] = true;
    }
    
    return classNames("tile", classes);
  },

  renderGuessItems: function renderGuessItemsFn(guesses) {
    return guesses.reduce(function guessReduceFn(output, guess, i) {
      if (!guesses) {
        return output;
      }

      // Keys should not be integer values.
      output.push(
        <span key={"sudokuKey" + i} className={"guess guess-" + i}>
          {i}
        </span>
      );
      return output;
    }, []);
  },
  
  renderWrappedValue: function renderWrappedFn(className, value) {
    return (
      <div className={className}>{value}</div>
    );
  },

  renderInside: function renderInside(tile) {
    var tileType = tile.getType();
    var tileValue = tile._value;
    
    if (tileType === tileOBJ.types.set) {
      return this.renderWrappedValue("set", tileValue);
    }

    if (tileType === tileOBJ.types.locked) {
      return this.renderWrappedValue("locked", tileValue);
    }

    if (tileType === tileOBJ.types.guess) {
      return this.renderWrappedValue(
        "guesses",
        this.renderGuessItems(tile._guesses)
      );
    }

    // Return default.
    return (<div className="empty"></div>);
  },

  render: function renderFn() {
    console.log("rendering...")
    return (
      <div style={this.props.style || {}}
           className={this.getClassName()}>
        {this.renderInside(this.props.tile)}
      </div>
    );
  }
});

module.exports = SudokuTile;