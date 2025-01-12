import { peek } from "@thi.ng/arrays/peek";
import { assert } from "@thi.ng/errors/assert";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { utf8Decode } from "@thi.ng/transducers-binary/utf8";

const [MINUS, DOT, ZERO, NINE, COLON, DICT, END, FLOAT, INT, LIST] = [
	0x2d, 0x2e, 0x30, 0x39, 0x3a, 0x64, 0x65, 0x66, 0x69, 0x6c,
];

type DecodeCtx = { i: number; n: number; buf: Uint8Array };

/**
 * Decodes given byte array back into JS data(structure).
 *
 * @remarks
 * UTF-8 is used by default, but can be disabled by setting `utf8` to false. In
 * that case, strings will be decoded as `Uint8Array`s, with the exception of
 * dictionary keys, which will be decoded via `String.fromCharCode()`.
 *
 * @param buf
 * @param utf8
 */
export const decode = (buf: Uint8Array, utf8 = true) => {
	const ctx: DecodeCtx = { i: 0, n: buf.length, buf };
	const stack = [];
	let x: any;
	while (ctx.i < buf.length) {
		x = buf[ctx.i++];
		switch (x) {
			case DICT:
				__ensureNotKey(stack, "dict");
				stack.push({ type: DICT, val: {} });
				break;
			case LIST:
				__ensureNotKey(stack, "list");
				stack.push({ type: LIST, val: [] });
				break;
			case INT:
				x = __collect(stack, __readInt(ctx, 0));
				if (x !== undefined) {
					return x;
				}
				break;
			case FLOAT:
				x = __collect(stack, __readFloat(ctx));
				if (x !== undefined) {
					return x;
				}
				break;
			case END:
				x = stack.pop();
				if (x) {
					const parent = peek(stack);
					if (parent) {
						if (parent.type === LIST) {
							(<any[]>parent.val).push(x.val);
						} else if (parent.type === DICT) {
							(<any>parent.val)[(<any>parent).key] = x.val;
							(<any>parent).key = null;
						}
					} else {
						return x.val;
					}
				} else {
					illegalState("unmatched end literal");
				}
				break;
			default:
				if (x >= ZERO && x <= NINE) {
					x = __readBytes(ctx, __readInt(ctx, x - ZERO, COLON));
					x = __collect(stack, x, utf8);
					if (x !== undefined) {
						return x;
					}
				} else {
					illegalState(`unexpected value type: 0x${x.toString(16)}`);
				}
		}
	}
	return peek(stack).val;
};

/** @internal */
const __ensureNotKey = (stack: any[], type: string) => {
	const x = peek(stack);
	assert(!x || x.type !== DICT || x.key, type + " not supported as dict key");
};

/** @internal */
const __collect = (stack: any[], x: any, utf8 = false) => {
	const parent = peek(stack);
	if (!parent) return x;
	utf8 &&= x instanceof Uint8Array;
	if (parent.type === LIST) {
		parent.val.push(utf8 ? utf8Decode(x) : x);
	} else {
		if (!parent.key) {
			parent.key = utf8 ? utf8Decode(x) : __decodeAscii(x);
		} else {
			parent.val[parent.key] = utf8 ? utf8Decode(x) : x;
			parent.key = null;
		}
	}
};

/** @internal */
const __readInt = (ctx: DecodeCtx, acc: number, end = END) => {
	let x: number;
	let isSigned = false;
	while (ctx.i < ctx.n) {
		x = ctx.buf[ctx.i++];
		if (x >= ZERO && x <= NINE) {
			acc = acc * 10 + x - ZERO;
		} else if (x === MINUS) {
			assert(!isSigned, `invalid int literal`);
			isSigned = true;
		} else if (x === end) {
			return isSigned ? -acc : acc;
		} else {
			illegalState(`expected digit, got 0x${x.toString(16)}`);
		}
	}
	illegalState(`incomplete int`);
};

/** @internal */
const __readFloat = (ctx: DecodeCtx) => {
	let x: number;
	let acc = "";
	while (ctx.i < ctx.n) {
		x = ctx.buf[ctx.i++];
		if ((x >= ZERO && x <= NINE) || x === DOT || x === MINUS) {
			acc += String.fromCharCode(x);
		} else if (x === END) {
			return +acc;
		} else {
			illegalState(`expected digit or dot, got 0x${x.toString(16)}`);
		}
	}
	illegalState(`incomplete float`);
};

/** @internal */
const __readBytes = (ctx: DecodeCtx, len: number) => {
	if (ctx.i + len > ctx.n)
		illegalState(`expected ${len} bytes, but reached EOF`);
	return ctx.buf.subarray(ctx.i, (ctx.i += len));
};

/** @internal */
const __decodeAscii = (buf: Uint8Array) => {
	let res = "";
	for (let i = 0, n = buf.length; i < n; i++)
		res += String.fromCharCode(buf[i]);
	return res;
};
