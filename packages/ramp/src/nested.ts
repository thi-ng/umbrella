import type { Keys } from "@thi.ng/api";
import type { RampImpl } from "./api.js";

export type NestedImpl<T extends Record<string, any>> = {
	[P in keyof T]: RampImpl<T[P]>;
};

export const nested = <T extends Record<string, any>>(
	children: NestedImpl<T>
): RampImpl<T> => {
	const pairs = Object.entries(children);
	return {
		min: (acc, x) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[<Keys<T>>id] = impl.min(acc[id], x[id]);
				return acc;
			}, acc || <T>{}),
		max: (acc, x) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[<Keys<T>>id] = impl.max(acc[id], x[id]);
				return acc;
			}, acc || <T>{}),
		at: (stops, index, t) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[<Keys<T>>id] = impl.at(
					stops.map((x) => [x[0], x[1][id]]),
					index,
					t
				);
				return acc;
			}, <T>{}),
	};
};
