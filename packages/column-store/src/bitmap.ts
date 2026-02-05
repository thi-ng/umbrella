export class BitmapIndex {
	index: Map<any, Uint32Array> = new Map();

	/**
	 * Returns iterator of row IDs (i.e. bit positions) which have been indexed
	 * for given `key`.
	 *
	 * @param key
	 * @param max
	 */
	*rowIDs(key: any, max: number) {
		let bitmap = this.index.get(key);
		if (!bitmap) return;
		for (let i = 0, n = bitmap.length; i < n; i++) {
			let bits = bitmap[i];
			while (bits) {
				const lsb = bits & -bits;
				const x = (i << 5) + (Math.clz32(lsb) ^ 31);
				if (x >= max) return;
				yield x;
				bits ^= lsb;
			}
		}
	}

	clear() {
		this.index.clear();
	}

	setBit(key: any, id: number) {
		const wordID = id >>> 5;
		this.ensure(key, wordID)[wordID] |= 1 << (id & 31);
	}

	clearBit(key: any, id: number) {
		const wordID = id >>> 5;
		this.ensure(key, wordID)[wordID] &= ~(1 << (id & 31));
	}

	/**
	 * Removes bit at given position in _all_ indices by clearing it and
	 * shifting all successive bits 1 bit to the right (towards the start).
	 * Essentially similar to `Array.splice()`.
	 *
	 * @param id
	 */
	removeBit(id: number) {
		const word = id >>> 5;
		const bit = id & 31;
		const mask = (1 << bit) - 1;
		for (let bits of this.index.values()) {
			const end = bits.length - 1;
			bits[word] = (bits[word] & mask) | ((bits[word] >>> 1) & ~mask);
			if (word < end) bits[word] |= bits[word + 1] << 31;
			for (let i = word + 1; i < end; i++) {
				bits[i] = (bits[i] >>> 1) | ((bits[i + 1] & 1) << 31);
			}
			if (word < end) bits[end] >>>= 1;
		}
	}

	protected ensure(key: any, wordID: number) {
		let bitmap = this.index.get(key)!;
		if (!bitmap || wordID >= bitmap.length) {
			const tmp = new Uint32Array(wordID + 1);
			if (bitmap) tmp.set(bitmap);
			this.index.set(key, tmp);
			bitmap = tmp;
		}
		return bitmap;
	}

	toJSON() {
		const res: Record<string, number[]> = {};
		for (let [k, bits] of this.index) {
			res[k] = Array.from(bits);
		}
		return res;
	}
}
