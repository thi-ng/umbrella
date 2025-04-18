// SPDX-License-Identifier: Apache-2.0
import type { IBuffered, ICopy } from "@thi.ng/api";
import type { ISeedable } from "./api.js";
import { ARandom } from "./arandom.js";
import { DEFAULT_SEED_160 } from "./constants.js";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Xorshift#xorwow
 */
export class XorWow
	extends ARandom
	implements
		IBuffered<Uint32Array>,
		ICopy<XorWow>,
		ISeedable<ArrayLike<number>>
{
	buffer: Uint32Array;

	constructor(seed: ArrayLike<number> = DEFAULT_SEED_160) {
		super();
		this.buffer = new Uint32Array(5);
		this.seed(seed);
	}

	copy() {
		return new XorWow(this.buffer);
	}

	seed(seed: ArrayLike<number>) {
		this.buffer.set(seed);
		return this;
	}

	bytes() {
		return new Uint8Array(this.buffer.buffer);
	}

	int() {
		const s = this.buffer;
		let t = s[3];
		let w;
		t ^= t >>> 2;
		t ^= t << 1;
		s[3] = s[2];
		s[2] = s[1];
		w = s[1] = s[0];
		t ^= w;
		t ^= w << 4;
		s[0] = t;
		return (t + (s[4] += 0x587c5)) >>> 0;
	}
}
