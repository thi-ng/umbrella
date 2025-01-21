// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vectors";
import { set3 } from "@thi.ng/vectors/set";
import type { Attribs, IHiccupShape3 } from "../api.js";
import { __copyAttribs } from "../internal/copy.js";

export class Plane implements IHiccupShape3<Plane> {
	readonly type = "plane";
	readonly dim = 3;

	constructor(
		public normal: Vec = [0, 1, 0],
		public w = 0,
		public attribs?: Attribs
	) {}

	copy(): Plane {
		return new Plane(
			set3([], this.normal),
			this.w,
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs): Plane {
		return new Plane(this.normal, this.w, attribs);
	}

	toHiccup() {
		return ["plane", this.attribs, this.normal, this.w];
	}
}
