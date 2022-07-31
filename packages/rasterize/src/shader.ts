import type { IGrid2D, TypedArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Shader2D } from "./api.js";

export const defPattern = <T extends any[] | TypedArray, P>(
	pattern: IGrid2D<T, P>
): Shader2D<P> => {
	const [w, h] = pattern.size;
	return (x, y) => pattern.getAtUnsafe(x % w, y % h);
};

export interface StripeShaderOpts<T> {
	dir: "h" | "v" | "d";
	size: number;
	sizeA: number;
	a: T;
	b: T;
}

export const defStripes = <T = number>({
	dir,
	size,
	sizeA,
	a,
	b,
}: StripeShaderOpts<T>): Shader2D<T> =>
	dir === "h"
		? (x) => (x % size < sizeA ? a : b)
		: dir === "v"
		? (_, y) => (y % size < sizeA ? a : b)
		: (x, y) => ((x + y) % size < sizeA ? a : b);

export interface RandomShaderOpts<T> {
	probability?: number;
	rnd?: IRandom;
	a: T;
	b: T;
}

export const defNoise = <T = number>(
	opts: RandomShaderOpts<T>
): Shader2D<T> => {
	const { probability, rnd, a, b } = {
		probability: 0.5,
		rnd: SYSTEM,
		...opts,
	};
	return () => (rnd.float() < probability ? a : b);
};
