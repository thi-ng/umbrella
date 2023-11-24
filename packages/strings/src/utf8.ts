import { defError } from "@thi.ng/errors/deferror";

/**
 * Returns the number of bytes required to encode the given string as UTF-8.
 *
 * @param str
 */
export const utf8Length = (str: string) => {
	const n = str.length;
	let len = 0;
	for (let i = 0; i < n; ++i) {
		let u = str.charCodeAt(i);
		if (u >= 0xd800 && u < 0xe0000) {
			u = (0x10000 + ((u & 0x3ff) << 10)) | (str.charCodeAt(++i) & 0x3ff);
		}
		len +=
			u < 0x80
				? 1
				: u < 0x800
				? 2
				: u < 0x10000
				? 3
				: u < 0x200000
				? 4
				: u < 0x4000000
				? 5
				: 6;
	}
	return len;
};

/**
 * Non-transducer version of
 * [`utf8Decode()`](https://docs.thi.ng/umbrella/transducers-binary/functions/utf8Decode.html).
 * Decodes `num` bytes from `start` index in given byte buffer. In Firefox this
 * is much faster than using the `TextDecoder` API.
 *
 * @param buf
 * @param start
 * @param num
 */
export const utf8Decode = (buf: Uint8Array, start: number, num: number) => {
	const end = start + num;
	let i = start;
	let result = "";
	let c: number;
	while (i < end) {
		c = buf[i++];
		if (c < 0x80) {
			result += String.fromCharCode(c);
		} else {
			if (c >= 0xc0 && c < 0xe0) {
				c = ((c & 0x1f) << 6) | (buf[i++] & 0x3f);
			} else if (c >= 0xe0 && c < 0xf0) {
				c =
					((c & 0x0f) << 12) |
					((buf[i++] & 0x3f) << 6) |
					(buf[i++] & 0x3f);
			} else if (c >= 0xf0 && c < 0xf8) {
				c =
					((c & 7) << 18) |
					((buf[i++] & 0x3f) << 12) |
					((buf[i++] & 0x3f) << 6) |
					(buf[i++] & 0x3f);
			} else utf8Error();
			result += fromUtf8CodePoint(c);
		}
	}
	return result;
};

/**
 * Non-transducer version of
 * [`utf8Encode()`](https://docs.thi.ng/umbrella/transducers-binary/functions/utf8Encode.html).
 *
 * @remarks
 * If `capacity` is given, initializes the byte array to that size (and assumes
 * that it is sufficient to store the entire string, e.g. by using
 * {@link utf8Length} to pre-determine the number of bytes required for a given
 * string). If `capacity` is _not_ provided, the buffer will be initialized to
 * `4 * src.length`.
 *
 * Based on:
 * - https://github.com/thi-ng/umbrella/blob/main/packages/transducers-binary/src/utf8.ts
 * - https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
 *
 * @param buf
 */
export const utf8Encode = (src: string, capacity?: number) => {
	const n = src.length;
	const buf = new Uint8Array(capacity || n << 2);
	let pos = 0;
	let c: number;
	for (let i = 0; i < n; i++) {
		c = src.charCodeAt(i);
		if (c < 0x80) {
			buf[pos++] = c;
		} else {
			if (c < 0x800) {
				buf[pos++] = 0xc0 | (c >> 6);
			} else {
				if (c >= 0xd800 && c < 0xdc00) {
					c =
						0x10000 +
						((c & 0x03ff) << 10) +
						(src.charCodeAt(++i) & 0x3ff);
					buf[pos++] = 0xf0 | (c >> 18);
					buf[pos++] = 0x80 | ((c >> 12) & 0x3f);
				} else buf[pos++] = 0xe0 | (c >> 12);
				buf[pos++] = 0x80 | ((c >> 6) & 0x3f);
			}
			buf[pos++] = 0x80 | (c & 0x3f);
		}
	}
	return buf.subarray(0, pos);
};

/**
 * Returns character string for given UTF-8 codepoint.
 *
 * @param x
 */
export const fromUtf8CodePoint = (x: number) => {
	if (x < 0x10000) return String.fromCharCode(x);
	if (x < 0x110000) {
		x -= 0x10000;
		return String.fromCharCode(0xd800 | (x >>> 10), 0xdc00 | (x & 0x3ff));
	}
	return utf8Error(`invalid codepoint 0x${x.toString(16)}`);
};

export const UTF8Error = defError(() => "UTF-8 error");

const utf8Error = (msg?: string) => {
	throw new UTF8Error(msg);
};
