class Debugger {
	//tests if the inventory part of the save class is working as it's suposed to
	testInventory() {
		let succeeded = true;
		let inv = game.save;
		game.addResources("dirt",50);
		succeeded = (succeeded ? inv.resourceAmount[game.getResourceIndex("dirt")] == 50 : false);
		game.removeResources("dirt",30);
		succeeded = (succeeded ? inv.resourceAmount[game.getResourceIndex("dirt")] == 20 : false);
		game.removeResources("dirt",-1);
		succeeded = (succeeded ? inv.resourceAmount[game.getResourceIndex("dirt")] == 20 : false);
		game.addResources("dirt",10);
		succeeded = (succeeded ? inv.resourceAmount[game.getResourceIndex("dirt")] == 30 : false);
		game.addResources("dirt",-1);
		succeeded = (succeeded ? inv.resourceAmount[game.getResourceIndex("dirt")] == 30 : false);
		game.addResources("stone",-1);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		game.removeResources("stone",-1);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		game.removeResources("stone",10);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		game.addResources("stone",10);
		succeeded = (succeeded ? inv.resourceAmount[getResourceIndex("stone")] == 10 : false);
		succeeded = (succeeded ? inv.resourceAmount[getResourceIndex("dirt")] == 30 : false);
		game.removeResources("stone",20);
		succeeded = (succeeded ? inv.resourceAmount[getResourceIndex("stone")] == 10 : false);
		succeeded = (succeeded ? inv.resourceAmount[getResourceIndex("dirt")] == 30 : false);

		return succeeded;
	}
}