import type { IObjectOf, NumOrString } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

const TPL = /\{(\d+)\}/g;
const TPL_K = /\{([a-z0-9_.-]+)\}/gi;

/**
 * Takes a string template with embedded `{number}` style terms and any
 * number of args. Replaces numbered terms with their respective args
 * given.
 *
 * @example
 * ```ts
 * interpolate("let {0}: {2} = {1};", "a", 42, "number")
 * // "let a: number = 42;"
 * ```
 *
 * @param src - 
 * @param args - 
 */
export const interpolate = (src: string, ...args: any[]) =>
    args.length > 0
        ? src.replace(TPL, (_, id) => String(args[parseInt(id, 10)]))
        : src;

/**
 * Similar to {@link interpolate}, but uses alphanumeric placeholders in the
 * template string and an object of values for the stated keys.
 *
 * @example
 * ```ts
 * interpolateKeys(
 *   "let {id}: {type} = {val};",
 *   { id: "a", type: "number", val: 42 }
 * )
 * // "let a: number = 42;"
 * ```
 *
 * @param src - 
 * @param keys - 
 */
export const interpolateKeys = (src: string, keys: IObjectOf<NumOrString>) =>
    src.replace(TPL_K, (_, id) =>
        keys[id] != undefined
            ? String(keys[id])
            : illegalArgs(`missing key: ${id}`)
    );
