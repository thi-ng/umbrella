import type { Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupPathSegment, IHiccupShape3 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polyline3
	extends APC
	implements IHiccupShape3<Polyline3>, IHiccupPathSegment
{
	readonly type = "polyline3";
	readonly dim = 3;

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polyline3 {
		return __copyShape(Polyline3, this);
	}

	withAttribs(attribs: Attribs) {
		return new Polyline3(this.points, attribs);
	}

	toHiccup() {
		return [this.type, { ...this.attribs, fill: "none" }, this.points];
	}

	toHiccupPathSegments() {
		const res: any[] = [];
		for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
			res.push(["L", pts[i]]);
		}
		return res;
	}
}
