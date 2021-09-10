import type { Predicate } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isSet } from "@thi.ng/checks/is-set";
import type { CharSet, LitParser } from "../api";
import { satisfy, satisfyD } from "./satisfy";

/**
 * HOF predicate for matching single char against given options. Returns
 * true if there's no match.
 *
 * @param opts
 */
export const noneOfP = (
    opts: string | CharSet | any[] | Set<any>
): Predicate<any> =>
    isSet(opts)
        ? (x) => !opts.has(x)
        : isPlainObject(opts)
        ? (x) => !(<any>opts)[x]
        : (x) => opts.indexOf(x) < 0;

/**
 * Matches single char against given options and only succeeds if
 * there's no match. Also see {@link oneOf} for reverse logic.
 *
 * @param opts
 * @param id
 */
export function noneOf(opts: string | CharSet, id?: string): LitParser<string>;
export function noneOf<T>(opts: T[] | Set<T>, id?: string): LitParser<T>;
export function noneOf(
    opts: string | CharSet | any[] | Set<any>,
    id = "noneOf"
) {
    return satisfy(noneOfP(opts), id);
}

/**
 * Like {@link noneOf}, but discards result.
 *
 * @param opts
 */
export function noneOfD(opts: string | CharSet): LitParser<string>;
export function noneOfD<T>(opts: T[] | Set<T>): LitParser<T>;
export function noneOfD(opts: string | CharSet | any[] | Set<any>) {
    return satisfyD(noneOfP(opts));
}
