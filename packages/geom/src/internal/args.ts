import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import type { Vec } from "@thi.ng/vectors";
import { vecOf } from "@thi.ng/vectors/vec-of";

/**
 * Takes an array of arguments, checks if last element is a plain object or
 * nullish and if so, removes value from array and returns it (`null` will be
 * cast to `undefined`). Else returns `undefined`.
 *
 * @param args -
 *
 * @internal
 */
export const __argAttribs = (args: any[]) => {
    if (args.length) {
        const last = args[args.length - 1];
        return isPlainObject(last)
            ? args.pop()
            : last == null
            ? (args.pop(), undefined)
            : undefined;
    }
};

/**
 * Args parser for functions expecting up to 2 vector args and optional
 * attribs object. Returns 3-tuple of re-structured args.
 *
 * @param args -
 *
 * @internal
 */
export const __argsVV = (args: any[]) => {
    const attr = __argAttribs(args);
    return args.length
        ? args.length === 2
            ? [args[0], args[1], attr]
            : [undefined, args[0], attr]
        : [undefined, undefined, attr];
};

/**
 * Args parser for functions expecting a vector, numeric and/or optional
 * attribs object. Returns 3-tuple of re-structured args.
 *
 * @param args -
 *
 * @internal
 */
export const __argsVN = (args: any[]) => {
    const attr = __argAttribs(args);
    return args.length
        ? args.length === 2
            ? [args[0], args[1], attr]
            : isNumber(args[0])
            ? [undefined, args[0], attr]
            : [args[0], undefined, attr]
        : [undefined, undefined, attr];
};

export const __asVec = (x: number | Vec, size = 2) =>
    isNumber(x) ? vecOf(size, x) : x;
