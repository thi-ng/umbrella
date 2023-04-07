import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import type { Attribs, IShape } from "@thi.ng/geom-api";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { ff } from "@thi.ng/hiccup-svg/format";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { serialize } from "@thi.ng/hiccup/serialize";
import { bounds } from "./bounds.js";
import { __collBounds } from "./internal/bounds.js";

/**
 * Can be overridden via {@link setSvgDefaultAttribs}.
 */
export let DEFAULT_ATTRIBS: Attribs = { fill: "none", stroke: "#000" };

/**
 * Sets the SVG root element attribs used by default by {@link svgDoc}.
 *
 * @param attribs
 */
export const setSvgDefaultAttribs = (attribs: Attribs) => {
	DEFAULT_ATTRIBS = attribs;
};

/**
 * Serializes given hiccup tree to an actual SVG source string.
 *
 * @param args
 */
export const asSvg = (...args: any[]) =>
	args.map((x) => serialize(convertTree(x))).join("");

/**
 * Creates a hiccup SVG doc element container for given {@link IShape}s and
 * attribs (merged with {@link DEFAULT_ATTRIBS}). If the attribs do not include
 * a `viewBox`, it will be computed automatically. Furthermore (and only for the
 * case a viewbox needs to be computed), a `__bleed` attrib can be provided to
 * include a bleed/margin for the viewbox (in world space units).
 *
 * @remarks
 * Use {@link asSvg} to serialize the resulting doc to an SVG string.
 *
 * The actual serialization is performed via the
 * [thi.ng/hiccup](https://thi.ng/hiccup) and
 * [thi.ng/hiccup-svg](https://thi.ng/hiccup-svg) packages. Floating point
 * precision for various point coordinates can be controlled via the `__prec`
 * attribute (number of fractional digits), either for the entire doc or on a
 * per-shape basis. If omitted, the currently configured precision will be used
 * (default: 3).
 *
 * Also see
 * [`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
 * and
 * [`setPrecision()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/setPrecision.html).
 *
 * @param attribs
 * @param xs
 */
export const svgDoc = (attribs: Attribs, ...xs: IShape[]) => {
	attribs = { ...DEFAULT_ATTRIBS, ...attribs };
	if (xs.length > 0) {
		if (!attribs.viewBox) {
			const cbounds = __collBounds(xs, bounds);
			if (cbounds) {
				const [[x, y], [w, h]] = cbounds;
				const bleed = attribs.__bleed || 0;
				const bleed2 = 2 * bleed;
				const width = ff(w + bleed2);
				const height = ff(h + bleed2);
				attribs = {
					width,
					height,
					viewBox: `${ff(x - bleed)} ${ff(
						y - bleed
					)} ${width} ${height}`,
					...withoutKeysObj(attribs, ["__bleed"]),
				};
			}
		}
	}
	return svg(attribs, ...xs);
};
