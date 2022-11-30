


class LOGXClass {
	constructor (name="App", parent=null) {
		this.parent = parent;
		this.name = name;
		this.tabs = parent ? (parent.tabs + "\t") : "";
		this.setPrefix();

		this.children = [];
	}

	setPrefix () {
		this.prefix = `${this.tabs}[${this.name}]`;
	}

	getChild (name) {
		const found = this.children.find(ch => ch.name === name);
		if (found) {
			return found;
		} else {
			const child = new LOGXClass(name, this);
			this.children.push(child);
			return child;
		}
	}

	plain (message) {
		console.log(message);
	}

	put (message) {
		console.log(`${this.prefix} ${message}`);
	}

	setState (name) {
		this.put(`setState: '${name}'`);
	}

	savedAt (name) {
		const ts = new Date().toLocaleTimeString();
		this.put(`saved: ${name} at ${ts}`);
	}

	created (what, id) {
		this.put(`created ${what}: '${id}'`);
	}

	updated (what, id) {
		this.put(`updated ${what}: '${id}'`);
	}

	deletedFrom (from, what) {
		this.put(`deleted from ${from}: '${what}'`);
	}

	returnedN (from, n, what='items') {
		this.put(`returned from ${from}(): '${n} ${what}'`);
	}
}

const LOGX = new LOGXClass();
export default LOGX;
