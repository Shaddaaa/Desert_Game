//Manages one piece of unlockable progress via events:
//condition: The unlock condition as a string
//unlockFunction: The function to call on unlock
//events: The events on which to check if the condition applies
class Unlock {
	constructor(condition, unlockFunction, events) {
		this.condition = condition;
		this.id = (condition + unlockFunction + events).hashCode();
		this.unlockFunction = unlockFunction;
		eventManager.addHandler(new Handler(this.onEvent.bind(this), this.onEvent.toString()), events);
	}
	onEvent() {
		if(this.check())
			this.unlock();
	}
	unlock() {
		this.unlockFunction();
		eventManager.removeHandler(new Handler(this.onEvent.bind(this), this.onEvent.toString()));
	}
	check() {
		return eval(this.condition);
	}
}