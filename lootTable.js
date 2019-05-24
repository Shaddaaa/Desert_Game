class LootTable {
	constructor(resources = [], amounts = [], chances = []) {
		this.resources = resources;
		this.chances = chances;
		this.amounts = amounts;
	}
	add(resource, amount, chance) {
		this.resources.push(resource);
		this.chances.push(chance);
		this.amounts.push(amount);
	}
	remove(resource) {
		for(let i = 0; i < this.resources.length; i++) {
			if(this.resources[i]==resource) {
				this.resources.splice(i, 1);
				this.chances.splice(i, 1);
				this.amounts.splice(i,1);
				return;
			}
		}
	}
	addLoot() {
		for(let i = 0; i < this.resources.length; i++) {
			if(Math.random() < this.chances[i]) {
				game.inventory.addResources(this.resources[i], getRandomInt(this.amounts[i]-1)+1);
			}
		}
	}
}