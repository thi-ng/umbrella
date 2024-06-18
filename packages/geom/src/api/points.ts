import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupShape2 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Points extends APC implements IHiccupShape2<Points> {
	readonly type = "points";
	readonly dim = 2;

	copy(): Points {
		return __copyShape(Points, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Points, this, fn(this.points));
	}

	withAttribs(attribs: Attribs) {
		return new Points(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points];
	}
}
