import type { Predicate } from "@thi.ng/api";
import { isPlainObject, isSet } from "@thi.ng/checks";
import type { CharSet, LitParser } from "../api";
import { satisfy, satisfyD } from "./satisfy";

export const noneOfP = (
    opts: string | CharSet | any[] | Set<any>
): Predicate<any> =>
    isSet(opts)
        ? (x) => !opts.has(x)
        : isPlainObject(opts)
        ? (x) => !(<any>opts)[x]
        : (x) => opts.indexOf(x) < 0;

export function noneOf(opts: string | CharSet, id?: string): LitParser<string>;
export function noneOf<T>(opts: T[] | Set<T>, id?: string): LitParser<T>;
export function noneOf(
    opts: string | CharSet | any[] | Set<any>,
    id = "noneOf"
) {
    return satisfy(noneOfP(opts), id);
}

export function noneOfD(opts: string | CharSet): LitParser<string>;
export function noneOfD<T>(opts: T[] | Set<T>): LitParser<T>;
export function noneOfD(opts: string | CharSet | any[] | Set<any>) {
    return satisfyD(noneOfP(opts));
}
