import { assert } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { gensym } from "./idgen";
import type { Lit, Sym, Term } from "../api/nodes";
import type { SymOpts } from "../api/syms";
import type { ArrayTypeMap, Type } from "../api/types";

export function sym<T extends Type>(init: Term<T>): Sym<T>;
export function sym<T extends Type>(type: T): Sym<T>;
export function sym<T extends Type>(type: T, opts: SymOpts): Sym<T>;
export function sym<T extends Type>(type: T, init: Term<T>): Sym<T>;
export function sym<T extends Type>(type: T, id: string): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, id: string, opts: SymOpts): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, opts: SymOpts, init: Term<T>): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, id: string, opts: SymOpts, init: Term<T>): Sym<T>;
export function sym<T extends Type>(type: any, ...xs: any[]): Sym<any> {
    let id: string;
    let opts: SymOpts;
    let init: Term<T>;
    switch (xs.length) {
        case 0:
            if (!isString(type)) {
                init = type;
                type = init.type;
            }
            break;
        case 1:
            if (isString(xs[0])) {
                id = xs[0];
            } else if (xs[0].tag) {
                init = xs[0];
            } else {
                opts = xs[0];
            }
            break;
        case 2:
            if (isString(xs[0])) {
                [id, opts] = xs;
            } else {
                [opts, init] = xs;
            }
            break;
        case 3:
            [id, opts, init] = xs;
            break;
        default:
            illegalArgs();
    }
    return {
        tag: "sym",
        type,
        id: id! || gensym(),
        opts: opts! || {},
        init: init!,
    };
}

export const constSym = <T extends Type>(
    type: T,
    id?: string,
    opts?: SymOpts,
    init?: Term<T>
) => sym(type, id || gensym(), { const: true, ...opts }, init!);

/**
 * Defines a new symbol with optional initial array values.
 *
 * Important: Array initializers are UNSUPPORTED in GLSL ES v1 (WebGL),
 * any code using such initializers will only work under WebGL2 or other
 * targets.
 */
export const arraySym = <T extends keyof ArrayTypeMap>(
    type: T,
    id?: string,
    opts: SymOpts = {},
    init?: (Lit<T> | Sym<T>)[]
): Sym<ArrayTypeMap[T]> => {
    if (init && opts.num == null) {
        opts.num = init.length;
    }
    assert(opts.num != null, "missing array length");
    init &&
        assert(
            opts.num === init.length,
            `expected ${opts.num} items in array, but got ${init.length}`
        );
    const atype = <Type>(type + "[]");
    return <any>{
        tag: "sym",
        type: atype,
        id: id || gensym(),
        opts,
        init: init
            ? {
                  tag: "array_init",
                  type: atype,
                  init,
              }
            : undefined,
    };
};

export const input = <T extends Type>(type: T, id: string, opts?: SymOpts) =>
    sym(type, id, { q: "in", type: "in", ...opts });

export const output = <T extends Type>(type: T, id: string, opts?: SymOpts) =>
    sym(type, id, { q: "out", type: "out", ...opts });

export const uniform = <T extends Type>(type: T, id: string, opts?: SymOpts) =>
    sym(type, id, { q: "in", type: "uni", ...opts });
