let u = new Unlock(
	"game.inventory.resourceAmount[game.inventory.getResourceIndex('sand')] > 5",
	function() {game.log("These are bones... hopefully they aren't human...", true); game.inventory.addResources("bone", 1);},
	["addedResource"]
);