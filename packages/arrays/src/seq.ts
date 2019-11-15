import { ISeq, Nullable } from "@thi.ng/api";

/**
 * Returns a zero-copy {@link @thi.ng/api#ISeq} for the given array and
 * optionally defined index range.
 *
 * @remarks
 * See {@link arrayIterator} for related functionality.
 *
 * @param buf - array
 * @param start - start index
 * @param end - end index (excluded)
 */
export const arraySeq = <T>(
    buf: Nullable<ArrayLike<T>>,
    start = 0,
    end?: number
): ISeq<T> => ({
    first() {
        if (!buf) return;
        end === undefined && (end = buf.length);
        return start < end! ? buf[start] : undefined;
    },
    next() {
        if (!buf) return;
        end === undefined && (end = buf.length);
        const i = start + 1;
        return i < end! ? arraySeq<T>(buf, i, end) : undefined;
    }
});
