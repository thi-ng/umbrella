import type { IRandom } from "./api.js";

const INV_MAX = 1 / 2 ** 32;

export abstract class ARandom implements IRandom {
	abstract int(): number;

	float(norm = 1) {
		return this.int() * INV_MAX * norm;
	}

	norm(norm = 1) {
		return (this.int() * INV_MAX - 0.5) * 2 * norm;
	}

	normMinMax(min: number, max: number) {
		const x = this.minmax(min, max);
		return this.float() < 0.5 ? x : -x;
	}

	minmax(min: number, max: number) {
		return this.float() * (max - min) + min;
	}

	minmaxInt(min: number, max: number) {
		min |= 0;
		max |= 0;
		return min + ((this.float() * (max - min)) | 0);
	}
}
