import type { Attribs, IHiccupShape2 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Triangle extends APC implements IHiccupShape2<Triangle> {
	readonly type = "tri";
	readonly dim = 2;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 3);
	}

	copy(): Triangle {
		return __copyShape(Triangle, this);
	}

	withAttribs(attribs: Attribs) {
		return new Triangle(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
