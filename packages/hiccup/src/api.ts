export const SVG_NS = "http://www.w3.org/2000/svg";
export const XLINK_NS = "http://www.w3.org/1999/xlink";
export const XHTML_NS = "http://www.w3.org/1999/xhtml";

export const TAG_REGEXP = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;

export const PROC_TAGS: { [id: string]: string } = {
    "?xml": "?>\n",
    "!DOCTYPE": ">\n",
    "!ENTITY": ">\n",
    "!ELEMENT": ">\n",
    "!ATTLIST": ">\n"
};

// tslint:disable-next-line
export const SVG_TAGS: {
    [id: string]: number;
} = "animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view"
    .split(" ")
    .reduce((acc: any, x) => ((acc[x] = 1), acc), {});

// tslint:disable-next-line
export const VOID_TAGS: {
    [id: string]: number;
} = "area base br circle col command ellipse embed hr img input keygen line link meta param path polygon polyline rect source stop track use wbr ?xml"
    .split(" ")
    .reduce((acc: any, x) => ((acc[x] = 1), acc), {});

export const ENTITIES: { [id: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
};

export const COMMENT = "__COMMENT__";

export const NO_SPANS: {
    [id: string]: number;
} = {
    button: 1,
    option: 1,
    text: 1,
    textarea: 1
};

export const ENTITY_RE = new RegExp(`[${Object.keys(ENTITIES)}]`, "g");
