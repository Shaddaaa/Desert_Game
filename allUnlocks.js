new Unlock(
	"game.inventory.resourceAmount[game.inventory.getResourceIndex('sand')] >= 5",
	function() {
		game.log("These are bones... hopefully they aren't human...", true); 
		game.inventory.addResources("bone", 1); 
		document.getElementById("searchSand").style.display = "inherit";
	},
	["addedResource"]
);
new Unlock(
	"game.inventory.resourceAmount[game.inventory.getResourceIndex('bone')] >= 10",
	function() {game.log("So many bones... maybe I can use them for something?", true); },
	["addedResource"]
);
new Unlock(
	"game.inventory.resourceAmount[game.inventory.getResourceIndex('dirt')] >= 1",
	function() {
		game.log("It won't be day forever, maybe I can live in that cavern?", true);
		document.getElementById("exploreCavern").style.display = "inherit";
	},
	["addedResource"]
);
new Unlock(
	"game.inventory.cavernExploration >= 2",
	function() {
		game.log("It won't be day forever, maybe I can live in that cavern?", true);
		document.getElementById("exploreCavern").style.display = "inherit";
	},
	["addedResource"]
);