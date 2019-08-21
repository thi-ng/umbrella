import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors";
import {
    Attribs,
    IHiccupShape,
    PathSegment,
    Type
} from "@thi.ng/geom-api";
import { copyAttribs } from "../internal/copy-attribs";

export class Path implements IHiccupShape {
    segments: PathSegment[];
    closed: boolean;
    attribs?: Attribs;

    constructor(segments?: PathSegment[], attribs?: Attribs) {
        this.segments = segments || [];
        this.attribs = attribs;
        this.closed = false;
    }

    get type() {
        return Type.PATH;
    }

    *[Symbol.iterator]() {
        yield* this.segments;
    }

    copy(): Path {
        const p = new Path([...this.segments], copyAttribs(this));
        p.closed = this.closed;
        return p;
    }

    equiv(o: any) {
        return o instanceof Path && equiv(this.segments, o.segments);
    }

    add(s: PathSegment) {
        if (this.closed) illegalState("path already closed");
        this.segments.push(s);
    }

    toHiccup() {
        let dest: any[] = [];
        const segments = this.segments;
        const n = segments.length;
        if (n > 1) {
            dest.push(["M", segments[0].point]);
            for (let i = 1; i < n; i++) {
                dest = dest.concat(segments[i].geo!.toHiccupPathSegments());
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return ["path", this.attribs || {}, dest];
    }
}
