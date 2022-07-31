import type { Fn, ICompare, ICopy, IEmpty, ISeq } from "@thi.ng/api";
import { AList } from "./alist.js";
import type { ConsCell } from "./api.js";

/**
 * A closed-loop doubly-linked list/ring with a similar (but more limited API)
 * as {@link DCons}.
 */
export class DRing<T>
	extends AList<DRing<T>, T>
	implements ICopy<DRing<T>>, ICompare<DRing<T>>, IEmpty<DRing<T>>
{
	get tail() {
		return this._head ? this._head.prev : undefined;
	}

	append(value: T) {
		if (!this._head) return this.prepend(value);
		const prev = this._head.prev!;
		const cell = <ConsCell<T>>{
			value,
			prev,
			next: this._head,
		};
		prev.next = cell;
		this._head.prev = cell;
		this._length++;
		return cell;
	}

	copy() {
		return new DRing<T>(this);
	}

	drop() {
		if (this._head) {
			const res = this._head.value;
			this.remove(this._head);
			return res;
		}
	}

	empty() {
		return new DRing<T>();
	}

	insertBefore(cell: ConsCell<T>, value: T) {
		const newCell = <ConsCell<T>>{ value, prev: cell.prev, next: cell };
		cell.prev!.next = newCell;
		cell.prev = newCell;
		if (cell === this._head) {
			this._head = newCell;
		}
		this._length++;
		return newCell;
	}

	insertAfter(cell: ConsCell<T>, value: T) {
		const newCell = <ConsCell<T>>{ value, prev: cell, next: cell.next };
		cell.next!.prev = newCell;
		cell.next = newCell;
		this._length++;
		return newCell;
	}

	map<R>(fn: Fn<T, R>) {
		return this._map(new DRing<R>(), fn);
	}

	nth(n: number, notFound?: T) {
		const cell = this.nthCell(n);
		return cell ? cell.value : notFound;
	}

	nthCell(n: number) {
		const len = this._length;
		return len
			? this.nthCellUnsafe(n - Math.floor(n / len) * len)
			: undefined;
	}

	prepend(value: T) {
		let cell: ConsCell<T>;
		if (this._head) {
			const tail = this.tail!;
			cell = { value, prev: tail, next: this._head };
			tail.next = cell;
			this._head.prev = cell;
			this._head = cell;
		} else {
			cell = <ConsCell<T>>{ value };
			cell.prev = cell;
			cell.next = cell;
			this._head = cell;
		}
		this._length++;
		return cell;
	}

	remove(v: ConsCell<T>) {
		if (this._head === v) {
			if (this._length === 1) {
				this._head = undefined;
				this._length = 0;
				return;
			}
			this._head = v.next;
		}
		v.prev!.next = v.next;
		v.next!.prev = v.prev;
		this._length--;
	}

	rotateLeft() {
		this._head && (this._head = this._head.next);
		return this;
	}

	rotateRight() {
		this._head && (this._head = this._head.prev);
		return this;
	}

	/** {@inheritDoc @thi.ng/api#ISeqable.seq} */
	seq() {
		const $seq = (cell: ConsCell<T>): ISeq<T> => ({
			first() {
				return cell.value;
			},
			next() {
				return $seq(cell.next!);
			},
		});
		return this._head ? $seq(this._head) : undefined;
	}

	traverse(
		fn: Fn<ConsCell<T>, boolean | number>,
		start: ConsCell<T> | undefined = this._head,
		end: ConsCell<T> | undefined = start
	) {
		return super.traverse(fn, start, end);
	}
}

/**
 * Functional syntax sugar for `new DRing(src?)`.
 *
 * @param src -
 */
export const defDRing = <T>(src?: Iterable<T>) => new DRing(src);
