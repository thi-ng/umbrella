import { Vec } from "@thi.ng/vectors";
import { IShape } from "./shape";

export const enum SegmentType {
    MOVE,
    LINE,
    POLYLINE,
    ARC,
    CUBIC,
    QUADRATIC,
    CLOSE
}

export interface PathSegment {
    type: SegmentType;
    point?: Vec;
    geo?: IShape & IHiccupPathSegment;
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}
