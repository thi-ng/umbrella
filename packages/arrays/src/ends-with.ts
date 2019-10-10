import { equiv as _eq } from "@thi.ng/equiv";

/**
 * Returns true if the last items of `buf` are the same items as in
 * `needle`. This means `buf` should have at least the same length as
 * `needle` for this to be true.
 *
 * By default, uses thi.ng/equiv for equality checking.
 *
 * @see startsWith
 *
 * @param buf
 * @param needle
 * @param equiv
 */
export const endsWith = <T>(
    buf: ArrayLike<T>,
    needle: ArrayLike<T>,
    equiv = _eq
) => {
    let i = buf.length;
    let j = needle.length;
    if (i < j) return false;
    while ((--i, --j >= 0 && equiv(buf[i], needle[j]))) {}
    return j < 0;
};
