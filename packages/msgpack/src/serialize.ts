import { isArray } from "@thi.ng/checks/is-array";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { utf8Encode } from "@thi.ng/strings/utf8";

export interface EncodeOpts {
	/**
	 * Initial buffer size in bytes.
	 *
	 * @defaultValue 256
	 */
	initial: number;
	/**
	 * Resolve custom types
	 */
	resolve?: (x: any) => any;
}

const B0 = BigInt(0);
const BMIN64 = -BigInt("0x8000000000000000");
const BMAX64 = BigInt("0xffffffffffffffff");
const MIN64 = Number(BMIN64);
const MAX64 = Number(BMAX64);

export const serialize = (src: any, opts: Partial<EncodeOpts> = {}) => {
	const { initial = 256, resolve } = opts;
	let buf = new Uint8Array(initial);
	let view = new DataView(buf.buffer);
	let pos = 0;

	const ensure = () => {
		if (pos > buf.length) {
			const curr = buf;
			buf = new Uint8Array(curr.length * 2);
			view = new DataView(buf.buffer);
			buf.set(curr);
		}
	};

	const addA = (xs: ArrayLike<number>) => {
		const $pos = pos;
		pos += xs.length;
		ensure();
		buf.set(xs, $pos);
	};

	const add8 = (x: number) => {
		const $pos = pos;
		pos++;
		ensure();
		buf[$pos] = x;
	};

	const add8id = (id: number, x: number) => {
		const $pos = pos;
		pos += 2;
		ensure();
		buf[$pos] = id;
		buf[$pos + 1] = x;
	};

	const add16id = (id: number, x: number) => {
		const $pos = pos;
		pos += 3;
		ensure();
		buf[$pos] = id;
		view.setUint16($pos + 1, x);
	};

	const add32 = (x: number) => {
		const $pos = pos;
		pos += 4;
		ensure();
		view.setUint32($pos, x);
	};

	const add32id = (id: number, x: number) => {
		const $pos = pos;
		pos += 5;
		ensure();
		buf[$pos] = id;
		view.setUint32($pos + 1, x);
	};

	const add64 = (x: bigint) => {
		const $pos = pos;
		pos += 8;
		ensure();
		view.setBigUint64($pos, x);
	};

	const addBigInt = (x: bigint) => {
		if (x >= B0) {
			// uint64
			add8(0xcf);
			add64(x <= BMAX64 ? x : BMAX64);
		} else {
			// int64
			add8(0xd3);
			add64(x >= BMIN64 ? x : BMIN64);
		}
	};

	const addFloat = (x: number) => {
		const $pos = pos;
		pos += 9;
		ensure();
		buf[$pos] = 0xcb;
		view.setFloat64($pos + 1, x);
	};

	const encode = (x: any, isResolving = false) => {
		if (x == null) {
			add8(0xc0);
			return;
		}
		let bytes: Uint8Array;
		let n: number;
		let type: string = typeof x;
		type =
			type !== "object"
				? type
				: isArray(x)
				? "array"
				: x instanceof Date
				? "date"
				: x instanceof Uint8Array || x instanceof Uint8ClampedArray
				? "bin"
				: isTypedArray(x)
				? "array"
				: type;

		switch (type) {
			case "boolean":
				add8(x ? 0xc3 : 0xc2);
				break;

			case "number":
				if (
					!(isFinite(x) && Math.floor(x) === x) ||
					x < MIN64 ||
					x > MAX64
				) {
					addFloat(x);
				} else if (x > 0) {
					if (x < 0x80) add8(x); // fixint
					else if (x < 0x100) add8id(0xcc, x); // uint8
					else if (x < 0x1_0000) add16id(0xcd, x); // uint16
					else if (x < 0x1_0000_0000) add32id(0xce, x); // uint32
					else addBigInt(BigInt(x));
				} else {
					if (x >= -0x20) add8(x); // fixint
					else if (x >= -0x80) add8id(0xd0, x); // int8
					else if (x >= -0x8000) add16id(0xd1, x); // int16
					else if (x >= -0x8000_0000) add32id(0xd2, x); // int32
					else addBigInt(BigInt(x));
				}
				break;

			case "bigint":
				addBigInt(x);
				break;

			case "string":
				bytes = utf8Encode(x);
				n = bytes.length;
				if (n < 0x20) add8(0xa0 | n);
				else if (n < 0x100) add8id(0xd9, n);
				else if (n < 0x1_0000) add16id(0xda, n);
				else add32id(0xdb, n);
				addA(bytes);
				break;

			case "array":
				n = x.length;
				if (n < 0x10) add8(0x90 | n);
				else if (n < 0x1_0000) add16id(0xdc, n);
				else add32id(0xdd, n);
				for (let i = 0; i < n; i++) encode(x[i]);
				break;

			case "bin":
				n = x.length;
				if (n < 0x10) add8id(0xc4, n);
				else if (n < 0x1_0000) add16id(0xc5, n);
				else add32id(0xc6, n);
				addA(x);
				break;

			case "object":
				n = 0;
				for (let k in x) {
					if (x[k] !== undefined) n++;
				}
				if (n < 0x10) add8(0x80 | n);
				else if (n < 0x1_0000) add16id(0xde, n);
				else add32id(0xdf, n);
				for (let k in x) {
					const v = x[k];
					if (v !== undefined) {
						encode(k);
						encode(v);
					}
				}
				break;

			case "date":
				{
					const date = <Date>x;
					let sec = date.getTime() * 1e-3;
					let ns = date.getMilliseconds() * 1e6;
					if (ns === 0 && sec >= 0 && sec < 0x1_0000_0000) {
						// 32 bit sec
						add8(0xd6);
						add32id(0xff, sec);
					} else if (sec >= 0 && sec < 0x4_0000_0000) {
						// 30 bit ns, 34 bit secs
						addA([
							0xd7,
							0xff,
							ns >>> 22,
							ns >>> 14,
							ns >>> 6,
							((ns << 2) >>> 0) | (sec / 0x1_0000_0000),
						]);
						add32(sec);
					} else {
						// 32 bit ns, 64 bit secs
						addA([0xc7, 12, 0xff]);
						add32(ns);
						add64(BigInt(sec));
					}
				}
				break;

			default:
				if (!isResolving && resolve) {
					encode(resolve(x), true);
				} else {
					illegalArgs(`type '${typeof x}'`);
				}
		}
	};

	encode(src);

	return buf.subarray(0, pos);
};
