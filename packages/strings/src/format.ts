export const format = (fmt: any[], ...args: any[]) => {
	const acc: any[] = [];
	for (let i = 0, j = 0, n = fmt.length; i < n; i++) {
		const f = fmt[i];
		const t = typeof f;
		acc.push(
			t === "function" ? f(args[j++]) : t === "object" ? f[args[j++]] : f
		);
	}
	return acc.join("");
};

/**
 * HOF version of {@link format}.
 *
 * @param fmt -
 */
export const defFormat =
	(fmt: any[]) =>
	(...args: any[]) =>
		format(fmt, ...args);

/**
 * Helper for {@link format} which ignores argument and always returns
 * an empty string.
 *
 * @param _ -
 */
export const ignore = (_: any) => "";

/**
 * Helper for {@link format} which coerces `x` to a string.
 *
 * @param x -
 */
export const str = (x: any) => String(x);
