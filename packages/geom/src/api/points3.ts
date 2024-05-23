import type { Attribs, IHiccupShape3 } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Points3 extends APC implements IHiccupShape3<Points3> {
	readonly type = "points3";
	readonly dim = 3;

	copy(): Points3 {
		return <Points3>__copyShape(Points3, this);
	}

	withAttribs(attribs: Attribs) {
		return new Points3(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points];
	}
}
