import type { IGrid2D, NumericArray, TypedArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { BlendFnF, BlendFnI, ReadonlyColor } from "@thi.ng/porter-duff";
import {
	porterDuffP,
	porterDuffPInt,
	SRC_OVER_F,
	SRC_OVER_I,
} from "@thi.ng/porter-duff/porter-duff";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Shader2D } from "./api.js";

export const defPattern = <T extends any[] | TypedArray, P>(
	pattern: IGrid2D<T, P>
): Shader2D<P> => {
	const [w, h] = pattern.size;
	return (_, x, y) => pattern.getAtUnsafe(x % w, y % h);
};

export interface StripeShaderOpts<T> {
	dir: "h" | "v" | "d";
	size: number;
	sizeA: number;
	a: T;
	b: T;
}

export const defStripes = <T = number>({
	dir,
	size,
	sizeA,
	a,
	b,
}: StripeShaderOpts<T>): Shader2D<T> =>
	dir === "h"
		? (_, x) => (x % size < sizeA ? a : b)
		: dir === "v"
		? (_, __, y) => (y % size < sizeA ? a : b)
		: (_, x, y) => ((x + y) % size < sizeA ? a : b);

export interface RandomShaderOpts<T> {
	probability?: number;
	rnd?: IRandom;
	a: T;
	b: T;
}

export const defNoise = <T = number>(
	opts: RandomShaderOpts<T>
): Shader2D<T> => {
	const { probability, rnd, a, b } = {
		probability: 0.5,
		rnd: SYSTEM,
		...opts,
	};
	return () => (rnd.probability(probability) ? a : b);
};

/**
 * Defines a shader (for floating point target buffers) which blends given color
 * (or another shader) with a Porter-Duff operator. Unless `isPremultiplied` is
 * true, both the given color and existing pixel values in the target buffer are
 * considered non-premultiplied.
 *
 * @remarks
 * The default PD blend op is `SRC_OVER_I`. See
 * [@thi.ng/porter-duff](https://thi.ng/porter-duff) for more info.
 *
 * See {@link defBlendI} for integer based buffers.
 *
 * @param col
 * @param blend
 * @param isPremultiplied
 */
export const defBlendF = (
	col: ReadonlyColor | Shader2D<NumericArray>,
	blend: BlendFnF = SRC_OVER_F,
	isPremultiplied = false
): Shader2D<NumericArray> => {
	blend = isPremultiplied ? blend : porterDuffP(blend);
	return isFunction(col)
		? (buf, x, y) => {
				const dest = buf.getAtUnsafe(x, y);
				return <NumericArray>blend(dest, col(buf, x, y), dest);
		  }
		: (buf, x, y) => {
				const dest = buf.getAtUnsafe(x, y);
				return <NumericArray>blend(dest, col, dest);
		  };
};

/**
 * Similar to {@link defBlendF}, but for integer based target buffers. Defines a
 * shader which blends given color (or another shader) with a Porter-Duff
 * operator. Unless `isPremultiplied` is true, both the given color and existing
 * pixel values in the target buffer are considered non-premultiplied.
 *
 * @remarks
 * The default PD blend op is `SRC_OVER_I`. See
 * [@thi.ng/porter-duff](https://thi.ng/porter-duff) for more info.
 *
 * @param col
 * @param blend
 * @param isPremultiplied
 */
export const defBlendI = (
	col: number | Shader2D<number>,
	blend: BlendFnI = SRC_OVER_I,
	isPremultiplied = false
): Shader2D<number> => {
	blend = isPremultiplied ? blend : porterDuffPInt(blend);
	return isFunction(col)
		? (buf, x, y) => blend(col(buf, x, y), buf.getAtUnsafe(x, y))
		: (buf, x, y) => blend(col, buf.getAtUnsafe(x, y));
};
