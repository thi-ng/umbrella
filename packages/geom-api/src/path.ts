import type { Vec } from "@thi.ng/vectors";
import type { IShape } from "./shape";

export enum SegmentType {
    MOVE,
    LINE,
    POLYLINE,
    ARC,
    CUBIC,
    QUADRATIC,
    CLOSE,
}

export interface PathSegment {
    type: SegmentType;
    point?: Vec;
    geo?: IShape & IHiccupPathSegment;
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}
