import type { Attribs, IHiccupShape3 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Quad3 extends APC implements IHiccupShape3<Quad3> {
	readonly type = "quad3";
	readonly dim = 3;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 4);
	}

	copy(): Quad3 {
		return __copyShape(Quad3, this);
	}

	withAttribs(attribs: Attribs) {
		return new Quad3(this.points, attribs);
	}

	toHiccup() {
		return ["polygon3", this.attribs, this.points];
	}
}
