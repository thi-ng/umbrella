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

export class Cubic3
	extends APC
	implements IHiccupShape3<Cubic3>, IHiccupPathSegment
{
	readonly type = "cubic3";
	readonly dim = 3;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 4);
	}

	copy(): Cubic3 {
		return __copyShape(Cubic3, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Cubic3, this, fn(this.points));
	}

	withAttribs(attribs: Attribs): Cubic3 {
		return new Cubic3(this.points, attribs);
	}

	toHiccup() {
		const [a, b, c, d] = this.points;
		return [
			"path3",
			this.attribs,
			[
				["M", a],
				["C", b, c, d],
			],
		];
	}

	toHiccupPathSegments(): HiccupPathSegment[] {
		const [_, b, c, d] = this.points;
		return [["C", b, c, d]];
	}
}
