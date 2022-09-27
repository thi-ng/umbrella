import type { ArrayLikeIterable, Fn3, FnN2, ILength } from "@thi.ng/api";

export interface Color extends Iterable<number>, ILength {
	[id: number]: number;
}

export type ReadonlyColor = ArrayLikeIterable<number>;

export type BlendFnF = Fn3<Color | null, ReadonlyColor, ReadonlyColor, Color>;

export type BlendFnI = FnN2;
