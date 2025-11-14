// SPDX-License-Identifier: Apache-2.0
// thing:export
import { isArray } from "@thi.ng/checks/is-array";
import { assert } from "@thi.ng/errors/assert";
import type { IShape, PCLike, PCLikeConstructor } from "../api.js";
import { __argAttribs } from "./args.js";

export const __ensurePCLike = (x: IShape): PCLike => {
	assert(isArray((<any>x).points), "expected a PCLike shape");
	return <PCLike>x;
};

export const __pclike = (ctor: PCLikeConstructor, args: any[]) => {
	const attr = __argAttribs(args);
	return new ctor(args.length === 1 ? args[0] : args, attr);
};

export const __ensureNumVerts = (num: number, expected: number) =>
	assert(num === expected, `require ${expected} points`);
