import {
	bytes16,
	bytes24,
	bytes32,
	bytesF32,
	bytesF64,
} from "@thi.ng/binary/bytes";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { iterator } from "@thi.ng/transducers/iterator";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { reduce } from "@thi.ng/transducers/reduce";
import type { BinStructItem } from "./api.js";
import { utf8Encode } from "./utf8.js";

export const i8 = (x: number): BinStructItem => ["i8", x];
export const i8array = (x: ArrayLike<number>): BinStructItem => ["i8a", x];

export const u8 = (x: number): BinStructItem => ["u8", x];
export const u8array = (x: ArrayLike<number>): BinStructItem => ["u8a", x];

export const i16 = (x: number, le = false): BinStructItem => ["i16", x, le];
export const i16array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"i16a",
	x,
	le,
];

export const u16 = (x: number, le = false): BinStructItem => ["u16", x, le];
export const u16array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"u16a",
	x,
	le,
];

export const i24 = (x: number, le = false): BinStructItem => ["i24", x, le];
export const i24array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"i24a",
	x,
	le,
];

export const u24 = (x: number, le = false): BinStructItem => ["u24", x, le];
export const u24array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"u24a",
	x,
	le,
];

export const i32 = (x: number, le = false): BinStructItem => ["i32", x, le];
export const i32array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"i32a",
	x,
	le,
];

export const u32 = (x: number, le = false): BinStructItem => ["u32", x, le];
export const u32array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"u32a",
	x,
	le,
];

export const f32 = (x: number, le = false): BinStructItem => ["f32", x, le];
export const f32array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"f32a",
	x,
	le,
];

export const f64 = (x: number, le = false): BinStructItem => ["f64", x, le];
export const f64array = (x: ArrayLike<number>, le = false): BinStructItem => [
	"f64a",
	x,
	le,
];

export const str = (x: string): BinStructItem => ["str", x];

/**
 * Transducer which converts {@link BinStructItem} inputs to bytes. If
 * `src` iterable is given, yields an iterator of unsigned bytes (e.g.
 * for streaming purposes).
 *
 * @example
 * ```ts
 * hexDumpString({}, asBytes([
 *   str("hello!"),
 *   u32(0xdecafbad),
 *   i16(-1),
 *   f32(Math.PI)
 * ]))
 * // 00000000 | 68 65 6c 6c 6f 21 de ca fb ad ff ff 40 49 0f db | hello!......@I..
 * ```
 */
export function asBytes(): Transducer<BinStructItem, number>;
export function asBytes(src: Iterable<BinStructItem>): Iterable<number>;
export function asBytes(src?: Iterable<BinStructItem>): any {
	return src
		? iterator(asBytes(), src)
		: mapcat((x: BinStructItem) => {
				const val = <number>x[1];
				const le = x[2];
				switch (x[0]) {
					case "i8":
					case "u8":
						return [val];
					case "i8a":
					case "u8a":
						return <number[]>x[1];
					case "i16":
					case "u16":
						return bytes16(val, le);
					case "i16a":
					case "u16a":
						return mapcat((x) => bytes16(x, le), <number[]>x[1]);
					case "i24":
					case "u24":
						return bytes24(val, le);
					case "i24a":
					case "u24a":
						return mapcat((x) => bytes24(x, le), <number[]>x[1]);
					case "i32":
					case "u32":
						return bytes32(val, le);
					case "i32a":
					case "u32a":
						return mapcat((x) => bytes32(x, le), <number[]>x[1]);
					case "f32":
						return bytesF32(val, le);
					case "f32a":
						return mapcat((x) => bytesF32(x, le), <number[]>x[1]);
					case "f64":
						return bytesF64(val, le);
					case "f64a":
						return mapcat((x) => bytesF64(x, le), <number[]>x[1]);
					case "str":
						return utf8Encode(<string>x[1]);
					default:
						unsupported(`invalid struct item: ${x[0]}`);
				}
		  });
}

export function bytes(cap?: number): Reducer<Uint8Array, BinStructItem>;
export function bytes(cap: number, src: Iterable<BinStructItem>): Uint8Array;
export function bytes(cap = 1024, src?: Iterable<BinStructItem>) {
	let view: DataView;
	let pos = 0;

	const ensure = (acc: Uint8Array, size: number) => {
		if (pos + size <= cap) return acc;
		cap *= 2;
		const buf = new Uint8Array(cap);
		buf.set(acc);
		view = new DataView(buf.buffer);
		return buf;
	};

	const setArray = (
		fn: string,
		stride: number,
		acc: Uint8Array,
		x: any,
		le: boolean
	) => {
		const n = x.length;
		acc = ensure(acc, stride * n);
		for (let i = 0; i < n; i++, pos += stride) {
			(<any>view)[fn](pos, x[i], le);
		}
		return acc;
	};

	return src
		? reduce(bytes(cap), src)
		: <Reducer<Uint8Array, BinStructItem>>[
				() => new Uint8Array(cap),
				(acc) => acc.subarray(0, pos),
				(acc, [type, x, le = false]) => {
					if (!view || view.buffer !== acc.buffer) {
						cap = acc.byteLength;
						view = new DataView(acc.buffer, acc.byteOffset);
					}
					switch (type) {
						case "i8":
							acc = ensure(acc, 1);
							view.setInt8(pos, <number>x);
							pos++;
							break;
						case "i8a": {
							const n = (<ArrayLike<number>>x).length;
							acc = ensure(acc, n);
							new Int8Array(acc.buffer, acc.byteOffset).set(
								<ArrayLike<number>>x,
								pos
							);
							pos += n;
							break;
						}
						case "u8":
							acc = ensure(acc, 1);
							view.setUint8(pos, <number>x);
							pos++;
							break;
						case "u8a": {
							const n = (<ArrayLike<number>>x).length;
							acc = ensure(acc, n);
							acc.set(<ArrayLike<number>>x, pos);
							pos += n;
							break;
						}
						case "i16":
							acc = ensure(acc, 2);
							view.setInt16(pos, <number>x, le);
							pos += 2;
							break;
						case "i16a":
							acc = setArray("setInt16", 2, acc, x, le);
							break;
						case "u16":
							acc = ensure(acc, 2);
							view.setUint16(pos, <number>x, le);
							pos += 2;
							break;
						case "u16a":
							acc = setArray("setUint16", 2, acc, x, le);
							break;
						case "i24":
							acc = ensure(acc, 4);
							view.setInt32(pos, <number>x, le);
							pos += 3;
							break;
						case "i24a":
							acc = setArray("setInt32", 3, acc, x, le);
							break;
						case "u24":
							acc = ensure(acc, 4);
							view.setUint32(pos, <number>x, le);
							pos += 3;
							break;
						case "u24a":
							acc = setArray("setUint32", 3, acc, x, le);
							break;
						case "i32":
							acc = ensure(acc, 4);
							view.setInt32(pos, <number>x, le);
							pos += 4;
							break;
						case "i32a":
							acc = setArray("setInt32", 4, acc, x, le);
							break;
						case "u32":
							acc = ensure(acc, 4);
							view.setUint32(pos, <number>x, le);
							pos += 4;
							break;
						case "u32a":
							acc = setArray("setUint32", 4, acc, x, le);
							break;
						case "f32":
							acc = ensure(acc, 4);
							view.setFloat32(pos, <number>x, le);
							pos += 4;
							break;
						case "f32a":
							acc = setArray("setFloat32", 4, acc, x, le);
							break;
						case "f64":
							acc = ensure(acc, 8);
							view.setFloat64(pos, <number>x, le);
							pos += 8;
							break;
						case "f64a":
							acc = setArray("setFloat64", 8, acc, x, le);
							break;
						case "str": {
							let utf = utf8Encode(<string>x);
							acc = ensure(acc, utf.length);
							acc.set(utf, pos);
							pos += utf.length;
							break;
						}
						default:
					}
					return acc;
				},
		  ];
}
