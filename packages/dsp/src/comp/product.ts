import type { IGen } from "../api";
import { MapG2, MapG3 } from "./mapg";

/**
 * Higher order gen. Returns a {@link MapG2} or {@link MapG3} yielding
 * stepwise (non-accumulated) products of the given {@link IGen}s.
 * Initializes to 0.
 *
 * @param a - factor
 * @param b - factor
 */
export function product(a: IGen<number>, b: IGen<number>): IGen<number>;
export function product(
    a: IGen<number>,
    b: IGen<number>,
    c: IGen<number>
): IGen<number>;
export function product(a: IGen<number>, b: IGen<number>, c?: IGen<number>) {
    return c
        ? new MapG3((a, b, c) => a * b * c, a, b, c, 0)
        : new MapG2((a, b) => a * b, a, b, 0);
}
