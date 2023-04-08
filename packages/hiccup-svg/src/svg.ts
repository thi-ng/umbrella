import { XML_SVG, XML_XLINK } from "@thi.ng/prefixes/xml";
import { convertTree } from "./convert.js";
import { fattribs } from "./format.js";

/**
 * Defines an <svg> root element with default XML namespaces. By default
 * currently still defaults to SVG version to 1.1 to support Safari and other
 * legacy tooling.
 *
 * @remarks
 * If the `__convert` boolean attrib is enabled, all body elements will be
 * automatically converted using {@link convertTree}. The `__convert` attrib
 * will be removed afterward and is NOT going to be serialized in the final
 * output.
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
