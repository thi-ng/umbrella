// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { set2 } from "@thi.ng/vectors/set";
import type { Attribs, IHiccupShape2 } from "../api.js";
import { __copyAttribs } from "../internal/copy.js";

export class Ray implements IHiccupShape2<Ray> {
	readonly type = "ray";
	readonly dim = 2;

	constructor(public pos: Vec, public dir: Vec, public attribs?: Attribs) {}

	copy(): Ray {
		return new Ray(
			set2([], this.pos),
			set2([], this.dir),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Ray(this.pos, this.dir, attribs);
	}

	toHiccup() {
		return [
			"line",
			this.attribs,
			this.pos,
			maddN2([], this.dir, 1e6, this.pos),
		];
	}
}
