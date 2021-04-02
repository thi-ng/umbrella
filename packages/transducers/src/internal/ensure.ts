import { implementsFunction } from "@thi.ng/checks";
import type { Transducer, TxLike } from "../api";

export const ensureTransducer = <A, B>(x: TxLike<A, B>) =>
    implementsFunction(x, "xform") ? x.xform() : <Transducer<A, B>>x;
