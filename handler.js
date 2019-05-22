class Handler {
	constructor(funct, functString) {
		this.funct = funct;
		this.id = functString.hashCode();
	}
}