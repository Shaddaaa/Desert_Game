class Debugger {
	constructor() {
		game.inventory.add("dirt",5);
		game.inventory.add("stone",51);
		game.inventory.add("stone",0);
		game.inventory.add("stone",1);
		game.inventory.add("gold",1);
		game.inventory.add("gold",-1);
		this.logInventory();
	}
	logInventory() {
		for (let i = 0; i < game.inventory.resources.length; i++) {
			console.log(game.inventory.resources[i] + ": " + game.inventory.resourceAmount[i]);
		}
	}
}