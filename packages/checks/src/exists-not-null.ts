export const existsAndNotNull = <T>(x: T | null | undefined): x is T =>
	x != null;
