import type { Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupShape2 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Quad extends APC implements IHiccupShape2<Quad> {
	readonly type = "quad";
	readonly dim = 2;

	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 4);
	}

	copy(): Quad {
		return __copyShape(Quad, this);
	}

	withAttribs(attribs: Attribs) {
		return new Quad(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
