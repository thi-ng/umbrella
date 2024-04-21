import { DCons } from "@thi.ng/dcons/dcons";
import type { IWriteableChannel } from "./api.js";
import { __nextID } from "./idgen.js";
import { ChannelV3 } from "./v3.js";

export class Mult<T> implements IWriteableChannel<T> {
	protected src: ChannelV3<any>;
	protected taps: DCons<ChannelV3<any>>;

	constructor(id?: string);
	constructor(src?: ChannelV3<T>);
	constructor(arg?: string | ChannelV3<T>) {
		let id, src;
		if (typeof arg === "string") {
			id = arg;
		} else {
			src = arg;
		}
		this.src =
			src instanceof ChannelV3
				? src
				: new ChannelV3<T>({ id: id ?? `mult${__nextID()}` });
		this.taps = new DCons();
		this.process();
	}

	write(val: any) {
		if (this.src) {
			return this.src.write(val);
		}
		return Promise.resolve(false);
	}

	close() {
		return this.src ? this.src.close() : undefined;
	}

	tap(ch?: ChannelV3<T>) {
		if (this.taps) {
			if (!ch) {
				ch = new ChannelV3({
					id: `${this.src.id}-tap${__nextID()}`,
				});
			} else if (this.taps.find(ch)) {
				return ch;
			}
			this.taps.push(ch);
			return ch;
		}
	}

	untap(ch: ChannelV3<T>) {
		if (this.taps) {
			const t = this.taps.find(ch);
			if (t) {
				this.taps.remove(t);
				return true;
			}
		}
		return false;
	}

	untapAll(close = true) {
		if (this.taps) {
			let tap = this.taps.head;
			while (tap) {
				close && tap.value.close();
				this.taps.remove(tap);
				tap = tap.next;
			}
			return true;
		}
		return false;
	}

	protected async process() {
		let x;
		while (((x = null), (x = await this.src.read())) !== undefined) {
			let t = this.taps.head;
			while (t) {
				if (!(await t.value.write(x))) {
					this.taps.remove(t);
				}
				t = t.next;
			}
		}
		for (let t of this.taps) {
			t.close();
		}
		delete (<any>this).src;
		delete (<any>this).taps;
		delete (<any>this).tapID;
	}
}
