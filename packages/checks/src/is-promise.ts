export const isPromise = <T = any>(x: any): x is Promise<T> =>
	x instanceof Promise;
