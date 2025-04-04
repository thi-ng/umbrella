// SPDX-License-Identifier: Apache-2.0
import type { Fn, IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Attribs, PCLike } from "../api.js";

export abstract class APC implements IClear, PCLike {
	points: Vec[];

	constructor(points?: Iterable<Vec>, public attribs?: Attribs) {
		this.points = points ? ensureArray(points) : [];
	}

	abstract get type(): number | string;

	abstract get dim(): number;

	abstract copy(): APC;

	abstract copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>): APC;

	abstract withAttribs(attribs: Attribs): APC;

	*[Symbol.iterator]() {
		yield* this.points;
	}

	clear() {
		this.points.length = 0;
	}
}
