export const isPositive = (x: any): x is number =>
	typeof x === "number" && x > 0;
