/**
 * Iterator version of `String.prototype.split()`. Yields iterable of substrings
 * of `src`, delimited by given regexp (default: unix & windows linebreaks).
 *
 * @remarks
 * Use this function to avoid creating an entire full copy of the original
 * source string, e.g. when only single-token or line-based accesses are needed.
 * This function is ~2x faster for large strings (benchmarked with 8MB & 16MB
 * inputs), with dramatically lower memory consumption.
 *
 * If given an regexp as `delim`, the function ensures the regexp has its global
 * flag enabled.
 *
 * @param src -
 * @param delim -
 * @param includeDelim -
 */
export function* split(
	src: string,
	delim: RegExp | string = /\r?\n/g,
	includeDelim = false
) {
	let i = 0;
	const n = src.length;
	const include = ~~includeDelim;
	let re: RegExp;
	if (typeof delim === "string") {
		re = new RegExp(delim, "g");
	} else if (!delim.flags.includes("g")) {
		re = new RegExp(delim, delim.flags + "g");
	} else {
		re = delim;
	}
	for (; i < n; ) {
		const m = re.exec(src);
		if (!m) {
			yield src.substring(i);
			return;
		}
		const len = m[0].length;
		yield src.substring(i, m.index + include * len);
		i = m.index + len;
	}
}
