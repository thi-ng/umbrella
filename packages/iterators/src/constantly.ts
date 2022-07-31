export const constantly =
	<T>(x: T): ((...args: any[]) => T) =>
	() =>
		x;
