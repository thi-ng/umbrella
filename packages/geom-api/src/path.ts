import type { Vec } from "@thi.ng/vectors";
import type { IShape } from "./shape.js";

export type SegmentType =
    | "m" // move
    | "l" // line
    | "p" // polyline
    | "a" // arc
    | "c" // cubic
    | "q" // quadratic
    | "z"; // close

export interface PathSegment {
    type: SegmentType;
    point?: Vec;
    geo?: IShape & IHiccupPathSegment;
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}
