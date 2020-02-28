import { Comparator, Keys, Val1 } from "@thi.ng/api";
import { compare } from "./compare";

/**
 * HOF comparator. Returns new comparator to sort objects by given `key`
 * and with optional comparator `cmp` (default: {@link compare}).
 *
 * @param key -
 * @param cmp -
 */
export const compareByKey = <T, K extends Keys<T>>(
    key: K,
    cmp: Comparator<Val1<T, K>> = compare
): Comparator<T> => (x, y) => cmp(x[key], y[key]);

/**
 * HOF comparator. Returns new comparator to sort objects by given keys
 * `a` (major), `b` (minor) and with optional comparators (default for
 * each: {@link compare}).
 *
 * @param a -
 * @param b -
 * @param cmpA -
 * @param cmpB -
 */
export const compareByKeys2 = <T, A extends Keys<T>, B extends Keys<T>>(
    a: A,
    b: B,
    cmpA: Comparator<Val1<T, A>> = compare,
    cmpB: Comparator<Val1<T, B>> = compare
): Comparator<T> => (x, y) => {
    let res = cmpA(x[a], y[a]);
    return res === 0 ? cmpB(x[b], y[b]) : res;
};

/**
 * Same as {@link compareByKeys2}, but for 3 sort keys / comparators.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param cmpA -
 * @param cmpB -
 * @param cmpC -
 */
export const compareByKeys3 = <
    T,
    A extends Keys<T>,
    B extends Keys<T>,
    C extends Keys<T>
>(
    a: A,
    b: B,
    c: C,
    cmpA: Comparator<Val1<T, A>> = compare,
    cmpB: Comparator<Val1<T, B>> = compare,
    cmpC: Comparator<Val1<T, C>> = compare
): Comparator<T> => (x, y) => {
    let res = cmpA(x[a], y[a]);
    return res === 0
        ? (res = cmpB(x[b], y[b])) === 0
            ? cmpC(x[c], y[c])
            : res
        : res;
};

/**
 * Same as {@link compareByKeys2}, but for 4 sort keys / comparators.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param cmpA -
 * @param cmpB -
 * @param cmpC -
 * @param cmpD -
 */
export const compareByKeys4 = <
    T,
    A extends Keys<T>,
    B extends Keys<T>,
    C extends Keys<T>,
    D extends Keys<T>
>(
    a: A,
    b: B,
    c: C,
    d: D,
    cmpA: Comparator<Val1<T, A>> = compare,
    cmpB: Comparator<Val1<T, B>> = compare,
    cmpC: Comparator<Val1<T, C>> = compare,
    cmpD: Comparator<Val1<T, D>> = compare
): Comparator<T> => (x, y) => {
    let res = cmpA(x[a], y[a]);
    return res === 0
        ? (res = cmpB(x[b], y[b])) === 0
            ? (res = cmpC(x[c], y[c])) === 0
                ? cmpD(x[d], y[d])
                : res
            : res
        : res;
};
