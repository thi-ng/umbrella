import { IGen } from "../api";
import { Comp2, Comp3 } from "./comp";

/**
 * Higher order gen. Returns a {@link Comp2} or {@link Comp3} yielding
 * sums of given {@link IGen}s. Initializes to 0.
 *
 * @param a - summand
 * @param b - summand
 */
export function sum(
    a: IGen<number>,
    b: IGen<number>
): Comp2<number, number, number>;
export function sum(
    a: IGen<number>,
    b: IGen<number>,
    c: IGen<number>
): Comp3<number, number, number, number>;
export function sum(a: IGen<number>, b: IGen<number>, c?: IGen<number>) {
    return c
        ? new Comp3((a, b, c) => a + b + c, a, b, c, 0)
        : new Comp2((a, b) => a + b, a, b, 0);
}
