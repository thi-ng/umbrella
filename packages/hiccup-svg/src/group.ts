import { fattribs } from "./format.js";

/**
 * Creates a new SVG group element in hiccup format.
 *
 * @remarks
 * If the given attribs contain a `__inkscapeLayer` value (layer name), it will
 * be auto-converted into the correct set of attributes to define that group as
 * Inkscape layer.
 *
 * @param attribs
 * @param body
 */
export const group = (attribs: any, ...body: any[]): any[] => [
	"g",
	__groupLayerID(fattribs({ ...attribs })),
	...body,
];

/** @internal */
export const __groupLayerID = (attribs: any) => {
	if (attribs.__inkscapeLayer) {
		attribs["inkscape:groupmode"] = "layer";
		attribs["inkscape:label"] = attribs.__inkscapeLayer;
		delete attribs.__inkscapeLayer;
	}
	return attribs;
};
