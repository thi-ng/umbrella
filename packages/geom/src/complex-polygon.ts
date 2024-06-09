import type { Attribs } from "./api.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Polygon } from "./api/polygon.js";

/**
 * Creates a {@link ComplexPolygon} instance from given `boundary` and `child`
 * polygons (the latter are assumed non-overlapping holes and will be
 * interpreted as such).
 *
 * @remarks
 * Child polygons are considered holes and fully enclosed by the boundary poly.
 * Depending on usage, holes should also have the opposite vertex order (e.g.
 * via {@link flip}) than the boundary. This is not enforced automatically and
 * the user's responsibility.
 *
 * Any attribs on `boundary` or `children` will be ignored, only those given as
 * `attribs` will be used.
 *
 * @param boundary
 * @param children
 * @param attribs
 */
export const complexPolygon = (
	boundary?: Polygon,
	children?: Iterable<Polygon>,
	attribs?: Attribs
) => new ComplexPolygon(boundary, children, attribs);
