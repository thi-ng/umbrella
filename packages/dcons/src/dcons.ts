import type {
	Comparator,
	Fn,
	ICompare,
	IEmpty,
	ISeq,
	ISeqable,
	IStack,
} from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { ensureIndex } from "@thi.ng/errors/out-of-bounds";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { AList } from "./alist.js";
import type { ConsCell } from "./api.js";

export class DCons<T>
	extends AList<DCons<T>, T>
	implements
		ICompare<DCons<T>>,
		IEmpty<DCons<T>>,
		IStack<T, T, DCons<T>>,
		ISeqable<T>
{
	protected _tail: ConsCell<T> | undefined;

	constructor(src?: Iterable<T>) {
		super();
		src && this.into(src);
	}

	get tail() {
		return this._tail;
	}

	append(value: T): ConsCell<T> {
		if (this._tail) {
			const cell = <ConsCell<T>>{ value, prev: this._tail };
			this._tail.next = cell;
			this._tail = cell;
			this._length++;
			return cell;
		} else {
			return this.prepend(value);
		}
	}

	asHead(cell: ConsCell<T>) {
		if (cell === this._head) {
			return this;
		}
		this.remove(cell);
		this._head!.prev = cell;
		cell.next = this._head;
		cell.prev = undefined;
		this._head = cell;
		this._length++;
		return this;
	}

	asTail(cell: ConsCell<T>) {
		if (cell === this._tail) {
			return this;
		}
		this.remove(cell);
		this._tail!.next = cell;
		cell.prev = this._tail;
		cell.next = undefined;
		this._tail = cell;
		this._length++;
		return this;
	}

	/** @deprecated use {@link DCons.prepend} */
	cons(value: T): DCons<T> {
		this.prepend(value);
		return this;
	}

	copy() {
		return new DCons<T>(this);
	}

	*cycle() {
		while (true) {
			yield* this;
		}
	}

	drop() {
		const cell = this._head;
		if (cell) {
			this._head = cell.next;
			if (this._head) {
				this._head.prev = undefined;
			} else {
				this._tail = undefined;
			}
			this._length--;
			return cell.value;
		}
	}

	empty() {
		return new DCons<T>();
	}

	insertAfter(cell: ConsCell<T>, value: T) {
		const newCell = <ConsCell<T>>{ value, next: cell.next, prev: cell };
		if (cell.next) {
			cell.next.prev = newCell;
		} else {
			this._tail = newCell;
		}
		cell.next = newCell;
		this._length++;
		return newCell;
	}

	insertAfterNth(n: number, x: T) {
		if (n < 0) {
			n += this._length;
		}
		if (n >= this._length - 1) {
			return this.append(x);
		} else {
			ensureIndex(n, 0, this._length);
			return this.insertAfter(this.nthCellUnsafe(n)!, x);
		}
	}

	insertBefore(cell: ConsCell<T>, value: T) {
		const newCell = <ConsCell<T>>{ value, next: cell, prev: cell.prev };
		if (cell.prev) {
			cell.prev.next = newCell;
		} else {
			this._head = newCell;
		}
		cell.prev = newCell;
		this._length++;
		return newCell;
	}

	insertBeforeNth(n: number, x: T) {
		if (n < 0) {
			n += this._length;
		}
		if (n <= 0) {
			return this.prepend(x);
		} else {
			ensureIndex(n, 0, this._length);
			return this.insertBefore(this.nthCellUnsafe(n)!, x);
		}
	}

	map<R>(fn: Fn<T, R>) {
		return this._map(new DCons<R>(), fn);
	}

	nth(n: number, notFound?: T) {
		const cell = this.nthCell(n);
		return cell ? cell.value : notFound;
	}

	nthCell(n: number) {
		if (n < 0) {
			n += this._length;
		}
		if (n < 0 || n >= this._length) {
			return;
		}
		return this.nthCellUnsafe(n);
	}

	pop() {
		const cell = this._tail;
		if (!cell) {
			return;
		}
		this._tail = cell.prev;
		if (this._tail) {
			this._tail.next = undefined;
		} else {
			this._head = undefined;
		}
		this._length--;
		return cell.value;
	}

	prepend(value: T): ConsCell<T> {
		const cell = <ConsCell<T>>{ value, next: this._head };
		if (this._head) {
			this._head.prev = cell;
		} else {
			this._tail = cell;
		}
		this._head = cell;
		this._length++;
		return cell;
	}

	push(value: T): DCons<T> {
		this.append(value);
		return this;
	}

	release() {
		this._tail = undefined;
		return super.release();
	}

	remove(cell: ConsCell<T>) {
		if (cell.prev) {
			cell.prev.next = cell.next;
		} else {
			this._head = cell.next;
		}
		if (cell.next) {
			cell.next.prev = cell.prev;
		} else {
			this._tail = cell.prev;
		}
		this._length--;
		return this;
	}

	rotateLeft() {
		switch (this._length) {
			case 0:
			case 1:
				return this;
			case 2:
				return this.swap(this._head!, this._tail!);
			default:
				return this.push(this.drop()!);
		}
	}

	rotateRight() {
		switch (this._length) {
			case 0:
			case 1:
				return this;
			case 2:
				return this.swap(this._head!, this._tail!);
			default:
				const x = this.peek();
				this.pop();
				this.prepend(x!);
				return this;
		}
	}

	/**
	 * Implementation of
	 * [ISeqable.seq](https://docs.thi.ng/umbrella/api/interfaces/ISeqable.html#seq.seq-1)
	 */
	seq(start = 0, end = this.length) {
		if (start >= end || start < 0) return;
		let cell = this.nthCell(start);
		const last = this.nthCell(end - 1);
		const $seq = (cell: ConsCell<T>): ISeq<T> => ({
			first() {
				return cell.value;
			},
			next() {
				return cell !== last && cell.next ? $seq(cell.next) : undefined;
			},
		});
		return cell ? $seq(cell) : undefined;
	}

	/**
	 * Shuffles list by probabilistically moving cells to head or tail
	 * positions.
	 *
	 * @remarks
	 * Supports configurable iterations and custom PRNG via
	 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
	 * (default:
	 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html)).
	 *
	 * Default iterations: `ceil(3/2 * log2(n))`
	 *
	 * @param iter -
	 * @param rnd -
	 */
	shuffle(iter?: number, rnd: IRandom = SYSTEM) {
		if (this._length < 2) return this;
		for (
			iter =
				iter !== undefined
					? iter
					: Math.ceil(1.5 * Math.log2(this._length));
			iter > 0;
			iter--
		) {
			let cell = this._head;
			while (cell) {
				const next = cell.next;
				rnd.probability(0.5) ? this.asHead(cell) : this.asTail(cell);
				cell = next;
			}
		}
		return this;
	}

	slice(from = 0, to = this.length) {
		let a = from < 0 ? from + this._length : from;
		let b = to < 0 ? to + this._length : to;
		if (a < 0 || b < 0) {
			illegalArgs("invalid indices: ${from} / ${to}");
		}
		const res = new DCons<T>();
		let cell = this.nthCell(a);
		while (cell && ++a <= b) {
			res.push(cell.value);
			cell = cell.next;
		}
		return res;
	}

	/**
	 * Merge sort implementation based on Simon Tatham's algorithm:
	 * https://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
	 *
	 * @remarks
	 * Uses [`compare()`](https://docs.thi.ng/umbrella/compare/functions/compare.html) as default comparator.
	 *
	 * @param cmp -
	 */
	sort(cmp: Comparator<T> = compare) {
		if (!this._length) return this;
		let inSize = 1;
		while (true) {
			let p = this._head;
			this._head = undefined;
			this._tail = undefined;
			let numMerges = 0;
			while (p) {
				numMerges++;
				let q: ConsCell<T> | undefined = p;
				let psize = 0;
				for (let i = 0; i < inSize; i++) {
					psize++;
					q = q!.next;
					if (!q) break;
				}
				let qsize = inSize;
				while (psize > 0 || (qsize > 0 && q)) {
					let e: ConsCell<T> | undefined;
					if (psize === 0) {
						e = q;
						q = q!.next;
						qsize--;
					} else if (!q || qsize === 0) {
						e = p;
						p = p!.next;
						psize--;
					} else if (cmp(p!.value, q!.value) <= 0) {
						e = p;
						p = p!.next;
						psize--;
					} else {
						e = q;
						q = q!.next;
						qsize--;
					}
					if (this._tail) {
						this._tail!.next = e;
					} else {
						this._head = e;
					}
					e!.prev = this._tail;
					this._tail = e;
				}
				p = q;
			}
			this._tail!.next = undefined;
			if (numMerges <= 1) {
				return this;
			}
			inSize *= 2;
		}
	}

	splice(at: ConsCell<T> | number, del = 0, insert?: Iterable<T>): DCons<T> {
		let cell: ConsCell<T> | undefined;
		if (typeof at === "number") {
			if (at < 0) {
				at += this._length;
			}
			ensureIndex(at, 0, this._length);
			cell = this.nthCellUnsafe(at);
		} else {
			cell = at;
		}
		const removed = new DCons<T>();
		if (del > 0) {
			while (cell && del-- > 0) {
				this.remove(cell);
				removed.push(cell.value);
				cell = cell.next;
			}
		} else if (cell) {
			cell = cell.next;
		}
		if (insert) {
			if (cell) {
				for (let i of insert) {
					this.insertBefore(cell, i);
				}
			} else {
				for (let i of insert) {
					this.push(i);
				}
			}
		}
		return removed;
	}
}

/**
 * Functional syntax sugar for `new DCons(src?)`.
 *
 * @param src -
 */
export const defDCons = <T>(src?: Iterable<T>) => new DCons(src);

/**
 * @deprecated use {@link defDCons} instead
 */
export const dcons = defDCons;
