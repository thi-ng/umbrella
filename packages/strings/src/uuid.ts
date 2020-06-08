import { U8 } from "./radix";

/**
 * Returns UUID formatted string of given byte array from optional start
 * index `i` (default: 0). Array must have min. length 16.
 *
 * @param id
 * @param i
 */
export const uuid = (id: ArrayLike<number>, i = 0) =>
    [
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
        "-",
        U8(id[i++]),
        U8(id[i++]),
        "-",
        U8(id[i++]),
        U8(id[i++]),
        "-",
        U8(id[i++]),
        U8(id[i++]),
        "-",
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
        U8(id[i++]),
    ].join("");
