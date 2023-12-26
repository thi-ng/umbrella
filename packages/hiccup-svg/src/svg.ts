import { XML_INKSCAPE, XML_SVG, XML_XLINK } from "@thi.ng/prefixes/xml";
import { convertTree } from "./convert.js";
import { fattribs } from "./format.js";

/**
 * Defines an <svg> root element with default XML namespaces. By default
 * currently still defaults to SVG version to 1.1 to support Safari and other
 * legacy tooling (can be overridden).
 *
 * @remarks
 * If the `__convert` boolean attrib is enabled, all body elements will be
 * automatically converted using {@link convertTree}. The `__convert` attrib
 * will be removed afterward and is NOT going to be serialized in the final
 * output.
 *
 * The root `<svg>` element will contain XML namespace declarations for these
 * namespaces:
 *
 * - [svg (default NS)](https://docs.thi.ng/umbrella/prefixes/variables/XML_SVG.html)
 * - [`xmlns:inkscape`](https://docs.thi.ng/umbrella/prefixes/variables/XML_INKSCAPE.html)
 * - [`xmlns:xlink`](https://docs.thi.ng/umbrella/prefixes/variables/XML_XLINK.html)
 *
 * @param attribs - attributes object
 * @param body - shape primitives
 */
export const svg = (attribs: any, ...body: any[]): any[] => {
	attribs = fattribs(
		{
			version: "1.1",
			xmlns: XML_SVG,
			"xmlns:xlink": XML_XLINK,
			"xmlns:inkscape": XML_INKSCAPE,
			...attribs,
		},
		"width",
		"height",
		"stroke-width"
	);
	if (attribs.__convert) {
		delete attribs.__convert;
		body = body.map(convertTree);
	}
	return ["svg", attribs, ...body];
};
