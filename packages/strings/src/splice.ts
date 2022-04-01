import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Forms a new strings which inserts given `insert` string into `src`
 * string at `from` position and appends remaining `src` chars from
 * original `to` position. If `from` and `to` are equal (`to` by default
 * is), the operation is a pure insertion. If not, then some chars from
 * `src` will be removed in the new string. If either position is
 * negative, it'll be considered relative to the end of the `src`.
 *
 * @param src -
 * @param insert -
 * @param from -
 * @param to -
 */
export const splice = (
    src: string,
    insert: string,
    from: number,
    to = from
) => {
    if (from < 0) {
        from += src.length;
    }
    if (to < 0) {
        to += src.length;
    }
    if (from > to) {
        illegalArgs("'from' index must be <= 'to'");
    }
    to = Math.max(to, 0);
    return from <= 0
        ? insert + src.substring(to)
        : from >= src.length
        ? src + insert
        : src.substring(0, from) + insert + src.substring(to);
};
