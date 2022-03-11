import type { Attribs, IShape } from "@thi.ng/geom-api";
import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { ff } from "@thi.ng/hiccup-svg/format";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { serialize } from "@thi.ng/hiccup/serialize";
import { bounds } from "./bounds.js";
import { __collBounds } from "./internal/bounds.js";

export const asSvg = (...args: any[]) =>
    args.map((x) => serialize(convertTree(x))).join("");

/**
 * Creates a hiccup SVG doc element for given {@link IShape}s and attribs. If
 * the attribs do not include a `viewBox`, it will be computed automatically.
 * Furthermore (and only for the case a viewbox needs to be computed), a `bleed`
 * attrib can be provided to include a bleed/margin for the viewbox.
 *
 * @remarks
 * Use {@link asSvg} to serialize the resulting doc to an SVG string.
 *
 * @param attribs
 * @param xs
 */
export const svgDoc = (attribs: Attribs, ...xs: IShape[]) => {
    if (xs.length > 0) {
        if (!attribs.viewBox) {
            const cbounds = __collBounds(xs, bounds);
            if (cbounds) {
                const [[x, y], [w, h]] = cbounds;
                const bleed = attribs.bleed || 0;
                const bleed2 = 2 * bleed;
                const width = ff(w + bleed2);
                const height = ff(h + bleed2);
                attribs = {
                    width,
                    height,
                    viewBox: `${ff(x - bleed)} ${ff(
                        y - bleed
                    )} ${width} ${height}`,
                    ...withoutKeysObj(attribs, ["bleed"]),
                };
            }
        }
    }
    return svg(attribs, ...xs);
};
