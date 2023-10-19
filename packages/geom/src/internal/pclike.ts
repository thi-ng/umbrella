import { assert } from "@thi.ng/errors/assert";
import type { PCLikeConstructor } from "@thi.ng/geom-api";
import { __argAttribs } from "./args.js";

export const __pclike = (ctor: PCLikeConstructor, args: any[]) => {
	const attr = __argAttribs(args);
	return new ctor(args.length === 1 ? args[0] : args, attr);
};

export const __ensureNumVerts = (num: number, expected: number) =>
	assert(num === expected, `require ${expected} points`);
