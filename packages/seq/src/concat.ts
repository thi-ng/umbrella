import { ensureSeq } from "./ensure";
import type { ISeq, ISeqable, Nullable } from "@thi.ng/api";

/**
 * Returns the concatenation sequence of given nullable
 * {@link @thi,ng/api#ISeq} or {@link @thi.ng/api#ISeqable} values.
 *
 * @param args -
 */
export const concat = <T>(
    ...args: Nullable<ISeq<T> | ISeqable<T>>[]
): ISeq<T> | undefined => {
    const seqs: ISeq<T>[] = [];
    for (let i = 0, n = args.length; i < n; i++) {
        const x = ensureSeq(args[i]);
        x && seqs.push(x);
    }
    const $seq = (curr: Nullable<ISeq<T>>, i: number) => {
        if (!curr) {
            curr = seqs[++i];
        }
        return curr
            ? {
                  first() {
                      return curr!.first();
                  },
                  next() {
                      return $seq(curr!.next(), i);
                  },
              }
            : undefined;
    };
    return $seq(seqs[0], 0);
};

/**
 * Same as {@link concat}, but optimized for nullable arraylike values.
 *
 * @param args -
 */
export const concatA = <T>(...args: Nullable<ArrayLike<T>>[]) => {
    const seqs: ArrayLike<T>[] = [];
    for (let i = 0, n = args.length; i < n; i++) {
        const x = args[i];
        x && x.length && seqs.push(x);
    }
    const $seq = (i: number, j: number): ISeq<T> | undefined => {
        if (!seqs[i] || j >= seqs[i].length) {
            i++;
            j = 0;
        }
        return i < seqs.length
            ? {
                  first() {
                      return seqs[i][j];
                  },
                  next() {
                      return $seq(i, j + 1);
                  },
              }
            : undefined;
    };
    return $seq(0, 0);
};
