// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupShape3 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polygon3 extends APC implements IHiccupShape3<Polygon3> {
	readonly type = "poly3";
	readonly dim = 3;

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polygon3 {
		return __copyShape(Polygon3, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Polygon3, this, fn(this.points));
	}

	withAttribs(attribs: Attribs) {
		return new Polygon3(this.points, attribs);
	}

	toHiccup() {
		return ["polygon3", this.attribs, this.points];
	}
}
