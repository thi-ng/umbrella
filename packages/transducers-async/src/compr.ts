// SPDX-License-Identifier: Apache-2.0
import type { AsyncReducer, AsyncReduction } from "./api.js";

export const compR = <A, B, C>(
	rfn: AsyncReducer<B, C>,
	fn: AsyncReduction<A, C>
): AsyncReducer<A, C> => [rfn[0], rfn[1], fn];
