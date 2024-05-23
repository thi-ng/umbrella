import type { Attribs, IHiccupShape2 } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Points extends APC implements IHiccupShape2<Points> {
	readonly type = "points";
	readonly dim = 2;

	copy(): Points {
		return __copyShape(Points, this);
	}

	withAttribs(attribs: Attribs) {
		return new Points(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points];
	}
}
