// thing:no-export
import type { NumericArray } from "@thi.ng/api";
import type { IVector } from "@thi.ng/vectors";
import { gvec } from "@thi.ng/vectors/gvec";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { Vec3 } from "@thi.ng/vectors/vec3";
import { Vec4 } from "@thi.ng/vectors/vec4";

/**
 * @param buf -
 * @param size -
 * @param idx -
 * @param stride -
 *
 * @internal
 */
export const wrap = (
	buf: NumericArray,
	size: number,
	idx: number,
	stride: number
): IVector<any> => {
	switch (size) {
		case 2:
			return new Vec2(buf, idx, stride);
		case 3:
			return new Vec3(buf, idx, stride);
		case 4:
			return new Vec4(buf, idx, stride);
		default:
			return gvec(buf, size, idx, stride);
	}
};
