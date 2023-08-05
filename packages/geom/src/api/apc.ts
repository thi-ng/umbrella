import type { IClear } from "@thi.ng/api";
import type { Attribs, PCLike } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export abstract class APC implements IClear, PCLike {
	constructor(public points: Vec[] = [], public attribs?: Attribs) {}

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
