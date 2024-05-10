import type { Vec } from "@thi.ng/vectors";
import type { IShape2, IShape3 } from "./shape.js";

export type SegmentType2 =
	| "m" // move
	| "l" // line
	| "p" // polyline
	| "a" // arc
	| "c" // cubic
	| "q" // quadratic
	| "z"; // close

export type SegmentType3 = Omit<SegmentType2, "a">;

export type PathSegment = PathSegment2 | PathSegment3;

export interface PathSegment2 {
	type: SegmentType2;
	point?: Vec;
	geo?: IShape2 & IHiccupPathSegment;
}

export interface PathSegment3 {
	type: SegmentType3;
	point?: Vec;
	geo?: IShape3 & IHiccupPathSegment;
}

export interface IHiccupPathSegment {
	toHiccupPathSegments(): HiccupPathSegment[];
}

export type HiccupPathSegment = [string, ...any[]];
