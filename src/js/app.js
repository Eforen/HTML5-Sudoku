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
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solvePassBasic();
	solve.solveRegionExclusion();
	solve.solvePassBasic();
	solve.solveRowExclusion();
	solve.solvePassBasic();
	solve.solveColExclusion();
	solve.solvePassBasic();
	solve.solveRegionExclusion();
	solve.solvePassBasic();
	solve.solveRowExclusion();
	solve.solvePassBasic();
	solve.solvePassBasic();
}