import { implementsFunction } from "@thi.ng/checks";
import type { IXform, Transducer, TxLike } from "../api";

export const ensureTransducer = <A, B>(x: TxLike<A, B>) =>
    implementsFunction(x, "xform")
        ? (<IXform<A, B>>x).xform()
        : <Transducer<A, B>>x;
