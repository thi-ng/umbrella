import type {
	Attribs,
	HiccupPathSegment,
	IHiccupPathSegment,
	IHiccupShape2,
} from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Quadratic
	extends APC
	implements IHiccupShape2<Quadratic>, IHiccupPathSegment
{
	readonly type = "quadratic";
	readonly dim = 2;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 3);
	}

	copy(): Quadratic {
		return __copyShape(Quadratic, this);
	}

	withAttribs(attribs: Attribs) {
		return new Quadratic(this.points, attribs);
	}

	toHiccup() {
		const [a, b, c] = this.points;
		return [
			"path",
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
