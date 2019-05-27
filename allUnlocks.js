let unlocks = [

new Unlock(
	"true",
	function() {
		//if 0 the start will be quick, for normal mode make it 1
		let quickstart = 1;
		setTimeout(function(){ 
			game.log("You awake...", true); 
			game.logElement.style.display = "inherit"; 
		}, 2000*quickstart);
		setTimeout(function(){ game.log("Around you is nothing but desert. There's a rocky hill with a little cavern next to you.", true); }, 5000*quickstart);
		setTimeout(function(){ game.log("You see some small animal prints and a few dry plants. Maybe you can survive out here..?", true); }, 9000*quickstart);
		setTimeout(function(){ 
			game.log("Wait... There's something in the sand!", true);
			document.getElementById("digSand").style.display = "inherit";
			document.getElementById("resources").style.display = "initial";
		}, 13000*quickstart);
	},
	function() {
		document.getElementById("digSand").style.display = "inherit";
		document.getElementById("resources").style.display = "initial";
		game.logElement.style.display = "inherit";
	},
	["gameStart"],
	0
),
new Unlock(
	"game.save.resourceAmount[game.getResourceIndex('sand')] >= 5",
	function() {
		game.log("These are bones... hopefully they aren't human...", true); 
		game.addResources("bone", 1); 
		document.getElementById("searchSand").style.display = "inherit";
	},
	function() {
		document.getElementById("searchSand").style.display = "inherit";
	},
	["addedResource"],
	1
),
new Unlock(
	"game.save.resourceAmount[game.getResourceIndex('bone')] >= 10",
	function() {
		game.log("So many bones... maybe I can use them for something?", true); 
	},
	function() {

	},
	["addedResource"],
	2
),
new Unlock(
	"game.save.resourceAmount[game.getResourceIndex('dirt')] >= 1",
	function() {
		game.log("It won't be day forever, maybe I can live in that cavern?", true);
		document.getElementById("exploreCavern").style.display = "inherit";
		document.getElementById("locations").style.display = "inherit";
	},
	function() {
		document.getElementById("exploreCavern").style.display = "inherit";
		document.getElementById("locations").style.display = "inherit";
	},
	["addedResource"],
	3
),
new Unlock(
	"game.save.cavernExploration >= 4",
	function() {
		game.log("What's that? A table with some notes...", true);
		setTimeout(function() {		
			game.log('"Hello. You won\'t remember me... but... good luck anyways. It\'s all on you now!"', true);
		},3000);		
		setTimeout(function() {		
			game.log("You also find some notes on where to find food and water, survival won't be a problem.", true);
		},8000);
	},
	function() {

	},
	["exploredCavern"],
	4
)
];