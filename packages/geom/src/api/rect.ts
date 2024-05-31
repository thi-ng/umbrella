import type { AABBLike, Attribs, IHiccupShape2 } from "@thi.ng/geom-api";
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { ZERO2, type Vec } from "@thi.ng/vectors/api";
import { max2 } from "@thi.ng/vectors/max";
import { set2 } from "@thi.ng/vectors/set";
import { subN2 } from "@thi.ng/vectors/subn";
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
			__copyAttribs(this)
		);
	}

	withAttribs(attribs: Attribs): Rect {
		return new Rect(this.pos, this.size, attribs);
	}

	max() {
		return add2([], this.pos, this.size);
	}

	offset(offset: number) {
		subN2(null, this.pos, offset);
		max2(null, addN2(null, this.size, offset * 2), ZERO2);
		return this;
	}

	toHiccup() {
		return [this.type, this.attribs, this.pos, this.size[0], this.size[1]];
	}
}
