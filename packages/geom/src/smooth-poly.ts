import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Attribs, CubicOpts, SamplingOpts } from "./api.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { asPath, type AsPathOpts } from "./as-path.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";

/**
 * Creates a new polygon from given initial `points` and optional `attribs`. The
 * polygon is then first converted into a cubic path using `pathOpts` and then
 * back into a polygon by sampling the path using `polyOpts`. Returns that final
 * polygon result.
 *
 * @param points
 * @param attribs
 * @param pathOpts
 * @param polyOpts
 */
export const smoothPolygon = (
	points: ReadonlyVec[],
	attribs?: Attribs,
	pathOpts?: Partial<CubicOpts>,
	polyOpts?: Partial<SamplingOpts>
) => asPolygon(asPath(new Polygon(points, attribs), pathOpts), polyOpts)[0];

/**
 * Like {@link smoothPolygon}, but for polylines.
 *
 * @param points
 * @param attribs
 * @param pathOpts
 * @param polyOpts
 */
export const smoothPolyline = (
	points: ReadonlyVec[],
	attribs?: Attribs,
	pathOpts?: Partial<AsPathOpts>,
	polyOpts?: Partial<SamplingOpts>
) => asPolyline(asPath(new Polyline(points, attribs), pathOpts), polyOpts)[0];
