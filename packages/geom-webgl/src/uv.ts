import { Rect } from "@thi.ng/geom/api/rect";
import { bounds } from "@thi.ng/geom/bounds";
import { __ensurePCLike } from "@thi.ng/geom/internal/pclike";
import { mapPoint } from "@thi.ng/geom/map-point";
import { warpPoint } from "@thi.ng/geom/warp-points";
import type { UVGen } from "./api.js";

/**
 * UV coordinate generator. Generates coordinates `[x,0]` where `x` is
 * the normalized vertex index x=id/num, with `num` being the number of
 * points/vertices in the shape/curve.
 *
 * @param shape
 */
export const generateUVPointIndex: UVGen = (shape) => {
	const num = __ensurePCLike(shape).points.length - 1;
	return (_, i) => [i / num, 0];
};

/**
 * Higher-order UV coordinate generator. Maps 2D shape vertices into the given
 * target UV rect (by default full [0,1] range), using the shape's bounding
 * rect.
 *
 * @remarks
 * The custom `uvRect` target is useful for working with texture atlases.
 *
 * @param uvRect
 */
export const generateUVBounds2 =
	(uvRect?: Rect): UVGen =>
	(shape) => {
		const bbox = bounds(shape)!;
		return uvRect
			? (p) => warpPoint(p, uvRect, bbox)
			: (p) => mapPoint(bbox, p);
	};
