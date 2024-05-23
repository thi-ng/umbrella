import type {
	Attribs,
	IHiccupPathSegment,
	IHiccupShape2,
} from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { __hiccupLineSegment } from "../internal/vertices.js";
import { APC } from "./apc.js";

export class Line
	extends APC
	implements IHiccupShape2<Line>, IHiccupPathSegment
{
	readonly type = "line";
	readonly dim = 2;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 2);
	}

	copy(): Line {
		return __copyShape(Line, this);
	}

	withAttribs(attribs: Attribs) {
		return new Line(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points[0], this.points[1]];
	}

	toHiccupPathSegments() {
		return [__hiccupLineSegment(this.points[0], this.points[1])];
	}
}
