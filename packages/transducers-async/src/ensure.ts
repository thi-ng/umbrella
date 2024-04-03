import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { AsyncTransducer, AsyncTxLike } from "./api.js";

export const ensureAsyncTransducer = <A, B>(x: AsyncTxLike<A, B>) =>
	implementsFunction(x, "xformAsync")
		? x.xformAsync()
		: <AsyncTransducer<A, B>>x;
