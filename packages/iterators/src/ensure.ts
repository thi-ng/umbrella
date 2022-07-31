import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { iterator } from "./iterator.js";

export const ensureIterable = (x: any): IterableIterator<any> =>
	!(x != null && x[Symbol.iterator])
		? illegalArgs(`value is not iterable: ${x}`)
		: x;

export const ensureIterator = (x: any) => ensureIterable(iterator(x));
