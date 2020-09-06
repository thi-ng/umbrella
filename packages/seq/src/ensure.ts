import type { ISeq, ISeqable, Nullable } from "@thi.ng/api";
import { implementsFunction, isArrayLike } from "@thi.ng/checks";
import { aseq } from "./array";

export const isSeq = (x: any): x is ISeq<any> =>
    implementsFunction(x, "first") && implementsFunction(x, "next");

export const isSeqable = (x: any): x is ISeqable<any> =>
    implementsFunction(x, "seq");

export const ensureSeq = <T>(
    x: Nullable<ISeq<T> | ISeqable<T> | ArrayLike<T>>
) =>
    implementsFunction(x, "seq")
        ? (<ISeqable<T>>x).seq()
        : isArrayLike(x)
        ? aseq(x)
        : x != null
        ? <ISeq<T>>x
        : undefined;
