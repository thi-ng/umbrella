import type {
	Attribs,
	HiccupPathSegment,
	IHiccupPathSegment,
	IHiccupShape3,
} from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Line3
	extends APC
	implements IHiccupShape3<Line3>, IHiccupPathSegment
{
	readonly type = "line3";
	readonly dim = 3;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 2);
	}

	copy(): Line3 {
		return __copyShape(Line3, this);
	}

	withAttribs(attribs: Attribs) {
		return new Line3(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points[0], this.points[1]];
	}

	toHiccupPathSegments(): HiccupPathSegment[] {
		return [["L", this.points[1]]];
	}
}
