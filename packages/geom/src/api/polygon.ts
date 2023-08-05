import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polygon extends APC implements IHiccupShape {
	get type() {
		return "poly";
	}

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polygon {
		return <Polygon>__copyShape(Polygon, this);
	}

	withAttribs(attribs: Attribs): Polygon {
		return new Polygon(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
