export const isNegative = (x: any): x is number =>
	typeof x === "number" && x < 0;
