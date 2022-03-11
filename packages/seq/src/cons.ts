import type { ISeq } from "@thi.ng/api";

/**
 * Returns a new `ISeq` with `head` prepended to (optional) `seq`.
 *
 * @param head - 
 * @param seq - 
 */
export const cons = <T>(head: T, seq?: ISeq<T>): ISeq<T> => ({
    first() {
        return head;
    },
    next() {
        return seq;
    },
});
