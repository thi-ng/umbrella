import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";

import { PathSegment } from "./api";
import { circle } from "./circle";
import { ff } from "./format";
import { linearGradient, radialGradient } from "./gradients";
import { image } from "./image";
import { hline, line, vline } from "./line";
import { path } from "./path";
import { points } from "./points";
import { polygon } from "./polygon";
import { roundedRect } from "./rect";
import { text } from "./text";

const ATTRIB_ALIASES = {
    "alpha": "opacity",
    "dash": "stroke-dasharray",
    "dashOffset": "stroke-dashoffset",
    "lineCap": "stroke-linecap",
    "lineJoin": "stroke-linejoin",
    "miterLimit": "stroke-miterlimit",
    "weight": "stroke-width",
};

const TEXT_ALIGN = {
    left: "start",
    right: "end",
    center: "middle",
    start: "start",
    end: "end",
};

/**
 * Takes a normalized hiccup tree of hdom-canvas shape definitions and
 * recursively converts it into an hiccup flavor which is ready for SVG
 * serialization. This conversion also involves translation & reorg of
 * various attributes. Returns new tree. The original remains untouched,
 * as will any unrecognized tree/shape nodes.
 *
 * @param tree
 */
export const convertTree = (tree: any[]): any[] => {
    const type = tree[0];
    if (isArray(type)) {
        return tree.map(convertTree);
    }
    let attribs = convertAttribs(tree[1]);
    switch (tree[0]) {
        case "svg":
        case "defs":
        case "g": {
            const res: any[] = [type, attribs];
            for (let i = 2, n = tree.length; i < n; i++) {
                const c = convertTree(tree[i]);
                c != null && res.push(c);
            }
            return res;
        }
        case "linearGradient":
            return linearGradient(
                attribs.id,
                attribs.from,
                attribs.to,
                tree[2],
                {
                    gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
                    gradientTransform: attribs.gradientTransform,
                }
            );
        case "radialGradient":
            return radialGradient(
                attribs.id,
                attribs.from,
                attribs.to,
                attribs.r1,
                attribs.r2,
                tree[2],
                {
                    gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
                    gradientTransform: attribs.gradientTransform,
                }
            );
        case "circle":
            return circle(tree[2], tree[3], attribs);
        case "rect": {
            const r = tree[5] || 0;
            return roundedRect(tree[2], tree[3], tree[4], r, r, attribs);
        }
        case "line":
            return line(tree[2], tree[3], attribs);
        case "hline":
            return hline(tree[2], attribs);
        case "vline":
            return vline(tree[2], attribs);
        case "polyline":
        case "polygon":
            return polygon(tree[2], attribs);
        case "path": {
            let segments: PathSegment[] = [];
            for (let seg of tree[2]) {
                switch (seg[0].toLowerCase()) {
                    case "s":
                    case "t":
                        // TODO compute reflected control point
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Quadratic_B%C3%A9zier_Curve
                        break;
                    default:
                        segments.push(seg);
                }
            }
            return path(segments, attribs);
        }
        case "text":
            return text(tree[2], tree[3], attribs);
        case "img":
            return image(tree[2], tree[3].src, attribs);
        case "points":
            return points(tree[2], attribs.shape, attribs.size, attribs);
        default:
            return tree;
    }
};

const convertAttribs = (attribs: any) => {
    const res: any = convertTransforms(attribs);
    for (let id in attribs) {
        const v = attribs[id];
        if (ATTRIB_ALIASES[id]) {
            res[ATTRIB_ALIASES[id]] = v;
        } else {
            switch (id) {
                case "fill":
                case "stroke":
                    res[id] = v[0] === "$" ? `url(#${v.substr(1)})` : v;
                    break;
                case "font": {
                    const i = v.indexOf(" ");
                    res["font-size"] = v.substr(0, i);
                    res["font-family"] = v.substr(i + 1);
                    break;
                }
                case "align":
                    res["text-anchor"] = TEXT_ALIGN[v];
                    break;
                case "baseline":
                // no SVG support?
                case "filter":
                // TODO needs to be translated into <filter> def first
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
                // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
                case "transform":
                case "translate":
                case "rotate":
                case "scale":
                    break;
                default:
                    res[id] = v;
            }
        }
    }
    return res;
};

const convertTransforms = (attribs: any) => {
    const res: any = {};
    if (!attribs) return res;
    let v: any;
    if ((v = attribs.transform) ||
        attribs.translate ||
        attribs.scale ||
        attribs.rotate) {

        const tx: string[] = [];
        (v = attribs.transform) && tx.push(`matrix(${[...v].map(ff).join(" ")})`);
        (v = attribs.translate) && tx.push(`translate(${ff(v[0])} ${ff(v[1])})`);
        (v = attribs.rotate) && tx.push(`rotate(${ff(v * 180 / Math.PI)})`);
        (v = attribs.scale) &&
            tx.push(
                isArrayLike(v) ?
                    `scale(${ff(v[0])} ${ff(v[1])})` :
                    `scale(${ff(v)})`
            );
        res.transform = tx.join(" ");
    }
    return res;
};
