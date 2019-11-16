import { ISeq, Nullable } from "@thi.ng/api";

/**
 * Converts given seq into an ES6 iterable.
 *
 * @param seq
 */
export function* iterator<T>(seq: Nullable<ISeq<T>>) {
    while (seq) {
        yield seq.first()!;
        seq = seq.next();
    }
}
