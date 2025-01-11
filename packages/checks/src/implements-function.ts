export const implementsFunction = <T = any, K extends keyof T = any>(
	x: any,
	fn: K
): x is Pick<T, K> => typeof x?.[fn] === "function";
