import type { Vec } from "@thi.ng/vectors";
import { set3 } from "@thi.ng/vectors/set";
import type { Attribs, IHiccupShape3 } from "../api.js";
import { __copyAttribs } from "../internal/copy.js";

export class Sphere implements IHiccupShape3<Sphere> {
	readonly type = "sphere";
	readonly dim = 3;

	constructor(
		public pos: Vec = [0, 0, 0],
		public r = 1,
		public attribs?: Attribs
	) {}

	copy(): Sphere {
		return new Sphere(
			set3([], this.pos),
			this.r,
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Sphere(this.pos, this.r, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.pos, this.r];
	}
}
