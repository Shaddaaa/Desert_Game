//Manages one piece of unlockable progress via events:
//condition: The unlock condition as a string
//unlockFunction: The function to call on unlock
//unlockOnLoadFunction: The function to call if already unlocked, but the save just got loaded
//events: The events on which to check if the condition applies
class Unlock {
	constructor(condition, unlockFunction, unlockOnLoadFunction, events, id) {
		this.condition = condition;
		this.unlockOnLoad = unlockOnLoadFunction;
		this.events = events;
		this.id = id;
		this.unlockFunction = unlockFunction;
		this.handler = this.onEvent.bind(this);
	}
	enable() {
		eventManager.addHandler(this.handler, this.events);
	}
	onEvent() {
		if(this.check())
			this.unlock();
	}
	unlock() {
		eventManager.removeHandler(this.handler);
		game.save.unlockedIDs[this.id] = true;
		this.unlockFunction();
	}
	check() {
		return eval(this.condition);
	}
}