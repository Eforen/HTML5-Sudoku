/**
 * @file Main App Code
 * @author Ariel Lothlorien
 */

window.sudokuOBJ = require("./sudokuOBJ.js");
window.sudokuSolver = require("./sudokuSolver.js");
window.token = require("./tokenENUM.js");

//test = new window.sudokuOBJ();
window.testData = {
			name: "Simple Test",	
			puzzle: "043000620700403008600208007075000340000000000098000570900507003100602005087000260"
		}

window.su = window.sudokuOBJ.loadFromOBJ(window.testData);
window.solve = new window.sudokuSolver(window.su);
window.su2 = window.solve.getSudoku();
/*
*/


window.runTest = function(){
	solve.solvePassBasic()
	solve.solvePassBasic()
	solve.solvePassBasic()
	solve.solvePassBasic()
	solve.solveRegionExclusion()
	solve.solvePassBasic()
	solve.solveRowExclusion()
	solve.solvePassBasic()
	solve.solveColExclusion()
	solve.solvePassBasic()
	solve.solveRegionExclusion()
	solve.solvePassBasic()
	solve.solveRowExclusion()
	solve.solvePassBasic()
	solve.solvePassBasic()
}

window.runRenderWait = function(waitTime, index){
	if(waitTime == null || waitTime <= 0) return
	if(index == null || index < 0) index = 0;

	switch (index) {
		case 0:
			window.solve.solvePassBasic()
			break
		case 1:
			window.solve.solvePassBasic()
			break
		case 2:
			window.solve.solvePassBasic()
			break
		case 3:
			window.solve.solvePassBasic()
			break
		case 4:
			window.solve.solveRegionExclusion()
			break
		case 5:
			window.solve.solvePassBasic()
			break
		case 6:
			window.solve.solveRowExclusion()
			break
		case 7:
			window.solve.solvePassBasic()
			break
		case 8:
			window.solve.solveColExclusion()
			break
		case 9:
			window.solve.solvePassBasic()
			break
		case 10:
			window.solve.solveRegionExclusion()
			break
		case 11:
			window.solve.solvePassBasic()
			break
		case 12:
			window.solve.solveRowExclusion()
			break
		case 13:
			window.solve.solvePassBasic()
			break
		case 14:
			window.solve.solvePassBasic()
			break
		default:
			return
	}

	index++
	setTimeout(window.runRenderWait, waitTime, waitTime, index)
	window.renderView();
}

require("../view/view.jsx")
//require("./view.js")