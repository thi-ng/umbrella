import type { IBaseDecode } from "./api.js";

export class BaseNDecoder implements IBaseDecode {
	readonly N: number;
	readonly index: Record<string, number>;

	constructor(public readonly base: string) {
		this.N = base.length;
		this.index = [...base].reduce(
			(acc, x, i) => ((acc[x] = i), acc),
			<Record<string, number>>{}
		);
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
		let res = 0n;
		for (let n = x.length - 1, i = 0; i <= n; i++) {
			res += BigInt(index[x[i]]) * NN ** BigInt(n - i);
		}
		return res;
	}

	decodeBytes(x: string, buf: Uint8Array): Uint8Array {
		let y = this.decodeBigInt(x);
		for (let i = buf.length; i-- > 0; ) {
			buf[i] = Number(y & 255n);
			y >>= 8n;
		}
		return buf;
	}

	validate(x: string) {
		return new RegExp(`^[${this.base}]+$`).test(x);
	}
}
