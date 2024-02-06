import type { IBase } from "./api.js";
import { BaseNDecoder } from "./decode.js";
import { BaseNEncoder } from "./encode.js";

export const defBase = (chars: string) => new BaseN(chars);

export class BaseN implements IBase {
	readonly N: number;

	protected enc: BaseNEncoder;
	protected dec: BaseNDecoder;

	constructor(public readonly base: string) {
		this.N = base.length;
		this.enc = new BaseNEncoder(base);
		this.dec = new BaseNDecoder(base);
	}

	clear() {
		this.enc.clear();
	}

	encode(x: number, size?: number) {
		return this.enc.encode(x, size);
	}

	encodeBigInt(x: bigint, size?: number) {
		return this.enc.encodeBigInt(x, size);
	}

	encodeBytes(buf: Uint8Array, size?: number) {
		return this.enc.encodeBytes(buf, size);
	}

	decode(x: string) {
		return this.dec.decode(x);
	}

	decodeBigInt(x: string) {
		return this.dec.decodeBigInt(x);
	}

	decodeBytes(x: string, buf: Uint8Array) {
		return this.dec.decodeBytes(x, buf);
	}

	validate(x: string) {
		return this.dec.validate(x);
	}

	size(x: number) {
		return this.enc.size(x);
	}
}
