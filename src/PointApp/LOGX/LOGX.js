


class LOGXClass {
	constructor (name="App", parent=null) {
		this.parent = parent;
		this.name = name;
		this.tabs = parent ? (parent.tabs + "\t") : "";
		this.setPrefix();

		this.count = 0;
		this.children = [];
	}

	setPrefix () {
		this.prefix = `${this.tabs}(${this.name})`;
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

	plain = (message) => console.log(message);

	put (message) {
		this.plain(`[${++this.count}] ${this.prefix} ${message}`);
	}

	putAt (message) {
		const ts = new Date().toLocaleTimeString();
		this.put(`${message} at ${ts}`);
	}

	actionLog = (action, what, id) => this.put(`${action} ${what}: '${id || '#'}'`);
	actionLogAt = (action, what, id) => this.putAt(`${action} ${what}: '${id || '#'}'`);

	setState = (what) => this.actionLog('setState', what);
	setStateAt = (what) => this.actionLogAt('setState', what);

	created = (what, id) => this.actionLog('created', what, id);
	createdAt = (what, id) => this.actionLogAt('created', what, id);

	saved = (what, id) => this.actionLog('saved', what, id);
	savedAt = (what, id) => this.actionLogAt('saved', what, id);

	updated = (what, id) => this.actionLog('updated', what, id);
	updatedAt = (what, id) => this.actionLogAt('updated', what, id);

	deleted = (what, id) => this.actionLog('deleted', what, id);
	deletedAt = (what, id) => this.actionLogAt('deleted', what, id);

	deletedFrom (from, what) {
		this.put(`deleted from ${from}: '${what}'`);
	}

	returnedN (from, n, what='items') {
		this.put(`returned from ${from}(): '${n} ${what}'`);
	}
}

const LOGX = new LOGXClass();
export default LOGX;
