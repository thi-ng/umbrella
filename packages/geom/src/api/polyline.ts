import type {
	Attribs,
	IHiccupPathSegment,
	IHiccupShape,
} from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polyline extends APC implements IHiccupShape, IHiccupPathSegment {
	get type() {
		return "polyline";
	}

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polyline {
		return <Polyline>__copyShape(Polyline, this);
	}

	withAttribs(attribs: Attribs): Polyline {
		return new Polyline(this.points, attribs);
	}

	toHiccup() {
		return ["polyline", { ...this.attribs, fill: "none" }, this.points];
	}

	toHiccupPathSegments() {
		const res: any[] = [];
		for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
			res.push(["L", pts[i]]);
		}
		return res;
	}
}
