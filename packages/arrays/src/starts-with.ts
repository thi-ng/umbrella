import { equiv as _eq } from "@thi.ng/equiv";

/**
 * Returns true if the first items of `buf` are the same items as in
 * `needle`.
 *
 * @remarks
 * This means `buf` should have at least the same length as `needle` for
 * this to be true.
 *
 * By default, uses {@link @thi.ng/equiv#equiv} for equality checking.
 *
 * {@link endsWith}
 *
 * @param buf - array
 * @param needle - search value
 * @param equiv - equivalence predicate
 */
export const startsWith = (
	buf: ArrayLike<any>,
	needle: ArrayLike<any>,
	equiv = _eq
) => {
	let i = buf.length;
	let j = needle.length;
	if (i < j) return false;
	while (-j >= 0 && equiv(buf[j], needle[j])) {}
	return j < 0;
};
