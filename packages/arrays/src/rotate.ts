import type { TypedArray } from "@thi.ng/api";

/**
 * Rotates array by `num` items. If `num < 0` items are rotated left (towards
 * the beginning of the array), otherwise to the right (end). The rotation
 * distance will be `num % buf.length`. The function is no-op if the resulting
 * distance is zero or `buf` is empty.
 *
 * @remarks
 * Not suitable for typed arrays. Use {@link rotateTyped} for those.
 *
 * @param buf
 * @param num
 */
export const rotate = <T>(buf: Array<T>, num: number) => {
	if (!(num = __distance(buf, num))) return buf;
	if (num < 0) {
		buf.push(...buf.splice(0, -num));
	} else {
		buf.unshift(...buf.splice(-num));
	}
	return buf;
};

/**
 * Same as {@link rotate}, but for optimized for typed arrays!
 *
 * @param buf
 * @param num
 */
export const rotateTyped = (buf: TypedArray, num: number) => {
	if (!(num = __distance(buf, num))) return buf;
	if (num < 0) {
		const tmp = buf.slice(0, -num);
		buf.copyWithin(0, -num);
		buf.set(tmp, buf.length + num);
	} else if (num > 0) {
		const tmp = buf.slice(buf.length - num);
		buf.copyWithin(num, 0);
		buf.set(tmp, 0);
	}
	return buf;
};

const __distance = (buf: ArrayLike<any>, num: number) =>
	buf.length ? (num | 0) % buf.length : 0;
