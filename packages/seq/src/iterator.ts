import type { ISeq, ISeqable, Nullable } from "@thi.ng/api";
import { ensureSeq } from "./ensure";

/**
 * Yields an ES6 iterable for given seq or seqable.
 *
 * @param src -
 */
export function* iterator<T>(
    src: Nullable<ISeq<T> | ISeqable<T> | ArrayLike<T>>
) {
    let seq = ensureSeq(src);
    while (seq) {
        yield seq.first()!;
        seq = seq.next();
    }
}
