//Manages one piece of unlockable progress via events:
//condition: The unlock condition as a string
//unlockFunction: The function to call on unlock
//events: The events on which to check if the condition applies
class Unlock {
	constructor(condition, unlockFunction, events) {
		this.condition = condition;
		this.id = (condition + unlockFunction + events).hashCode();
		this.unlockFunction = unlockFunction;
		this.handler = this.onEvent.bind(this);
		eventManager.addHandler(this.handler, events);
	}
	onEvent() {
		if(this.check())
			this.unlock();
	}
	unlock() {
		eventManager.removeHandler(this.handler);
		this.unlockFunction();
	}
	check() {
		return eval(this.condition);
	}
}