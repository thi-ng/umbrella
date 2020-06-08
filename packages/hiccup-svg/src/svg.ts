import { SVG_NS, XLINK_NS } from "@thi.ng/hiccup";
import { fattribs } from "./format";

/**
 * Defines an <svg> root element with default XML namespaces. By default
 * currently still sets SVG version to 1.1 to support Safari and other
 * legacy tooling.
 *
 * @param attribs - attributes object
 * @param body - shape primitives
 */
export const svg = (attribs: any, ...body: any[]): any[] => [
    "svg",
    fattribs({
        version: "1.1",
        xmlns: SVG_NS,
        "xmlns:xlink": XLINK_NS,
        ...attribs,
    }),
    ...body,
];
