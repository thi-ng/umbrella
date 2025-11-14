// SPDX-License-Identifier: Apache-2.0
import type { NumOrString } from "@thi.ng/api";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { ff } from "@thi.ng/hiccup-svg/format";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { serialize } from "@thi.ng/hiccup/serialize";
import { withoutKeysObj } from "@thi.ng/object-utils/without-keys";
import type { Attribs, IShape } from "./api.js";
import { bounds } from "./bounds.js";
import { __collBounds } from "./internal/bounds.js";

export interface SVGDocAttribs extends Attribs {
	/**
	 * SVG viewBox attribute. If not given, {@link svgDoc} will attempt to
	 * compute the view box automatically, incl. optional
	 * {@link SVGDocAttribs.__margin}.
	 */
	viewBox: string;
	width: NumOrString;
	height: NumOrString;
	/**
	 * Only used if no {@link SVGDocAttribs.viewBox} is given. Margin
	 * width to add on all sides of the computed view box.
	 *
	 * @defaultValue 0
	 */
	__margin: number;
	/**
	 * Number of fractional digits for floating point values.
	 *
	 * @defaultValue 3
	 */
	__prec: number;
	/**
	 * Marker flag for thi.ng/hiccup-svg to indicate enclosed hiccup needs to be
	 * converted from the compact format used by thi.ng/geom.
	 *
	 * Note: The {@link asSvg} function explicitly converts the given hiccup,
	 * therefore the {@link SVG_DEFAULT_ATTRIBS} do NOT specify this flag to
	 * avoid double conversion. However, if you wish to serialize a
	 * {@link svgDoc} document via other means (e.g. directly via
	 * thi.ng/hiccup's `serialize()`), then you should enable this flag
	 * manually.
	 *
	 * @remarks
	 * External references:
	 *
	 * - [`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
	 * - [`svg()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/svg.html)
	 * - [`serialize()`](https://docs.thi.ng/umbrella/hiccup/functions/serialize.html)
	 */
	__convert: boolean;
}

/**
 * Default document attribs for {@link svgDoc} (minus XMLNS declarations). Can
 * be overridden via {@link setSvgDefaultAttribs}.
 */
export let SVG_DEFAULT_ATTRIBS: Partial<SVGDocAttribs> = {
	__prec: 3,
	fill: "none",
	stroke: "#000",
};

/**
 * Sets the SVG root element attribs used by default by {@link svgDoc}. If
 * `merge` is true, the given attribs will be merged with the existing ones
 * (rather than replacing completely).
 *
 * @param attribs
 * @param merge
 */
export const setSvgDefaultAttribs = (
	attribs: Partial<SVGDocAttribs>,
	merge = false
) => {
	SVG_DEFAULT_ATTRIBS = merge
		? { ...SVG_DEFAULT_ATTRIBS, ...attribs }
		: attribs;
};

/**
 * Serializes given hiccup tree to an actual SVG source string. The given hiccup
 * arguments are first converted via
 * [`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
 *
 * @remarks
 * The actual serialization is performed via the
 * [thi.ng/hiccup](https://thi.ng/hiccup) and
 * [thi.ng/hiccup-svg](https://thi.ng/hiccup-svg) packages. Floating point
 * precision for various point coordinates can be controlled via the
 * {@link SVGDocAttribs.__prec} attribute, either for the entire doc or on a
 * per-shape basis. If omitted, the currently configured precision will be used
 * (default: 3).
 *
 * @param args
 */
export const asSvg = (...args: any[]) =>
	args.map((x) => serialize(convertTree(x))).join("");

/**
 * Creates a hiccup SVG doc element container for given {@link IShape}s and
 * attribs (merged with {@link SVG_DEFAULT_ATTRIBS}). If the attribs do not
 * include a {@link SVGDocAttribs.viewBox}, it will be computed automatically.
 * Furthermore (and only for the case a viewbox needs to be computed), a
 * {@link SVGDocAttribs.__margin} attrib can be provided to include a
 * bleed/margin for the viewbox (in world space units).
 *
 * @remarks
 * Use {@link asSvg} to serialize the resulting doc to an SVG string.
 *
 * References:
 *
 * - [`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
 * - [`setPrecision()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/setPrecision.html)
 *
 * @param attribs
 * @param shapes
 */
export const svgDoc = (
	attribs: Partial<SVGDocAttribs>,
	...shapes: IShape[]
) => {
	let $attribs = { ...SVG_DEFAULT_ATTRIBS, ...attribs };
	if (shapes.length > 0) {
		if (!$attribs.viewBox) {
			const cbounds = __collBounds(shapes, bounds);
			if (cbounds) {
				const [[x, y], [w, h]] = cbounds;
				const margin = $attribs.__margin || 0;
				const width = ff(w + 2 * margin);
				const height = ff(h + 2 * margin);
				$attribs = {
					width,
					height,
					viewBox: `${ff(x - margin)} ${ff(
						y - margin
					)} ${width} ${height}`,
					...withoutKeysObj($attribs, ["__margin"]),
				};
			}
		}
	}
	return svg($attribs, ...shapes);
};
