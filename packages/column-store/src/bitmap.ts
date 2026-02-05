export class BitmapIndex {
	index: Map<any, Bitfield> = new Map();

	/**
	 * Returns iterator of row IDs (i.e. bit positions) which have been indexed
	 * for given `key`. If `max` is given, only positions < `max` are considered.
	 *
	 * @param key
	 * @param max
	 */
	*rowIDs(key: any, max = Infinity) {
		let bitmap = this.index.get(key);
		if (!bitmap) return;
		yield* bitmap.ones(max);
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
	buffer?: Uint32Array;

	*ones(max = Infinity) {
		const buf = this.buffer;
		if (!buf) return;
		for (let i = 0, n = buf.length; i < n; i++) {
			let bits = buf[i];
			while (bits) {
				const lsb = bits & -bits;
				const x = (i << 5) + (Math.clz32(lsb) ^ 31);
				if (x >= max) return;
				yield x;
				bits ^= lsb;
			}
		}
	}

	setBit(id: number) {
		const w = id >>> 5;
		this.ensure(w)[w] |= 1 << (id & 31);
	}

	clearBit(id: number) {
		const w = id >>> 5;
		this.ensure(w)[w] &= ~(1 << (id & 31));
	}

	ensure(wordID: number) {
		const b = this.buffer;
		if (!b || wordID >= b.length) {
			const tmp = new Uint32Array(wordID + 1);
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
