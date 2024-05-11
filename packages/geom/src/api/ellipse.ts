import type { Attribs, IHiccupShape2 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set2 } from "@thi.ng/vectors/set";
import { __asVec } from "../internal/args.js";
import { __copyAttribs } from "../internal/copy.js";

export class Ellipse implements IHiccupShape2<Ellipse> {
	readonly type = "ellipse";
	readonly dim = 2;

	r: Vec;

	constructor(
		public pos: Vec = [0, 0],
		r: number | Vec = [1, 1],
		public attribs?: Attribs
	) {
		this.r = __asVec(r);
	}

	copy(): Ellipse {
		return new Ellipse(
			set2([], this.pos),
			set2([], this.r),
			__copyAttribs(this)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Ellipse(this.pos, this.r, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.pos, this.r];
	}
}
