class EventManager {
	constructor() {
		//two dimensional array index 0 of the second array is the event, all the others are the handler indices
		this.eventsToHandlers = [];
		this.handlers = [];
	}

	//invokes all handlers that are subscribed to the event
	invoke(event) {
		//add all methods that need to be invoked to this array. This is because handlers might unsubscribe and change the eventsToHandler.length -> making the loop go out of bounds
		let toInvoke = [];
		for(let i = 0; i < this.eventsToHandlers.length; i++) {
			if(event == this.eventsToHandlers[i][0]) {
				for(let j = 1; j < this.eventsToHandlers[i].length; j++) {
					toInvoke.push(this.handlers[this.eventsToHandlers[i][j]].funct);
				}
			}
		}
		for(let i = 0; i < toInvoke.length; i++)
			toInvoke[i]();
	}

	getEventIndex(event) {
		for(let i = 0; i < this.eventsToHandlers.length; i++) {
			if(this.eventsToHandlers[i][0] == event) {
				return i;
			}
		}
		return null;
	}

	//adds a handler and specifies on which events it should be called
	//handler is an object containing a function and an id; events is an array of strings
	addHandler(handler, events) {
		let handlerIndex = -1;
		//get the index of the handler if it already exists, otherwise push the new one and set index accordingly
		for(let i = 0; i < this.handlers.length; i++) {
			if(handler.id==this.handlers[i].id) {
				handlerIndex = i;
				break;
			}
		}
		if(handlerIndex==-1) {
			this.handlers.push(handler);
			handlerIndex = this.handlers.length-1;
		}

		//loop through all the required events and add them if they aren't there yet
		for(let j = 0; j < events.length; j++) {
			let index = this.getEventIndex(events[j]);
			if(index!=null) {
				//test if the handler is already subscribed to that event and prevent subscribing a second time
				let exists = false;
				for(let i = 1; i < this.eventsToHandlers[index].length; i++) {
					if(this.eventsToHandlers[index][i]==handlerIndex) {
						exists = true;
					}
				}
				if(!exists) {
					this.eventsToHandlers[index].push(handlerIndex);
				}
			} else {
				//add a new event and subscribe the handler to it
				this.eventsToHandlers.push([events[j]]);
				this.eventsToHandlers[this.eventsToHandlers.length-1].push(handlerIndex);
			}

		}
	}

	//Removes a handler completely leaving no null gaps in the arrays
	removeHandler(handler) {
		let index;
		//remove the handler from the handler array
		for(let i = 0; i < this.handlers.length; i++) {
			if(this.handlers[i].id==handler.id) {
				index = i;
				this.handlers.splice(index, 1);
				break;
			}
		}
		//remove all indices referring to the handler handler from the eventsToHandlers array
		if(index!=null) {
			for(let i = 0; i < this.eventsToHandlers.length; i++) {
				for(let j = 1; j < this.eventsToHandlers[i].length; j++) {
					if(this.eventsToHandlers[i][j]==index) {
						this.eventsToHandlers[i].splice(j,1);
					}
					if(this.eventsToHandlers[i][j]>index) {
						this.eventsToHandlers[i][j]--;
					}
				}
				//remove the event if there are no handlers to be called
				if(this.eventsToHandlers[i].length<=1)
					this.eventsToHandlers.splice(i,1);
			}
		}
	}

}