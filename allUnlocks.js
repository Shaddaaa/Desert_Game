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
	function() {game.log("I really really hope these aren't from a human...", true); },
	["addedResource"]
);