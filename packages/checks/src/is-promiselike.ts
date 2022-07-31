import { implementsFunction } from "./implements-function.js";

export const isPromiseLike = (x: any): x is Promise<any> =>
	x instanceof Promise ||
	(implementsFunction(x, "then") && implementsFunction(x, "catch"));
