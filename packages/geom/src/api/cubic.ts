import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type {
	Attribs,
	HiccupPathSegment,
	IHiccupPathSegment,
	IHiccupShape2,
} from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Cubic
	extends APC
	implements IHiccupShape2<Cubic>, IHiccupPathSegment
{
	readonly type = "cubic";
	readonly dim = 2;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 4);
	}

	copy(): Cubic {
		return __copyShape(Cubic, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Cubic, this, fn(this.points));
	}

	withAttribs(attribs: Attribs): Cubic {
		return new Cubic(this.points, attribs);
	}

	toHiccup() {
		const [a, b, c, d] = this.points;
		return [
			"path",
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
