import type { Comparator, FnU2, NumOrString, Predicate2 } from "@thi.ng/api";

export type VClock = Record<NumOrString, number>;

/**
 * Immutably increments clock for given `id`. If no clock for that ID exists
 * yet, it will be initialized to 1.
 *
 * @remarks
 * Be aware of JS number precision limitations! Clocks will only be precise for
 * clock(id) <= 2**53-1, which is equivalent to ~285421 years @ a constant
 * 1000Hz update frequency.
 *
 * @param clock
 * @param id
 */
export const inc = (clock: VClock, id: NumOrString): VClock => ({
    ...clock,
    [id]: (clock[id] || 0) + 1,
});

/**
 * Immutably removes key `id` from given vector clock. Returns updated clock or
 * original if `id` didn't exist in `clock`.
 *
 * @param clock
 * @param id
 */
export const remove = (clock: VClock, id: NumOrString): VClock => {
    if (clock[id] === undefined) return clock;
    const res: VClock = { ...clock };
    delete res[id];
    return res;
};

/**
 * Immutably merges given vector clocks by producing a new one where each key's
 * new value is set to `max(a[id], b[id])`. If a key is only available in either
 * of the inputs, its value is kept.
 *
 * @param a
 * @param b
 */
export const merge: FnU2<VClock> = (a, b) =>
    [...uniqueIDs(a, b)].reduce((acc, id) => {
        const va = a[id];
        const vb = b[id];
        acc[id] =
            va !== undefined && vb !== undefined
                ? va > vb
                    ? va
                    : vb
                : va !== undefined
                ? a[id]
                : b[id];
        return acc;
    }, <VClock>{});

/**
 * Computes the componentwise max signed difference between given vector clocks.
 *
 * @remarks
 * The skew sign is relative to `a` with respect to clock state in `b`. See
 * {@link absSkew} for unsigned version.
 *
 * @example
 * ```ts
 * signedSkew({a: 1, b: 4, c: 2}, {a: 2, c: 20})
 * // -18
 * ```
 *
 * @param a
 * @param b
 */
export const signedSkew: FnU2<VClock, number> = (a, b) =>
    [...uniqueIDs(a, b)].reduce((acc, id) => {
        const d = (a[id] || 0) - (b[id] || 0);
        return Math.abs(d) > Math.abs(acc) ? d : acc;
    }, 0);

/**
 * Unsigned version of {@link signedSkew}.
 *
 * @param a
 * @param b
 */
export const absSkew: FnU2<VClock, number> = (a, b) =>
    Math.abs(signedSkew(a, b));

/**
 * Vector clock comparator, yielding ascending order in terms of all clocks.
 * Follows standard {@link @this.ng/api#Comparator} contract and returns:
 *
 * - -1 (before): iff for all i a(i) <= b(i) and there exist a j such that a(j) < b(j)
 * - 0 (same): iff for all i a(i) == b(i)
 * - +1 (after): iff for all i a(i) >= b(i) and there exist a j such that a(j) > b(j)
 * - 0 (concurrent): iff a != b otherwise
 *
 * @example
 * ```ts
 * compare({ a: 1, b: 2 }, { a: 3, b: 2 }); // -1
 * compare({ a: 3, b: 2 }, { a: 3, b: 2 }); // 0 (equal)
 * compare({ a: 3, b: 2 }, { a: 2, b: 3 }); // 0 (conflict)
 * compare({ a: 3, b: 3 }, { a: 3, b: 2 }); // +1
 * ```
 *
 * @param a
 * @param b
 */
export const compare: Comparator<VClock> = (a, b) => {
    let ah = false;
    let al = false;
    for (let id of uniqueIDs(a, b)) {
        const delta = (a[id] || 0) - (b[id] || 0);
        ah ||= delta > 0;
        al ||= delta < 0;
        if (ah && al) return 0;
    }
    return ah ? 1 : al ? -1 : 0;
};

/**
 * Returns true iff {@link compare} for the given vector clocks returns 0.
 *
 * @param a
 * @param b
 */
export const isConcurrent: Predicate2<VClock> = (a, b) => compare(a, b) === 0;

/**
 * Returns true iff {@link compare} for the given vector clocks returns -1.
 *
 * @param a
 * @param b
 */
export const isBefore: Predicate2<VClock> = (a, b) => compare(a, b) < 0;

/**
 * Returns true iff {@link compare} for the given vector clocks returns +1.
 *
 * @param a
 * @param b
 */
export const isAfter: Predicate2<VClock> = (a, b) => compare(a, b) > 0;

/**
 * Returns true if both vector clocks are equivalent, i.e. both only have the
 * same keys AND each key the same value.
 *
 * @param a
 * @param b
 */
export const equiv: Predicate2<VClock> = (a, b) => {
    for (let id of uniqueIDs(a, b)) {
        const va = a[id];
        const vb = b[id];
        if (va === undefined || vb === undefined || va !== vb) return false;
    }
    return true;
};

/**
 * Alias for {@link compare}.
 *
 * @param a
 * @param b
 */
export const orderAsc = compare;

/**
 * Similar to {@link orderAsc}, but yielding reverse sort order.
 *
 * @param a
 * @param b
 */
export const orderDesc: Comparator<VClock> = (a, b) => -compare(a, b);

/**
 * Returns union set of unique keys from `a` and `b`.
 *
 * @internal
 */
const uniqueIDs = (a: any, b: any) =>
    new Set(Object.keys(a).concat(Object.keys(b)));
