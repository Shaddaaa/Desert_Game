class Eventmanager {
	constructor() {
		//two dimensional array index 0 of the second array is the event, all the others are the handler indices
		this.eventsToHandlers = [];
		this.handler = [];
	}

	invoke(event) {
		for(let i = 0; i < this.eventsToHandlers.length; i++) {
			if(event == this.eventsToHandlers[i][0]) {
				for(let j = 1; j < this.eventsToHandlers[i].length; j++) {
					this.handler[this.eventsToHandlers[i][j]]();
					console.log("Invoked!");
				}
			}
		}
	}

	getEventIndex(event) {
		for(let i = 0; i < this.eventsToHandlers.length; i++) {
			if(this.eventsToHandlers[i][0] == event) {
				return i;
			}
		}
		return null;
	}

	addHandler(handler, events) {
		this.handler.push(handler);
		//loop through all the required events and add them if they aren't there yet
		for(let j = 0; j < events.length; j++) {
			console.log(j);
			let index = this.getEventIndex(events[j]);
			if(index!=null) {
				this.eventsToHandlers[index].push(this.handler.length-1);
			} else {
				this.eventsToHandlers.push([events[j]]);
				this.eventsToHandlers[this.eventsToHandlers.length-1].push(this.handler.length-1);
			}

		}

	}
}