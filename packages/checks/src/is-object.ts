export const isObject = (x: any): x is Object =>
	x !== null && typeof x === "object";
