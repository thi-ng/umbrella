export const SVG_NS = "http://www.w3.org/2000/svg";

export const TAG_REGEXP = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;

// tslint:disable-next-line
export const SVG_TAGS = "svg circle clipPath defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop symbol text"
    .split(" ")
    .reduce((acc, x) => (acc[x] = 1, acc), {});

// tslint:disable-next-line
export const VOID_TAGS = "area base br col command embed hr img input keygen link meta param source track wbr circle ellipse line path polygon polyline rect stop"
    .split(" ")
    .reduce((acc, x) => (acc[x] = 1, acc), {});

export const ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

export const ENTITY_RE = new RegExp(`[${Object.keys(ENTITIES)}]`, "g");
