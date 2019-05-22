class Debugger {
	//tests if the inventory class is working as it's suposed to
	testInventory() {
		let succeeded = true;
		let inv = game.inventory;
		inv.add("dirt",50);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 50 : false);
		inv.remove("dirt",30);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 20 : false);
		inv.remove("dirt",-1);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 20 : false);
		inv.add("dirt",10);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 30 : false);
		inv.add("dirt",-1);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 30 : false);
		inv.add("stone",-1);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		inv.remove("stone",-1);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		inv.remove("stone",10);
		succeeded = (succeeded ? inv.getResourceIndex("stone") == null : false);
		inv.add("stone",10);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("stone")] == 10 : false);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 30 : false);
		inv.remove("stone",20);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("stone")] == 10 : false);
		succeeded = (succeeded ? inv.resourceAmount[inv.getResourceIndex("dirt")] == 30 : false);

		return succeeded;
	}

	
}