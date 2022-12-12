export const isFunction = <T extends Function>(x: any): x is T =>
	typeof x === "function";
