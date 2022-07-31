import type { FnAny } from "@thi.ng/api";

export const constantly =
	<T>(x: T): FnAny<T> =>
	() =>
		x;
