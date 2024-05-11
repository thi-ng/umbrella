import type { Attribs, IHiccupShape3 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Triangle3 extends APC implements IHiccupShape3<Triangle3> {
	readonly type = "tri3";
	readonly dim = 3;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 3);
	}

	copy(): Triangle3 {
		return __copyShape(Triangle3, this);
	}

	withAttribs(attribs: Attribs) {
		return new Triangle3(this.points, attribs);
	}

	toHiccup() {
		return ["polygon3", this.attribs, this.points];
	}
}
