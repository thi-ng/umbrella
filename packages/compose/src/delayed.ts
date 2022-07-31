export const delayed = <T>(x: T, t: number) =>
	new Promise<T>((resolve) => setTimeout(() => resolve(x), t));
