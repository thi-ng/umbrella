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
