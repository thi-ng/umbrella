/** @internal */
export const PROC_TAGS: { [id: string]: string } = {
    "?xml": "?>\n",
    "!DOCTYPE": ">\n",
    "!ENTITY": ">\n",
    "!ELEMENT": ">\n",
    "!ATTLIST": ">\n",
};

/** @internal */
export const ENTITIES: { [id: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

/** @internal */
export const RE_TAG = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
/** @internal */
export const RE_ENTITY = new RegExp(`[${Object.keys(ENTITIES).join("")}]`, "g");

/** @internal */
export const COMMENT = "__COMMENT__";

/** @internal */
export const CDATA = "!CDATA";

/** @internal */
export const NO_SPANS: {
    [id: string]: number;
} = {
    button: 1,
    option: 1,
    script: 1,
    style: 1,
    text: 1,
    textarea: 1,
    title: 1,
};

const tagMap = (
    tags: string
): {
    [id: string]: boolean;
} => tags.split(" ").reduce((acc: any, x) => ((acc[x] = true), acc), {});

/** @internal */
// tslint:disable-next-line
export const SVG_TAGS = tagMap(
    "animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view"
);

/** @internal */
// tslint:disable-next-line
export const VOID_TAGS = tagMap(
    "area base br col command embed hr img input keygen link meta param source stop track use wbr ?xml"
);

/** @internal */
// tslint:disable-next-line
export const NO_CLOSE_EMPTY = tagMap(
    "animate circle ellipse line path polygon polyline rect"
);

/** @internal */
export const ATTRIB_JOIN_DELIMS: Record<string, string> = {
    accept: ",",
    sizes: ",",
    srcset: ",",
};
