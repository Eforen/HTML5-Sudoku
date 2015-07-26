console.log("Loaded tileOBJ.js");

module.exports = function(row,col,area,rowP,colP){
	row.tiles[rowP] = this;
	col.tiles[colP] = this;
	var areaP = parseInt(rowP/3) + parseInt(colP % 3);
	area = 
	//TODO: Make Areas make sense!
	
	this.tiles = [];
}