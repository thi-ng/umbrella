import { peek } from "@thi.ng/arrays/peek";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";

/**
 * Takes an array of arguments, checks if last element is a plain object
 * and if so, removes it from array and returns it. Else returns
 * `undefined`.
 *
 * @param args -
 *
 * @internal
 */
export const argAttribs = (args: any[]) =>
    isPlainObject(peek(args)) ? args.pop() : undefined;

/**
 * Args parser for functions expecting up to 2 vector args and optional
 * attribs object. Returns 3-tuple of re-structured args.
 *
 * @param args -
 *
 * @internal
 */
export const argsVV = (args: any[]) => {
    const attr = argAttribs(args);
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
export const argsVN = (args: any[]) => {
    const attr = argAttribs(args);
    return args.length
        ? args.length === 2
            ? [args[0], args[1], attr]
            : isNumber(args[0])
            ? [undefined, args[0], attr]
            : [args[0], undefined, attr]
        : [undefined, undefined, attr];
};
