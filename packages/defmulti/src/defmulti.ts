import type { IObjectOf, Pair } from "@thi.ng/api";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
    AncestorDefs,
    DispatchFn,
    DispatchFn1,
    DispatchFn1O,
    DispatchFn2,
    DispatchFn2O,
    DispatchFn3,
    DispatchFn3O,
    DispatchFn4,
    DispatchFn4O,
    DispatchFn5,
    DispatchFn5O,
    DispatchFn6,
    DispatchFn6O,
    DispatchFn7,
    DispatchFn7O,
    DispatchFn8,
    DispatchFn8O,
    Implementation,
    Implementation1,
    Implementation1O,
    Implementation2,
    Implementation2O,
    Implementation3,
    Implementation3O,
    Implementation4,
    Implementation4O,
    Implementation5,
    Implementation5O,
    Implementation6,
    Implementation6O,
    Implementation7,
    Implementation7O,
    Implementation8,
    Implementation8O,
    MultiFn,
    MultiFn1,
    MultiFn1O,
    MultiFn2,
    MultiFn2O,
    MultiFn3,
    MultiFn3O,
    MultiFn4,
    MultiFn4O,
    MultiFn5,
    MultiFn5O,
    MultiFn6,
    MultiFn6O,
    MultiFn7,
    MultiFn7O,
    MultiFn8,
    MultiFn8O,
} from "./api";
import { LOGGER } from "./logger";

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
export const DEFAULT: unique symbol = Symbol();

/**
 * Returns a new multi-dispatch function using the provided dispatch value
 * function. Additionally, optional ancestor relationships (`rels`) and set of
 * implementations (`impls`) can be given.
 *
 * @remarks
 * The dispatcher can take any number of arguments and must produce a dispatch
 * value (string, number or symbol) used to lookup an implementation. If found,
 * the impl is called with the same args and its return value used as own return
 * value. If no matching implementation is available, attempts to dispatch to
 * DEFAULT impl. If none is registered, an error is thrown.
 *
 * `defmulti` provides generics for type checking up to 8 args (plus the return
 * type) and the generics will also apply to all implementations. If more than 8
 * args are required, `defmulti` will fall back to an untyped varargs solution.
 *
 * Implementations for different dispatch values can be added and removed
 * dynamically by calling `.add(id, fn)`, `.addAll(impls)` or `.remove(id)` on
 * the returned function. Each returns `true` if the operation was successful.
 */
export function defmulti<T>(
    f: DispatchFn,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation<T>>
): MultiFn<T>;
export function defmulti<A, T>(
    f: DispatchFn1<A>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation1<A, T>>
): MultiFn1<A, T>;
export function defmulti<A, B, T>(
    f: DispatchFn2<A, B>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation2<A, B, T>>
): MultiFn2<A, B, T>;
export function defmulti<A, B, T>(
    f: DispatchFn1O<A, B>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation1O<A, B, T>>
): MultiFn1O<A, B, T>;
export function defmulti<A, B, C, T>(
    f: DispatchFn3<A, B, C>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation3<A, B, C, T>>
): MultiFn3<A, B, C, T>;
export function defmulti<A, B, C, T>(
    f: DispatchFn2O<A, B, C>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation2O<A, B, C, T>>
): MultiFn2O<A, B, C, T>;
export function defmulti<A, B, C, D, T>(
    f: DispatchFn4<A, B, C, D>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation4<A, B, C, D, T>>
): MultiFn4<A, B, C, D, T>;
export function defmulti<A, B, C, D, T>(
    f: DispatchFn3O<A, B, C, D>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation3O<A, B, C, D, T>>
): MultiFn3O<A, B, C, D, T>;
export function defmulti<A, B, C, D, E, T>(
    f: DispatchFn5<A, B, C, D, E>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation5<A, B, C, D, E, T>>
): MultiFn5<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, T>(
    f: DispatchFn4O<A, B, C, D, E>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation4O<A, B, C, D, E, T>>
): MultiFn4O<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, F, T>(
    f: DispatchFn6<A, B, C, D, E, F>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation6<A, B, C, D, E, F, T>>
): MultiFn6<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, T>(
    f: DispatchFn5O<A, B, C, D, E, F>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation5O<A, B, C, D, E, F, T>>
): MultiFn5O<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, G, T>(
    f: DispatchFn7<A, B, C, D, E, F, G>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation7<A, B, C, D, E, F, G, T>>
): MultiFn7<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, T>(
    f: DispatchFn6O<A, B, C, D, E, F, G>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation6O<A, B, C, D, E, F, G, T>>
): MultiFn6O<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(
    f: DispatchFn8<A, B, C, D, E, F, G, H>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation8<A, B, C, D, E, F, G, H, T>>
): MultiFn8<A, B, C, D, E, F, G, H, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(
    f: DispatchFn7O<A, B, C, D, E, F, G, H>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation7O<A, B, C, D, E, F, G, H, T>>
): MultiFn7O<A, B, C, D, E, F, G, H, T>;
export function defmulti<A, B, C, D, E, F, G, H, I, T>(
    f: DispatchFn8O<A, B, C, D, E, F, G, H, I>,
    rels?: AncestorDefs,
    impls?: IObjectOf<Implementation8O<A, B, C, D, E, F, G, H, I, T>>
): MultiFn8O<A, B, C, D, E, F, G, H, I, T>;
export function defmulti<T>(
    f: any,
    _rels?: AncestorDefs,
    _impls?: IObjectOf<Implementation<T>>
) {
    const impls: IObjectOf<Implementation<T>> = {};
    const rels: IObjectOf<Set<PropertyKey>> = _rels ? makeRels(_rels) : {};
    const fn: any = (...args: any[]) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[<any>DEFAULT];
        return g
            ? g(...args)
            : unsupported(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id: PropertyKey, _impl: Implementation<T>) => {
        if (impls[<any>id]) {
            LOGGER.warn(`overwriting '${id.toString()}' impl`);
        }
        impls[<any>id] = _impl;
        return true;
    };
    fn.addAll = (_impls: IObjectOf<Implementation<T>>) => {
        let ok = true;
        for (let id in _impls) {
            ok = fn.add(id, _impls[id]) && ok;
        }
        DEFAULT in _impls && fn.setDefault(_impls[<any>DEFAULT]);
        return ok;
    };
    fn.setDefault = (impl: Implementation<T>) => fn.add(DEFAULT, impl);
    fn.remove = (id: PropertyKey) => {
        if (!impls[<any>id]) return false;
        delete impls[<any>id];
        return true;
    };
    fn.callable = (...args: any[]) => {
        const id = f(...args);
        return !!(
            impls[id] ||
            findImpl(impls, rels, id) ||
            impls[<any>DEFAULT]
        );
    };
    fn.isa = (id: PropertyKey, parent: PropertyKey) => {
        let val = rels[<any>id];
        !val && (rels[<any>id] = val = new Set());
        val.add(parent);
    };
    fn.impls = () => {
        const res = new Set<PropertyKey>(Object.keys(impls));
        for (let id in rels) {
            findImpl(impls, rels, id) && res.add(id);
        }
        impls[<any>DEFAULT] && res.add(DEFAULT);
        return res;
    };
    fn.rels = () => rels;
    fn.parents = (id: PropertyKey) => rels[<any>id];
    fn.ancestors = (id: PropertyKey) =>
        new Set<PropertyKey>(findAncestors([], rels, id));
    fn.dependencies = function* (): IterableIterator<
        Pair<PropertyKey, PropertyKey | undefined>
    > {
        for (let a in rels) {
            for (let b of rels[a]) yield [a, b];
        }
        for (let id in impls) {
            !rels[id] && (yield [id, undefined]);
        }
    };

    _impls && fn.addAll(_impls);
    return fn;
}

const findImpl = (
    impls: IObjectOf<Implementation<any>>,
    rels: IObjectOf<Set<PropertyKey>>,
    id: PropertyKey
) => {
    const parents = rels[<any>id];
    if (!parents) return;
    for (let p of parents) {
        let impl: Implementation<any> =
            impls[<any>p] || findImpl(impls, rels, p);
        if (impl) return impl;
    }
};

const findAncestors = (
    acc: PropertyKey[],
    rels: IObjectOf<Set<PropertyKey>>,
    id: PropertyKey
) => {
    const parents = rels[<any>id];
    if (parents) {
        for (let p of parents) {
            acc.push(p);
            findAncestors(acc, rels, p);
        }
    }
    return acc;
};

const makeRels = (spec: AncestorDefs) => {
    const rels: IObjectOf<Set<PropertyKey>> = {};
    for (let k in spec) {
        const val = spec[k];
        rels[k] =
            val instanceof Set
                ? val
                : Array.isArray(val)
                ? new Set(val)
                : new Set([val]);
    }
    return rels;
};
