import { implementsFunction } from "./implements-function.js";

export const isPromiseLike = <T = any>(x: any): x is Promise<T> =>
	x instanceof Promise ||
	(implementsFunction(x, "then") && implementsFunction(x, "catch"));
