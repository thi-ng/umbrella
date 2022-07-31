import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Quad3 extends APC implements IHiccupShape {
	get type() {
		return "quad3";
	}

	copy(): Quad3 {
		return <Quad3>__copyShape(Quad3, this);
	}

	withAttribs(attribs: Attribs): Quad3 {
		return new Quad3(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
