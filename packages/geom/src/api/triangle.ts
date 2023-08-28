import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { __ensureNumVerts } from "../internal/pclike.js";
import { APC } from "./apc.js";

export class Triangle extends APC implements IHiccupShape {
	constructor(points: Iterable<Vec>, attribs?: Attribs) {
		super(points, attribs);
		__ensureNumVerts(this.points.length, 3);
	}

	get type() {
		return "tri";
	}

	copy(): Triangle {
		return <Triangle>__copyShape(Triangle, this);
	}

	withAttribs(attribs: Attribs): Triangle {
		return new Triangle(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
