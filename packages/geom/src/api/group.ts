import type { Fn } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { copyAttribs } from "../internal/copy-attribs";

export class Group implements IHiccupShape {
    constructor(
        public attribs: Attribs,
        public children: IHiccupShape[] = []
    ) {}

    get type() {
        return "group";
    }

    *[Symbol.iterator]() {
        yield* this.children;
    }

    copy(): Group {
        return this.copyTransformed((c) => <IHiccupShape>c.copy());
    }

    copyTransformed(fn: Fn<IHiccupShape, IHiccupShape>) {
        return new Group(copyAttribs(this), this.children.map(fn));
    }

    equiv(o: any) {
        return o instanceof Group && equiv(this.children, o.children);
    }

    toHiccup() {
        return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
    }
}
