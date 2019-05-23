class Inventory {
	constructor() {
		this.resources = [];
		this.resourceAmount = [];
	}
	addResources(resource, amount) {
		if(amount < 0) {
			game.log("This is an error, please report it to the developer. Code:addnegativ");
			return;
		}
		for(let i = 0; i < this.resources.length; i++) {
			if(this.resources[i] == resource) {
				this.resourceAmount[i] += amount;
				eventManager.invoke("addedResource");
				game.updateResourceDisplay();
				return;
			}
		}
		this.resources.push(resource);
		this.resourceAmount.push(amount);
		eventManager.invoke("addedResource");
		game.updateResourceDisplay();
	}
	removeResources(resource, amount) {
		if(amount < 0) {
			game.log("This is an error, please report it to the developer. Code:removenegativ");
			return false;
		}
		let index = this.getResourceIndex(resource);
		if(index!=null) {
			if(amount > this.resourceAmount[index]) {
				game.log("Can't afford that yet!");
				return false;
			}
			this.resourceAmount[index] -= amount;
			eventManager.invoke("removedResource");
			game.updateResourceDisplay();
			return true;
		}
		return false;
	}
	getResourceIndex(resource) {
		for(let i = 0; i < this.resources.length; i++) {
			if(this.resources[i] == resource) {
				return i;
			}
		}
		return null;
	}
}