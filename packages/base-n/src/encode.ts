import type { IBaseEncode } from "./api.js";
import { B16_LC_CHARS } from "./chars/16.js";

const MAX_SAFE_INT = BigInt(2 ** 53 - 1);

export class BaseNEncoder implements IBaseEncode {
	readonly N: number;
	private __pc: string[] = [];

	constructor(public readonly base: string) {
		this.N = base.length;
	}

	clear() {
		this.__pc.length = 0;
	}

	encode(x: number, size = 0) {
		const { base, N } = this;
		if (x === 0) return this.__pad(base[0], size);
		let res = "";
		while (x > 0) {
			res = base[x % N] + res;
			x = Math.floor(x / N);
		}
		return this.__pad(res, size);
	}

	encodeBigInt(x: bigint, size = 0) {
		if (x <= MAX_SAFE_INT) return this.encode(Number(x), size);
		const { base, N } = this;
		if (x === 0n) return this.__pad(base[0], size);
		const NN = BigInt(N);
		let res = "";
		while (x > 0n) {
			res = base[Number(x % NN)] + res;
			x /= NN;
		}
		return this.__pad(res, size);
	}

	encodeBytes(buf: Uint8Array, size = 0) {
		let hex = "0x";
		for (let i = 0, n = buf.length; i < n; i++) hex += __u8(buf[i]);
		return this.encodeBigInt(BigInt(hex), size);
	}

	size(x: number) {
		return Math.ceil(Math.log(x) / Math.log(this.N));
	}

	private __pad(x: string, size: number) {
		const d = size - x.length;
		return d > 0
			? (this.__pc[d] || (this.__pc[d] = this.base[0].repeat(d))) + x
			: x;
	}
}

/** @internal */
const __u8 = (x: number) =>
	B16_LC_CHARS[(x >>> 4) & 0xf] + B16_LC_CHARS[x & 0xf];
