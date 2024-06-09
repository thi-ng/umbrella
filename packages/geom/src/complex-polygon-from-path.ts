import type { Attribs, SamplingOpts } from "./api.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import type { Path } from "./api/path.js";
import { asPolygon } from "./as-polygon.js";

/**
 * Converts given path into a {@link ComplexPolygon}, using `opts` to control
 * the conversion (via {@link asPolygon}). If no new `attribs` are given, those
 * of the path will be used (shallow copy).
 *
 * @param path
 * @param opts
 * @param attribs
 */
export const complexPolygonFromPath = (
	path: Path,
	opts?: number | Partial<SamplingOpts>,
	attribs?: Attribs
) => {
	const [boundary, ...children] = asPolygon(path, opts);
	return new ComplexPolygon(boundary, children, attribs || boundary.attribs);
};
