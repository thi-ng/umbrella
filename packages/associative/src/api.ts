import {
    Comparator,
    ICopy,
    IEmpty,
    IEquiv,
    Predicate2
} from "@thi.ng/api/api";

export interface IEquivSet<T> extends
    Set<T>,
    ICopy<IEquivSet<T>>,
    IEmpty<IEquivSet<T>>,
    IEquiv {

    readonly [Symbol.species]: EquivSetConstructor;
    into(xs: Iterable<T>): this;
    disj(xs: Iterable<T>): this;
    get(val: T, notFound?: any): any;
    first(): T;
    opts(): EquivSetOpts<T>;
}

export interface EquivSetConstructor {
    new(): IEquivSet<any>;
    new <T>(values?: Iterable<T>, opts?: EquivSetOpts<T>): IEquivSet<T>;
    readonly prototype: IEquivSet<any>;
}

export interface EquivSetOpts<T> {
    /**
     * Key equivalence predicate. MUST return truthy result if given
     * keys are considered equal.
     *
     * Default: `@thi.ng/equiv`
     */
    equiv: Predicate2<T>;
}

export interface EquivMapOpts<K> extends EquivSetOpts<K> {
    keys: EquivSetConstructor;
}

/**
 * SortedMapOpts implementation config settings.
 */
export interface SortedMapOpts<K> extends EquivSetOpts<K> {
    /**
     * Key comparison function. Must follow standard comparator contract
     * and return:
     * - negative if `a < b`
     * - positive if `a > b`
     * - `0` if `a == b`
     *
     * Note: The `SortedMap` implementation only uses `<` comparisons.
     *
     * Default: `@thi.ng/compare`
     */
    compare: Comparator<K>;
    /**
     * Initial capacity before resizing (doubling) occurs.
     * This value will be rounded up to next pow2.
     *
     * Default: 16
     */
    capacity: number;
    /**
     * Probability for a value to exist in any express lane.
     * Default: `1 / Math.E`
     */
    probability: number;
}

export type SortedSetOpts<T> = SortedMapOpts<T>;
