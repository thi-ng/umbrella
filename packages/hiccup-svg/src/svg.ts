import { XML_SVG, XML_XLINK } from "@thi.ng/prefixes";
import { convertTree } from "./convert";
import { fattribs, numericAttribs } from "./format";

/**
 * Defines an <svg> root element with default XML namespaces. By default
 * currently still defaults to SVG version to 1.1 to support Safari and other
 * legacy tooling.
 *
 * @remarks
 * If the `convert: true` attrib is given, all body elements will be
 * automatically converted using {@link convertTree}. The `convert` attrib is
 * NOT going to be serialized in the final output.
 *
 * @param attribs - attributes object
 * @param body - shape primitives
 */
export const svg = (attribs: any, ...body: any[]): any[] => {
    attribs = fattribs(
        numericAttribs(
            {
                version: "1.1",
                xmlns: XML_SVG,
                "xmlns:xlink": XML_XLINK,
                ...attribs,
            },
            "width",
            "height",
            "stroke-width"
        )
    );
    if (attribs.convert) {
        delete attribs.convert;
        body = body.map(convertTree);
    }
    return ["svg", attribs, ...body];
};
