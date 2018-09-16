import { SVG_NS, XLINK_NS } from "@thi.ng/hiccup/api";

/**
 * Defines an <svg> root element with default XML namespaces. By default
 * currently still sets SVG version to 1.1 to support Safari and other
 * legacy tooling.
 *
 * @param attribs
 * @param body
 */
export const svg = (attribs: any, ...body: any[]): any[] =>
    ["svg", {
        version: "1.1",
        xmlns: SVG_NS,
        "xmlns:xlink": XLINK_NS,
        ...attribs
    }, ...body];
