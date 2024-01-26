import type { IBase } from "./api.js";

export const defBase = (chars: string) => new BaseN(chars);

const ZERO = BigInt(0);
const MASK = BigInt(255);
const SHIFT = BigInt(8);
const MAX_SAFE_INT = BigInt(2 ** 53 - 1);

/** @internal */
export const __B16_LC_CHARS = "0123456789abcdef";

export class BaseN implements IBase {
	readonly N: number;
	readonly index: Record<string, number>;

	private __pc: string[] = [];

	constructor(public readonly base: string) {
		this.N = base.length;
		this.index = [...base].reduce(
			(acc, x, i) => ((acc[x] = i), acc),
			<Record<string, number>>{}
		);
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
		if (x === ZERO) return this.__pad(base[0], size);
		const NN = BigInt(N);
		let res = "";
		while (x > ZERO) {
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

	decode(x: string) {
		const { index, N } = this;
		let res = 0;
		for (let n = x.length - 1, i = 0; i <= n; i++) {
			res += index[x[i]] * N ** (n - i);
		}
		return res;
	}

	decodeBigInt(x: string): bigint {
		const { index, N } = this;
		const NN = BigInt(N);
		let res = ZERO;
		for (let n = x.length - 1, i = 0; i <= n; i++) {
			res += BigInt(index[x[i]]) * NN ** BigInt(n - i);
		}
		return res;
	}

	decodeBytes(x: string, buf: Uint8Array): Uint8Array {
		let y = this.decodeBigInt(x);
		for (let i = buf.length; i-- > 0; ) {
			buf[i] = Number(y & MASK);
			y >>= SHIFT;
		}
		return buf;
	}

	validate(x: string) {
		return new RegExp(`^[${this.base}]+$`).test(x);
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
	__B16_LC_CHARS[(x >>> 4) & 0xf] + __B16_LC_CHARS[x & 0xf];
