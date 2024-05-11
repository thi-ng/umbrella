import type { Attribs, IHiccupShape2 } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

/**
 * Basic stub for text elements. Currently, only a minimal set of geometry
 * operations are implemented for this type, however this type implements
 * [`IToHiccup`](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html) and
 * so is useful as wrapper for inclusion of text elements in {@link Group}s with
 * other shape types.
 */
export class Text implements IHiccupShape2<Text> {
	readonly type = "text";
	readonly dim = 2;

	constructor(public pos: Vec, public body: any, public attribs?: Attribs) {}

	copy(): Text {
		return new Text(set([], this.pos), this.body, __copyAttribs(this));
	}

	withAttribs(attribs: Attribs) {
		return new Text(this.pos, this.body, attribs);
	}

	toHiccup() {
		return [this.type, this.attribs, this.pos, this.body];
	}
}
