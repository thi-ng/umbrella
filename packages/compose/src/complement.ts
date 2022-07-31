import type {
	Fn,
	Fn0,
	Fn2,
	Fn3,
	Fn4,
	Fn5,
	Fn6,
	Fn7,
	Fn8,
	FnAny,
} from "@thi.ng/api";

export function complement(f: Fn0<boolean>): Fn0<boolean>;
export function complement<A>(f: Fn<A, boolean>): Fn<A, boolean>;
export function complement<A, B>(f: Fn2<A, B, boolean>): Fn2<A, B, boolean>;
export function complement<A, B, C>(
	f: Fn3<A, B, C, boolean>
): Fn3<A, B, C, boolean>;
export function complement<A, B, C, D>(
	f: Fn4<A, B, C, D, boolean>
): Fn4<A, B, C, D, boolean>;
export function complement<A, B, C, D, E>(
	f: Fn5<A, B, C, D, E, boolean>
): Fn5<A, B, C, D, E, boolean>;
export function complement<A, B, C, D, E, F>(
	f: Fn6<A, B, C, D, E, F, boolean>
): Fn6<A, B, C, D, E, F, boolean>;
export function complement<A, B, C, D, E, F, G>(
	f: Fn7<A, B, C, D, E, F, G, boolean>
): Fn7<A, B, C, D, E, F, G, boolean>;
export function complement<A, B, C, D, E, F, G, H>(
	f: Fn8<A, B, C, D, E, F, G, H, boolean>
): Fn8<A, B, C, D, E, F, G, H, boolean>;
export function complement(f: FnAny<boolean>) {
	return (...xs: any[]) => !f(...xs);
}
