// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable, Nullable } from "@thi.ng/api";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";

export const cat =
	<T>(): AsyncTransducer<Nullable<MaybeAsyncIterable<T>>, T> =>
	(rfn: AsyncReducer<T, any>) => {
		const r = rfn[2];
		return compR(rfn, async (acc, x: Nullable<MaybeAsyncIterable<T>>) => {
			if (x != null) {
				for await (let y of x) {
					acc = await r(acc, y);
					if (isReduced(acc)) return acc.deref();
				}
			}
			return acc;
		});
	};
