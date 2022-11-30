


class LOGXClass {
	constructor (parent=null) {
		this.parent = parent;
		this.prefix = parent ? (parent.prefix + "\t") : "";
	}

	post (message) {
		console.log(`${this.prefix}${message}`);
	}

	setState (name) {
		this.post(`setState: '${name}'`);
	}

	savedAt (name) {
		const ts = new Date().toLocaleTimeString();
		this.post(`saved: ${name} at ${ts}`);
	}
}

const LOGX = new LOGXClass();
export default LOGX;
