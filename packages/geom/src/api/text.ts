import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

/**
 * Basic stub for text elements. Currently, only a minimal set of geometry
 * operations are implemented for this type, however this type implements
 * {@link @this.ng/api#IToHiccup} and so is useful as wrapper for inclusion of
 * text elements in {@link Group}s with other shape types.
 */
export class Text implements IHiccupShape {
	constructor(public pos: Vec, public body: any, public attribs?: Attribs) {}

	get type() {
		return "text";
	}

	copy(): Text {
		return new Text(set([], this.pos), this.body, __copyAttribs(this));
	}

	withAttribs(attribs: Attribs): Text {
		return new Text(this.pos, this.body, attribs);
	}

	toHiccup() {
		return ["text", this.attribs, this.pos, this.body];
	}
}
