import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { Transducer, TxLike } from "./api.js";

export const ensureTransducer = <A, B>(x: TxLike<A, B>) =>
	implementsFunction(x, "xform") ? x.xform() : <Transducer<A, B>>x;
