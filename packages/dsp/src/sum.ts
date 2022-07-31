import type { IGen } from "./api.js";
import { MapG2, MapG3 } from "./mapg.js";

/**
 * Higher order gen. Returns a {@link MapG2} or {@link MapG3} yielding
 * stepwise (non-accumulated) sums of given {@link IGen}s. Initializes
 * to 0.
 *
 * @param a - summand
 * @param b - summand
 */
export function sum(a: IGen<number>, b: IGen<number>): IGen<number>;
export function sum(
	a: IGen<number>,
	b: IGen<number>,
	c: IGen<number>
): IGen<number>;
export function sum(a: IGen<number>, b: IGen<number>, c?: IGen<number>) {
	return c
		? new MapG3((a, b, c) => a + b + c, a, b, c, 0)
		: new MapG2((a, b) => a + b, a, b, 0);
}
