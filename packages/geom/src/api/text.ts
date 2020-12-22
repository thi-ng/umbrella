import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

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
        return new Text(set([], this.pos), this.body, copyAttribs(this));
    }

    toHiccup() {
        return ["text", this.attribs, this.pos, this.body];
    }
}
