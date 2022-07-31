const OBJP = Object.getPrototypeOf;

/**
 * Similar to {@link isObject}, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x -
 */
export const isPlainObject = (x: any): x is Record<string, any> => {
	let p;
	return (
		x != null &&
		typeof x === "object" &&
		((p = OBJP(x)) === null || OBJP(p) === null)
	);
};
