/**
 * Exposes given `value` as `id` in global scope, iff `always = true` (default:
 * false) or if `process.env.NODE_ENV != "production"` or if the
 * `UMBRELLA_GLOBALS`  or `VITE_UMBRELLA_GLOBALS` env var is set to 1.
 *
 * @param id -
 * @param value -
 * @param always -
 */
export const exposeGlobal = (id: string, value: any, always = false) => {
	const glob: any =
		typeof global !== "undefined"
			? global
			: typeof window !== "undefined"
			? window
			: undefined;
	if (
		glob &&
		(always ||
			(typeof process !== "undefined"
				? process.env.NODE_ENV !== "production" ||
				  !!process.env.UMBRELLA_GLOBALS
				: (<any>import.meta).env
				? (<any>import.meta).env.MODE !== "production" ||
				  !!(<any>import.meta).env.VITE_UMBRELLA_GLOBALS
				: true))
	) {
		glob[id] = value;
	}
};
