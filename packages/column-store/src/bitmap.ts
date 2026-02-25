// SPDX-License-Identifier: Apache-2.0
import { __clampRange } from "./internal/indexof.js";

export class BitmapIndex {
	index: Map<any, Bitfield> = new Map();

	/**
	 * Returns iterator of row IDs (i.e. bit positions) which have been marked
	 * as used by given `key`. If `max` is given, only positions < `max` are
	 * considered.
	 *
	 * @param key
	 * @param max
	 */
	rowIDs(key: any, max = Infinity) {
		return this.index.get(key)?.ones(max) ?? (function* () {})();
	}

	clear() {
		this.index.clear();
	}

	ensure(key: any) {
		let bitmap = this.index.get(key);
		if (!bitmap) this.index.set(key, (bitmap = new Bitfield()));
		return bitmap;
	}

	setBit(key: any, rowID: number) {
		this.ensure(key).setBit(rowID);
	}

	clearBit(key: any, rowID: number) {
		this.index.get(key)?.clearBit(rowID);
	}

	/**
	 * Removes bit at given position in _all_ indices by clearing it and
	 * shifting all successive bits 1 bit to the right (towards the start).
	 * Essentially similar to `Array.splice()`.
	 *
	 * @param id
	 */
	removeBit(rowID: number) {
		for (let bitmap of this.index.values()) bitmap.removeBit(rowID);
	}

	toJSON() {
		const res: Record<string, number[]> = {};
		for (let [k, bits] of this.index) {
			if (bits.buffer) res[k] = Array.from(bits.buffer);
		}
		return res;
	}
}

export class Bitfield {
	constructor(public buffer?: Uint32Array) {}

	*ones(max = Infinity) {
		const { buffer } = this;
		if (!buffer) return;
		for (let i = 0, n = buffer.length; i < n; i++) {
			let bits = buffer[i];
			while (bits) {
				const lsb = bits & -bits;
				const x = (i << 5) + (Math.clz32(lsb) ^ 31);
				if (x >= max) return;
				yield x;
				bits ^= lsb;
			}
		}
	}

	first(start = 0, end?: number) {
		const { buffer } = this;
		if (!buffer) return -1;
		[start, end] = __clampRange(buffer.length << 5, start, end);
		if (start >= end) return -1;
		for (
			let i = start >>> 5,
				n = Math.min(Math.ceil(end / 32), buffer.length);
			i < n;
			i++
		) {
			let bits = buffer[i];
			while (bits) {
				const lsb = bits & -bits;
				const x = (i << 5) + (Math.clz32(lsb) ^ 31);
				if (x >= start && x < end) return x;
				bits ^= lsb;
			}
		}
		return -1;
	}

	last(start = 0, end?: number) {
		const { buffer } = this;
		if (!buffer) return -1;
		[start, end] = __clampRange(buffer.length << 5, start, end);
		if (start >= end) return -1;
		for (let i = end >>> 5, n = start >>> 5; i >= n; i--) {
			let bits = buffer[i];
			while (bits) {
				const msb = Math.clz32(bits) ^ 31;
				const x = (i << 5) + msb;
				if (x >= start && x < end) return x;
				bits ^= 1 << msb;
			}
		}
		return -1;
	}

	setBit(id: number) {
		const w = id >>> 5;
		this.ensure(w)[w] |= 1 << (id & 31);
	}

	clearBit(id: number) {
		const w = id >>> 5;
		this.ensure(w)[w] &= ~(1 << (id & 31));
	}

	fill(x: 0 | 1, start: number, end: number) {
		const i = start >>> 5;
		const j = end >>> 5;
		let m = ~((1 << (start & 31)) - 1);
		const buf = this.ensure(j);
		if (i === j) {
			m &= (1 << (end & 31)) - 1;
			buf[i] = x ? buf[i] | m : buf[i] & ~m;
		} else {
			buf[i] = x ? buf[i] | m : buf[i] & ~m;
			buf.fill(x ? -1 : 0, i + 1, j);
			m = (1 << (end & 31)) - 1;
			buf[j] = x ? buf[j] | m : buf[j] & ~m;
		}
		return this;
	}

	ensure(size: number) {
		const b = this.buffer;
		if (!b || size >= b.length) {
			const tmp = new Uint32Array(size + 1);
			if (b) tmp.set(b);
			return (this.buffer = tmp);
		}
		return b;
	}

	removeBit(id: number) {
		const b = this.buffer;
		if (!b) return;
		const w = id >>> 5;
		const bit = id & 31;
		const end = b.length - 1;
		if (bit === 0) {
			b[w] >>>= 1;
		} else {
			const mask = (1 << bit) - 1;
			b[w] =
				bit < 31 ? (b[w] & mask) | ((b[w] >>> 1) & ~mask) : b[w] & mask;
		}
		if (w < end && b[w + 1] & 1) b[w] |= 1 << 31;
		for (let i = w + 1; i <= end; i++) {
			b[i] >>>= 1;
			if (i < end && b[i + 1] & 1) b[i] |= 1 << 31;
		}
	}
}
