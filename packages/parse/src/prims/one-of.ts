import type { Predicate } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isSet } from "@thi.ng/checks/is-set";
import type { CharSet, LitParser } from "../api.js";
import { satisfy, satisfyD } from "./satisfy.js";

/**
 * HOF predicate for matching single char against given options.
 *
 * @param opts - 
 */
export const oneOfP = (
    opts: string | any[] | Set<any> | CharSet
): Predicate<any> =>
    isSet(opts)
        ? (x) => opts.has(x)
        : isPlainObject(opts)
        ? (x) => (<any>opts)[x]
        : (x) => opts.indexOf(x) >= 0;

/**
 * Matches single char against given options. Also see {@link noneOf}
 * for reverse logic.
 *
 * @param opts - 
 * @param id - 
 */
export function oneOf(opts: string | CharSet, id?: string): LitParser<string>;
export function oneOf<T>(opts: T[] | Set<T>, id?: string): LitParser<T>;
export function oneOf(opts: string | CharSet | any[] | Set<any>, id = "oneOf") {
    return satisfy(oneOfP(opts), id);
}

/**
 * Like {@link oneOf}, but discards result.
 *
 * @param opts - 
 */
export function oneOfD(opts: string | CharSet): LitParser<string>;
export function oneOfD<T>(opts: T[] | Set<T>): LitParser<T>;
export function oneOfD(opts: string | CharSet | any[] | Set<any>) {
    return satisfyD(oneOfP(opts));
}
