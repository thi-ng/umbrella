import type { Predicate, Range1_32 } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { IDGen } from "@thi.ng/idgen";
import type { ILogger } from "@thi.ng/logger";

export interface ObjectIndexOpts {
	/**
	 * Human-readable name for index (used for logging, if any)
	 */
	name: string;
	/**
	 * Optional logger instance
	 */
	logger?: ILogger;
	/**
	 * Number of bits for IDs, [1..32] range.
	 *
	 * @defaultValue 32
	 */
	bits?: Range1_32;
}

export class ObjectIndex<T> {
	public readonly name: string;
	public logger?: ILogger;
	protected idgen: IDGen;
	protected items: T[] = [];

	constructor(opts: ObjectIndexOpts) {
		this.name = opts.name;
		this.logger = opts.logger;
		this.idgen = new IDGen(opts.bits || 32, 0);
	}

	keys() {
		return this.idgen[Symbol.iterator]();
	}

	*values() {
		for (let id of this.idgen) {
			yield this.items[id];
		}
	}

	/**
	 * Indexes given `item` and assigns it to the next available ID (which might
	 * be a previously freed ID) and returns it.
	 *
	 * @param item
	 */
	add(item: T): number {
		const id = this.idgen.next();
		this.logger && this.logger.debug(`adding ${this.name} ID: ${id}`);
		this.items[id] = item;
		return id;
	}

	/**
	 * Returns true if the given `id` is valid/active.
	 *
	 * @param id
	 */
	has(id: number) {
		return this.idgen.has(id);
	}

	/**
	 * First checks if given `id` is valid and if so frees it (for recycling)
	 * and deletes its corresponding item. If `ensure` is true (default), throws
	 * an error if the ID is invalid (otherwise returns false for invalid IDs).
	 *
	 * @param id
	 * @param ensure
	 */
	delete(id: number, ensure = true) {
		if (this.idgen.has(id)) {
			this.logger && this.logger.debug(`deleting ${this.name} ID: ${id}`);
			this.idgen.free(id);
			delete this.items[id];
			return true;
		}
		assert(!ensure, `can't delete missing ${this.name} ID: ${id}`);
		return false;
	}

	/**
	 * First checks if given `id` is valid and if so returns corresponding item.
	 * If `ensure` is true (default), throws an error if the ID is invalid
	 * (otherwise returns undefined for invalid IDs)
	 *
	 * @param id
	 */
	get(id: number): T;
	get(id: number, ensure: true): T;
	get(id: number, ensure: false): T | undefined;
	get(id: number, ensure = true) {
		ensure &&
			assert(this.idgen.has(id), `missing ${this.name} for ID: ${id}`);
		return this.items[id];
	}

	/**
	 * Applies given predicate to all active items and returns ID of first
	 * matching. If `ensure` is true (default), throws an error if the `pred`
	 * didn't match anything (otherwise returns undefined).
	 *
	 * @param pred
	 * @param ensure
	 */
	find(pred: Predicate<T>, ensure = true) {
		for (let id of this.idgen) {
			if (pred(this.items[id])) return id;
		}
		assert(!ensure, `given predicate matched no ${this.name}`);
	}
}
