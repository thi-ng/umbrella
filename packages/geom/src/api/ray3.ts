import type { Attribs, IHiccupShape3 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { maddN3 } from "@thi.ng/vectors/maddn";
import { set3 } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

export class Ray3 implements IHiccupShape3<Ray3> {
	readonly type = "ray3";
	readonly dim = 3;

	constructor(public pos: Vec, public dir: Vec, public attribs?: Attribs) {}

	copy(): Ray3 {
		return new Ray3(
			set3([], this.pos),
			set3([], this.dir),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Ray3(this.pos, this.dir, attribs);
	}

	toHiccup() {
		return [
			"line3",
			this.attribs,
			this.pos,
			maddN3([], this.dir, 1e6, this.pos),
		];
	}
}
