import type { ArrayLikeIterable, ILength } from "@thi.ng/api";

export interface Color extends Iterable<number>, ILength {
	[id: number]: number;
}

export type ReadonlyColor = ArrayLikeIterable<number>;
