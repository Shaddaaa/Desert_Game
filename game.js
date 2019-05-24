class Game {
	constructor() {
		//if 0 the start will be quick, for normal mode make it 1
		let quickstart = 0;
		this.inventory = new Inventory();
		this.logElement = document.getElementById("log");
		this.resourceElement = document.getElementById("resources");
		this.locationElement = document.getElementById("locations");
		setTimeout(function(){ game.log("You awake...", true); game.logElement.style.display = "inherit"; }, 2000*quickstart);
		setTimeout(function(){ game.log("Around you is nothing but desert. There's a rocky hill with a little cavern next to you.", true); game.logElement.style.display = "inherit"; }, 5000*quickstart);
		setTimeout(function(){ game.log("You see some small animal prints and a few dry plants. Maybe you can survive out here..?", true); game.logElement.style.display = "inherit"; }, 9000*quickstart);
		setTimeout(function(){ game.log("Wait... There's something in the sand!", true); document.getElementById("digSand").style.display = "inherit"; }, 13000*quickstart);
		//this.log("You awake. Around you is nothing but desert. There's a hill with a little cavern.", true);
		//this.log("You see some small animals prints. Maybe you can survive out here.", true);
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
		//reset the resource element
		this.resourceElement.innerHTML = "<tr><td class='tableHeader'>Resources:</div></tr>";
		//loop through the inventory and display all the resources
		for (let i = 0; i < this.inventory.resources.length; i++) {
			this.resourceElement.innerHTML += "<tr><td>" + this.inventory.resources[i] + ":</td><td>" + this.inventory.resourceAmount[i] + "</td><tr>"
		}
	}

	updateLocationDisplay() {
		//reset the resource element
		this.locationElement.innerHTML = "<tr><td class='tableHeader'>Exploration:</div></tr>";
		if(this.inventory.cavernExploration > 0)
			this.locationElement.innerHTML += "<tr><td> Cavern: </td><td>" + this.inventory.cavernExploration + "</td><tr>"
	}

	digSand() {
		makeUnclickable(document.getElementById("digSand"), 500);
		this.log("You found 1 sand!");
		this.inventory.addResources("sand", 1);
	}

	searchSand() {
		makeUnclickable(document.getElementById("searchSand"), 500);
		if(this.inventory.resourceAmount[this.inventory.getResourceIndex("sand")] <= 0) {
			this.log("You need some sand to search through!");
			return;
		}
		this.inventory.removeResources("sand",1);
		searchSandLT.addLoot();
	}

	exploreCavern() {
		if(this.inventory.resourceAmount[this.inventory.getResourceIndex("sand")] <= 1) {
			this.log("You need some sand to lay a track to find back");
			return;
		}
		this.inventory.removeResources("sand",2	);
		makeUnclickable(document.getElementById("exploreCavern"), 5000);
		this.inventory.cavernExploration++;
		this.updateLocationDisplay();
	}
}

let game;
let eventManager = new EventManager();
function start() {
	game = new Game();
}