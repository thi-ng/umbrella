// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupShape3 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Points3 extends APC implements IHiccupShape3<Points3> {
	readonly type = "points3";
	readonly dim = 3;

	copy(): Points3 {
		return __copyShape(Points3, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Points3, this, fn(this.points));
	}

	withAttribs(attribs: Attribs) {
		return new Points3(this.points, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.points];
	}
}
