import type {
	Attribs,
	IHiccupPathSegment,
	IHiccupShape2,
} from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __hiccupLineSegment } from "../internal/vertices.js";
import { APC } from "./apc.js";

export class Polyline
	extends APC
	implements IHiccupShape2<Polyline>, IHiccupPathSegment
{
	readonly type = "polyline";
	readonly dim = 2;

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polyline {
		return __copyShape(Polyline, this);
	}

	withAttribs(attribs: Attribs) {
		return new Polyline(this.points, attribs);
	}

	toHiccup() {
		return [this.type, { ...this.attribs, fill: "none" }, this.points];
	}

	toHiccupPathSegments() {
		const res: any[] = [];
		for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
			res.push(__hiccupLineSegment(pts[i - 1], pts[i]));
		}
		return res;
	}
}
