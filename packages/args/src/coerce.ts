import type { Fn } from "@thi.ng/api";
import { isHex } from "@thi.ng/checks/is-hex";
import { isNumericFloat, isNumericInt } from "@thi.ng/checks/is-numeric";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { KVDict, KVMultiDict, Tuple } from "./api.js";

export const coerceString = (x: string) => x;

export const coerceFloat = (x: string) =>
    isNumericFloat(x)
        ? parseFloat(x)
        : illegalArgs(`not a numeric value: ${x}`);

export const coerceFloats = (xs: string[]) => xs.map(coerceFloat);

export const coerceHexInt = (x: string) =>
    isHex(x) ? parseInt(x, 16) : illegalArgs(`not a hex value: ${x}`);

export const coerceHexInts = (xs: string[]) => xs.map(coerceHexInt);

export const coerceInt = (x: string) =>
    isNumericInt(x) ? parseInt(x) : illegalArgs(`not an integer: ${x}`);

export const coerceInts = (xs: string[]) => xs.map(coerceInt);

export const coerceJson = <T>(x: string): T => JSON.parse(x);

export const coerceOneOf =
    <K extends string>(xs: readonly K[]) =>
    (x: string) =>
        xs.includes(<K>x) ? <K>x : illegalArgs(`invalid option: ${x}`);

export function coerceKV(
    delim?: string,
    strict?: boolean,
    multi?: false
): Fn<string[], KVDict>;
export function coerceKV(
    delim?: string,
    strict?: boolean,
    multi?: true
): Fn<string[], KVMultiDict>;
export function coerceKV(delim = "=", strict = false, multi = false) {
    return (pairs: string[]) =>
        pairs.reduce((acc, x) => {
            const idx = x.indexOf(delim);
            strict &&
                idx < 1 &&
                illegalArgs(
                    `got '${x}', but expected a 'key${delim}value' pair`
                );
            if (idx > 0) {
                const id = x.substring(0, idx);
                const val = x.substring(idx + 1);
                if (multi) {
                    acc[id] ? (<string[]>acc[id]).push(val) : (acc[id] = [val]);
                } else {
                    acc[id] = val;
                }
            } else {
                acc[x] = multi ? ["true"] : "true";
            }
            return acc;
        }, <any>{});
}

export const coerceTuple =
    <T>(coerce: Fn<string, T>, size: number, delim = ",") =>
    (src: string) => {
        const parts = src.split(delim);
        parts.length !== size &&
            illegalArgs(`got '${src}', but expected a tuple of ${size} values`);
        return new Tuple(parts.map(coerce));
    };
