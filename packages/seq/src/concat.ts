import { ISeq, Nullable } from "@thi.ng/api";

export const concat = <T>(...xs: Nullable<ISeq<T>>[]): ISeq<T> | undefined => {
    let i = 0;
    while (i < xs.length && (!xs[i] || xs[i]!.first() === undefined)) {
        i++;
    }
    return i < xs.length
        ? {
              first() {
                  return xs[i]!.first();
              },
              next() {
                  return concat(xs[i]!.next(), ...xs.slice(i + 1));
              }
          }
        : undefined;
};

export const concatA = <T>(...xs: Nullable<ArrayLike<T>>[]) => {
    const $seq = (i: number, j: number): ISeq<T> | undefined => {
        if (xs[i] && j < xs[i]!.length - 1) {
            j++;
        } else {
            do {
                i++;
                j = 0;
            } while (i < xs.length && (!xs[i] || !xs[i]!.length));
        }
        return i < xs.length
            ? {
                  first() {
                      const x = xs[i];
                      return j < x!.length ? x![j] : undefined;
                  },
                  next() {
                      return $seq(i, j);
                  }
              }
            : undefined;
    };
    return $seq(0, 0);
};
