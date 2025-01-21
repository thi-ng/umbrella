// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";
import { ARandom } from "./arandom.js";

/**
 * {@link IRandom} implementation for external `Math.random()` compatible PRNG
 * functions. Also see {@link SYSTEM}.
 */
export class WrappedRandom extends ARandom {
	constructor(protected rnd: Fn0<number>) {
		super();
	}

	float(norm = 1) {
		return this.rnd() * norm;
	}

	norm(norm = 1) {
		return (this.rnd() - 0.5) * 2 * norm;
	}

	int() {
		return (this.rnd() * 0x1_0000_0000) >>> 0;
	}
}
