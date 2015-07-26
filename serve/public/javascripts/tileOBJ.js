console.log("Loaded tileOBJ.js");

module.exports = function(row,col,area,rowP,colP){
	row.tiles[rowP] = this;
	col.tiles[colP] = this;
	var areaP = parseInt(rowP/3) + parseInt(colP % 3);
	area = 
	//TODO: Make Areas make sense!

	this.available = function(){
		var av = [];
		for (var i = 0; i < 9; i++) {
			if(i in this.tiles) av[i] = false;
			else av[i] = true;
		};
		return av;
	}
	
	this.tiles = [];
}