// SPDX-License-Identifier: Apache-2.0
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { ZERO2, type Vec } from "@thi.ng/vectors/api";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { max2 } from "@thi.ng/vectors/max";
import { set2 } from "@thi.ng/vectors/set";
import type { AABBLike, Attribs, IHiccupShape2 } from "../api.js";
import { __asVec } from "../internal/args.js";
import { __copyAttribs } from "../internal/copy.js";

export class Rect implements AABBLike, IHiccupShape2<Rect> {
	readonly type = "rect";
	readonly dim = 2;

	size: Vec;

	constructor(
		public pos: Vec = [0, 0],
		size: number | Vec = 1,
		public attribs?: Attribs
	) {
		this.size = max2(null, __asVec(size), ZERO2);
	}

	copy(): Rect {
		return new Rect(
			set2([], this.pos),
			set2([], this.size),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs): Rect {
		return new Rect(this.pos, this.size, attribs);
	}

	min() {
		return set2([], this.pos);
	}

	max() {
		return add2([], this.pos, this.size);
	}

	offset(offset: number) {
		const c = maddN2([], this.size, 0.5, this.pos);
		max2(null, addN2(null, this.size, offset * 2), ZERO2);
		maddN2(this.pos, this.size, -0.5, c);
		return this;
	}

	toHiccup() {
		return [this.type, this.attribs, this.pos, this.size[0], this.size[1]];
	}
}
