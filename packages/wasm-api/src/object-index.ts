import type { Predicate } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { ILogger } from "@thi.ng/logger";

export class ObjectIndex<T> {
	constructor(
		public name: string,
		public items: T[] = [],
		public logger?: ILogger
	) {}

	add(x: T): number {
		const id = this.items.length - 1;
		this.logger && this.logger.debug(`adding ${this.name} ID: ${id}`);
		this.items[id] = x;
		return id;
	}

	removeID(id: number) {
		if (this.items[id] !== undefined) {
			this.logger && this.logger.debug(`deleting ${this.name} ID: ${id}`);
			delete this.items[id];
			return true;
		}
		return false;
	}

	getID(id: number): T;
	getID(id: number, ensure: true): T;
	getID(id: number, ensure: false): T | undefined;
	getID(id: number, ensure = true) {
		const obj = this.items[id];
		ensure &&
			assert(obj !== undefined, `missing ${this.name} for ID: ${id}`);
		return obj;
	}

	findID(pred: Predicate<T>, ensure = true) {
		const id = this.items.findIndex(pred);
		ensure && assert(id >= 0, `can't find ${this.name}`);
		return id;
	}
}
