// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Attribs, IHiccupShape2 } from "../api.js";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polygon extends APC implements IHiccupShape2<Polygon> {
	readonly type = "poly";
	readonly dim = 2;

	add(...points: Vec[]) {
		this.points.push(...points);
	}

	copy(): Polygon {
		return __copyShape(Polygon, this);
	}

	copyTransformed(fn: Fn<ReadonlyVec[], Vec[]>) {
		return __copyShape(Polygon, this, fn(this.points));
	}

	withAttribs(attribs: Attribs) {
		return new Polygon(this.points, attribs);
	}

	toHiccup() {
		return ["polygon", this.attribs, this.points];
	}
}
