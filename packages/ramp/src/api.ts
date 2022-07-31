import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface IRamp {
	stops: Vec[];

	at(t: number): number;
	bounds(): RampBounds;
	interpolatedPoints(res?: number): Iterable<ReadonlyVec>;
	addStopAt(t: number, y: number, eps?: number): boolean;
	removeStopAt(t: number, eps?: number): boolean;
	closestIndex(t: number, eps?: number): number;
	clampedIndexTime(i: number, t: number, eps?: number): number;
	sort(): void;
	uniform(): void;
}

export interface RampBounds {
	min: number;
	max: number;
	minT: number;
	maxT: number;
}

export interface RampConstructor {
	new (stops: Vec[]): IRamp;
}
