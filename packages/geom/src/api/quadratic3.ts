// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type {
	Attribs,
	HiccupPathSegment,
	IHiccupPathSegment,
	IHiccupShape3,
} from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Quadratic3
	extends APC
	implements IHiccupShape3<Quadratic3>, IHiccupPathSegment
{
	readonly type = "quadratic3";
	readonly dim = 3;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 3);
	}

	copy(): Quadratic3 {
		return __copyShape(Quadratic3, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Quadratic3, this, fn(this.points));
	}

	withAttribs(attribs: Attribs) {
		return new Quadratic3(this.points, attribs);
	}

	toHiccup() {
		const [a, b, c] = this.points;
		return [
			"path3",
			this.attribs,
			[
				["M", a],
				["Q", b, c],
			],
		];
	}

	toHiccupPathSegments(): HiccupPathSegment[] {
		const [_, b, c] = this.points;
		return [["Q", b, c]];
	}
}
