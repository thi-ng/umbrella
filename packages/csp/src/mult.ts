import type { IClosable, IWriteable } from "./api.js";
import { Channel } from "./channel.js";
import { __nextID } from "./idgen.js";

export const mult = <T>(arg?: string | Channel<T>) => new Mult<T>(arg);

export class Mult<T> implements IWriteable<T>, IClosable {
	protected src: Channel<any>;
	protected taps: Channel<any>[] = [];

	constructor(arg?: string | Channel<T>) {
		let id, src;
		if (typeof arg === "string") {
			id = arg;
		} else {
			src = arg;
		}
		this.src =
			src instanceof Channel
				? src
				: new Channel<T>({ id: id ?? `mult${__nextID()}` });
		this.process();
	}

	writable() {
		return this.src.writable();
	}

	write(val: T) {
		return this.src.write(val);
	}

	close() {
		return this.src.close();
	}

	closed() {
		return this.src.closed();
	}

	subscribe(ch?: Channel<T>) {
		if (!ch) {
			ch = new Channel({
				id: `${this.src.id}-tap${__nextID()}`,
			});
		} else if (this.taps.includes(ch)) {
			return ch;
		}
		this.taps.push(ch);
		return ch;
	}

	unsubscribe(ch: Channel<T>) {
		const idx = this.taps.indexOf(ch);
		if (idx >= 0) {
			this.taps.splice(idx, 1);
			return true;
		}
		return false;
	}

	unsubscribeAll(close = true) {
		if (close) {
			for (let t of this.taps) t.close();
		}
		this.taps.length = 0;
	}

	protected async process() {
		let x;
		while ((x = await this.src.read()) !== undefined) {
			for (let t of this.taps) {
				if (!(await t.write(x))) {
					this.unsubscribe(t);
				}
			}
			x = null;
		}
		this.unsubscribeAll();
	}
}
