class Game {
	constructor() {
		this.inventory = new Inventory();
		this.logElement = document.getElementById("log");
		this.resourceElement = document.getElementById("resources");
		this.resourceCollectionElement = document.getElementById("");
		this.log("You awake. Around you is nothing but desert. There's a hill with a little cavern.", false);
		this.log("You see some small animals prints. Maybe you can survive out here.", false);
	}

	log(message, showAmount = true) {
		//if the same message is sent multiple times, append the count instead of adding a new message
		if(showAmount && log.lastChild != null && log.lastChild.innerHTML.substring(0,message.length)==message) {
			//get the number behind the last x representing the amount of times this message has been sent in a row
			let count = log.lastChild.substring(lastMsg.lastIndexOf("x") + 1, log.lastChild.lastIndexOf("<"));
			//instead of adding a new message, the amount at the end is adjusted
			log.lastChild.innerHTML = message + " x" + (parseInt(count)+1) + "<br>";
		} else {
			//creates a new message in the log
			this.logElement.innerHTML += "<div class=logMsg>" + message + (showAmount ? " x1" : "") + "<br></div>";
		}
		//scrolls to the bottom of the console
		this.logElement.scrollTop = this.logElement.scrollHeight;
	}

	updateResourceDisplay() {
		//empty the resource element
		this.resourceElement.innerHTML = "";
		//loop through the inventory and display all the resources
		for (let i = 0; i < this.inventory.resources.length; i++) {
			this.resourceElement.innerHTML += "<tr><th>" + this.inventory.resources[i] + ":</th><th>" + this.inventory.resourceAmount[i] + "</th><tr>"
		}
	}

	digSand() {
		this.inventory.add("sand", 1);
		this.log("You found 1 sand!");
		callEvent("digSand");
	}

	digDirt() {
		this.inventory.add("dirt", 1);
		this.log("You found 1 dirt!");
	}
}





let game;
function start() {
	game = new Game();
}