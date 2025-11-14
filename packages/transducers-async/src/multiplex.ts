// SPDX-License-Identifier: Apache-2.0
import { juxtAsync } from "@thi.ng/compose";
import type { AsyncMultiplexTxLike, AsyncTransducer } from "./api.js";
import { map } from "./map.js";
import { step } from "./step.js";

export function multiplex<T, A>(
	a: AsyncMultiplexTxLike<T, A>
): AsyncTransducer<T, [A]>;
export function multiplex<T, A, B>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>
): AsyncTransducer<T, [A, B]>;
export function multiplex<T, A, B, C>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>
): AsyncTransducer<T, [A, B, C]>;
export function multiplex<T, A, B, C, D>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>,
	d: AsyncMultiplexTxLike<T, D>
): AsyncTransducer<T, [A, B, C, D]>;
export function multiplex<T, A, B, C, D, E>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>,
	d: AsyncMultiplexTxLike<T, D>,
	e: AsyncMultiplexTxLike<T, E>
): AsyncTransducer<T, [A, B, C, D, E]>;
export function multiplex<T, A, B, C, D, E, F>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>,
	d: AsyncMultiplexTxLike<T, D>,
	e: AsyncMultiplexTxLike<T, E>,
	f: AsyncMultiplexTxLike<T, F>
): AsyncTransducer<T, [A, B, C, D, E, F]>;
export function multiplex<T, A, B, C, D, E, F, G>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>,
	d: AsyncMultiplexTxLike<T, D>,
	e: AsyncMultiplexTxLike<T, E>,
	f: AsyncMultiplexTxLike<T, F>,
	g: AsyncMultiplexTxLike<T, G>
): AsyncTransducer<T, [A, B, C, D, E, F, G]>;
export function multiplex<T, A, B, C, D, E, F, G, H>(
	a: AsyncMultiplexTxLike<T, A>,
	b: AsyncMultiplexTxLike<T, B>,
	c: AsyncMultiplexTxLike<T, C>,
	d: AsyncMultiplexTxLike<T, D>,
	e: AsyncMultiplexTxLike<T, E>,
	f: AsyncMultiplexTxLike<T, F>,
	g: AsyncMultiplexTxLike<T, G>,
	h: AsyncMultiplexTxLike<T, H>
): AsyncTransducer<T, [A, B, C, D, E, F, G, H]>;
export function multiplex(...args: any[]) {
	return map(
		juxtAsync.apply(
			null,
			<any>(
				args.map((xf) =>
					Array.isArray(xf) ? step(xf[0], xf[1]) : step(xf)
				)
			)
		)
	);
}
