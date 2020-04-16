import { isSet } from "@thi.ng/checks";
import type { Parser } from "../api";
import { satisfy } from "./satisfy";

export function oneOf(opts: string, id?: string): Parser<string>;
export function oneOf<T>(opts: T[], id?: string): Parser<T>;
export function oneOf<T>(opts: Set<T>, id?: string): Parser<T>;
export function oneOf(
    opts: string | any[] | Set<any>,
    id = "oneOf"
): Parser<any> {
    return satisfy(
        isSet(opts) ? (x) => opts.has(x) : (x) => opts.indexOf(x) >= 0,
        id
    );
}
