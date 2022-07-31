import type { Fn0 } from "@thi.ng/api";

export function* repeatedly<T>(fn: Fn0<T>, n = Infinity) {
	while (n-- > 0) {
		yield fn();
	}
}
