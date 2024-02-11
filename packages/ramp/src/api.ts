import type { Fn2 } from "@thi.ng/api";

export type Frame<T> = [number, T];

export interface RampImpl<T> {
	min: Fn2<T | null, T, T>;
	max: Fn2<T | null, T, T>;
	at: (stops: Frame<T>[], index: number, t: number) => T;
}

export interface IRamp<T> {
	impl: RampImpl<T>;
	stops: Frame<T>[];

	at(t: number): T;
	bounds(): RampBounds<T>;
	samples(res?: number): Iterable<Frame<T>>;
	addStopAt(t: number, y: T, eps?: number): boolean;
	removeStopAt(t: number, eps?: number): boolean;
	closestIndex(t: number, eps?: number): number;
	clampedIndexTime(i: number, t: number, eps?: number): number;
	sort(): void;
	uniform(): void;
}

export interface RampBounds<T> {
	min: T;
	max: T;
	minT: number;
	maxT: number;
}
