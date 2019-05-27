class Game {
	constructor() {
		this.save = new Save();
		this.logElement = document.getElementById("log");
		this.resourceElement = document.getElementById("resources");
		this.locationElement = document.getElementById("locations");
		this.buildingElement = document.getElementById("buildings");
	}

	log(message, story = false) {
		//if the same message is sent multiple times, append the count instead of adding a new message
		if(!story && log.lastChild != null && log.lastChild.innerHTML.substring(0,message.length)==message) {
			//get the number behind the last x representing the amount of times this message has been sent in a row
			let count = log.lastChild.innerHTML.substring(log.lastChild.innerHTML.lastIndexOf("x") + 1, log.lastChild.innerHTML.lastIndexOf("<"));
			//instead of adding a new message, the amount at the end is adjusted
			log.lastChild.innerHTML = message + " x" + (parseInt(count)+1) + "<br>";
		} else {
			//creates a new message in the log
			this.logElement.innerHTML += "<div class='logMsg'" + (story ? "" : "style='color: gray'") + ">" + message + (story ? "" : " x1") + "<br></div>";
		}
		//scrolls to the bottom of the console
		this.logElement.scrollTop = this.logElement.scrollHeight;
	}

	updateResourceDisplay() {
		if(this.save.resources.length==0)
			return;
		//reset the resource element
		this.resourceElement.innerHTML = "<tr><td class='tableHeader'>Resources:</div></tr>";
		//loop through the save and display all the resources
		for (let i = 0; i < this.save.resources.length; i++) {
			this.resourceElement.innerHTML += "<tr><td>" + this.save.resources[i] + ":</td><td>" + this.save.resourceAmount[i] + "</td><tr>"
		}
	}

	updateLocationDisplay() {
		if(this.save.cavernExploration <= 0)
			return;
		
		//reset the resource element
		this.locationElement.innerHTML = "<tr><td class='tableHeader'>Exploration:</div></tr>";
		if(this.save.cavernExploration > 0)
			this.locationElement.innerHTML += "<tr><td> Cavern: </td><td>" + this.save.cavernExploration + "</td><tr>"
	}

	addResources(resource, amount) {
		if(amount < 0) {
			this.log("This is an error, please report it to the developer. Code:addnegativ");
			return;
		}
		for(let i = 0; i < this.save.resources.length; i++) {
			if(this.save.resources[i] == resource) {
				this.save.resourceAmount[i] += amount;
				eventManager.invoke("addedResource");
				this.updateResourceDisplay();
				return;
			}
		}
		this.save.resources.push(resource);
		this.save.resourceAmount.push(amount);
		eventManager.invoke("addedResource");
		this.updateResourceDisplay();
	}
	
	removeResources(resource, amount) {
		if(amount < 0) {
			this.log("This is an error, please report it to the developer. Code:removenegativ");
			return false;
		}
		let index = this.getResourceIndex(resource);
		if(index!=null) {
			if(amount > this.save.resourceAmount[index]) {
				this.log("Can't afford that yet!");
				return false;
			}
			this.save.resourceAmount[index] -= amount;
			eventManager.invoke("removedResource");
			this.updateResourceDisplay();
			return true;
		}
		return false;
	}
	
	getResourceIndex(resource) {
		for(let i = 0; i < this.save.resources.length; i++) {
			if(this.save.resources[i] == resource) {
				return i;
			}
		}
		return null;
	}
	digSand() {
		makeUnclickable(document.getElementById("digSand"), 500);
		this.addResources("sand", 1);
	}

	searchSand() {
		makeUnclickable(document.getElementById("searchSand"), 500);
		if(this.save.resourceAmount[this.getResourceIndex("sand")] <= 0) {
			this.log("You need some sand to search through!");
			return;
		}
		this.removeResources("sand",1);
		searchSandLT.addLoot();
	}

	exploreCavern() {
		makeUnclickable(document.getElementById("exploreCavern"), 5000);
		this.save.cavernExploration++;
		eventManager.invoke("exploredCavern");
		this.updateLocationDisplay();
	}
}

let game;
let eventManager = new EventManager();

function start() {
	game = new Game();
	loadSave();
}

function saveAll() {
	localStorage.setItem("save", JSON.stringify(game.save));
}

function loadSave() {
	if(localStorage.getItem("save") != null && localStorage.getItem("save") != "")
		game.save = JSON.parse(localStorage.getItem("save"));
	
	//add unlocks as needed
	for(let i = 0; i < unlocks.length; i++) {
		if(!game.save.unlockedIDs[unlocks[i].id])
			unlocks[i].enable();
		else
			unlocks[i].unlockOnLoad();
	}
	eventManager.invoke("gameStart");
	setInterval(saveAll, 20000);
	game.updateResourceDisplay();
	game.updateLocationDisplay();
}