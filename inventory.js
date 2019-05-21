class Inventory {
	constructor() {
		this.resources = [];
		this.resourceAmount = [];
	}
	add(resource, amount) {
		if (amount < 0) {
			game.log("This is an error, please report it to the developer. Code:addnegativ");
		}
		for (let i = 0; i < this.resources.length; i++) {
			if(this.resources[i] == resource) {
				this.resourceAmount[i] += amount;
				game.updateResourceDisplay();
				return;
			}
		}
		this.resources.push(resource);
		this.resourceAmount.push(amount);
		game.updateResourceDisplay();
	}
}