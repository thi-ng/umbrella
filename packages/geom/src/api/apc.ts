import type { IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { Attribs, PCLike } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export abstract class APC implements IClear, PCLike {
	points: Vec[];

	constructor(points?: Iterable<Vec>, public attribs?: Attribs) {
		this.points = points ? ensureArray(points) : [];
	}

	abstract get type(): number | string;

	abstract copy(): APC;

	abstract withAttribs(attribs: Attribs): APC;

	*[Symbol.iterator]() {
		yield* this.points;
	}

	clear() {
		this.points.length = 0;
	}
}
