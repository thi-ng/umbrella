export const implementsFunction = <T = any, K extends keyof T = any>(
	x: any,
	fn: K
): x is Pick<T, K> => x != null && typeof x[fn] === "function";
