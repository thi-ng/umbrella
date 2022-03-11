import { isFunction } from "@thi.ng/checks/is-function";
import type { Stringer } from "@thi.ng/strings";
import { float, floatFixedWidth } from "@thi.ng/strings/float";
import type { ToStringOpts } from "./api.js";

/**
 * Returns a new generic vector formatter for given options (all optional). The
 * returned function accepts a single vector(like) value and returns its
 * formatted string representation.
 *
 * @remarks
 * See {@link ToStringOpts} for further details. Also see {@link setFormat} to
 * set default formatter.
 *
 * @example
 * ```ts
 * defFormat()([1, -2, 3])
 * // [1.000, -2.000, 3.000]
 *
 * defFormat({ width: 10, wrap: "||", delim: "|\n|" })([1, -2, 3])
 * // |     1.000|
 * // |    -2.000|
 * // |     3.000|
 *
 * defFormat({ prec: 5, delim: " " })([1, -2, 3])
 * // [1.00000 -2.00000 3.00000]
 * ```
 *
 * @param prec - 
 * @param width - 
 */
export const defFormat = (
    opts?: Partial<ToStringOpts>
): Stringer<Iterable<number>> => {
    const { prec, width, delim, wrap } = {
        prec: 3,
        delim: ", ",
        wrap: "[]",
        ...opts,
    };
    const fmt = width ? floatFixedWidth(width, prec) : float(prec);
    return (src) => {
        let res: string[] = [];
        for (let x of src) res.push(fmt(x));
        return `${wrap[0]}${res.join(delim)}${wrap[1]}`;
    };
};

/**
 * Sets package-wide default vector formatter. See {@link defFormat},
 * {@link FORMATTER}.
 *
 * @param fmt - 
 */
export const setFormat = (
    fmt: Stringer<Iterable<number>> | Partial<ToStringOpts>
) => {
    FORMATTER = isFunction(fmt) ? fmt : defFormat(fmt);
};

/**
 * Package-wide default vector formatter.
 */
export let FORMATTER: Stringer<Iterable<number>> = defFormat();
