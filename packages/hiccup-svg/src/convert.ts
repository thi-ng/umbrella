import { implementsFunction, isArray } from "@thi.ng/checks";
import { circle } from "./circle";
import { ellipse } from "./ellipse";
import { fattribs } from "./format";
import { linearGradient, radialGradient } from "./gradients";
import { image } from "./image";
import { hline, line, vline } from "./line";
import { path } from "./path";
import { packedPoints, points } from "./points";
import { polygon } from "./polygon";
import { polyline } from "./polyline";
import { roundedRect } from "./rect";
import { text } from "./text";

const ATTRIB_ALIASES: Record<string, string> = {
    alpha: "opacity",
    dash: "stroke-dasharray",
    dashOffset: "stroke-dashoffset",
    lineCap: "stroke-linecap",
    lineJoin: "stroke-linejoin",
    miterLimit: "stroke-miterlimit",
    weight: "stroke-width",
};

const TEXT_ALIGN: Record<string, string> = {
    left: "start",
    right: "end",
    center: "middle",
    start: "start",
    end: "end",
};

const BASE_LINE: Record<string, string> = {
    top: "text-top",
    bottom: "text-bottom",
};

/**
 * Takes a normalized hiccup tree of {@link @thi.ng/geom# | @thi.ng/geom} or
 * {@link @thi.ng/hdom-canvas# | @thi.ng/hdom-canvas} shape definitions and recursively
 * converts it into an hiccup flavor which is compatible for SVG
 * serialization. This conversion also involves translation & reorg of
 * various attributes. Returns new tree. The original remains untouched,
 * as will any unrecognized tree/shape nodes.
 *
 * @param tree - shape tree
 */
export const convertTree = (tree: any): any[] | null => {
    if (tree == null) return null;
    if (implementsFunction(tree, "toHiccup")) {
        return convertTree(tree.toHiccup());
    }
    const type = tree[0];
    if (isArray(type)) {
        return tree.map(convertTree);
    }
    let attribs = convertAttribs(tree[1]);
    switch (tree[0]) {
        case "svg":
        case "defs":
        case "a":
        case "g": {
            const res: any[] = [type, fattribs(attribs)];
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
            return circle(tree[2], tree[3], attribs, ...tree.slice(4));
        case "ellipse":
            return ellipse(
                tree[2],
                tree[3][0],
                tree[3][1],
                attribs,
                ...tree.slice(4)
            );
        case "rect": {
            const r = tree[5] || 0;
            return roundedRect(
                tree[2],
                tree[3],
                tree[4],
                r,
                r,
                attribs,
                ...tree.slice(6)
            );
        }
        case "line":
            return line(tree[2], tree[3], attribs, ...tree.slice(4));
        case "hline":
            return hline(tree[2], attribs);
        case "vline":
            return vline(tree[2], attribs);
        case "polyline":
            return polyline(tree[2], attribs, ...tree.slice(3));
        case "polygon":
            return polygon(tree[2], attribs, ...tree.slice(3));
        case "path":
            return path(tree[2], attribs, ...tree.slice(3));
        case "text":
            return text(tree[2], tree[3], attribs, ...tree.slice(4));
        case "img":
            return image(tree[3], tree[2].src, attribs, ...tree.slice(4));
        case "points":
            return points(
                tree[2],
                attribs.shape,
                attribs.size,
                attribs,
                ...tree.slice(3)
            );
        case "packedPoints":
            return packedPoints(
                tree[2],
                attribs.shape,
                attribs.size,
                attribs,
                ...tree.slice(3)
            );
        default:
            return tree;
    }
};

const convertAttribs = (attribs: any) => {
    const res: any = {};
    if (!attribs) return res;
    // convertTransforms(res, attribs);
    for (let id in attribs) {
        const v = attribs[id];
        const aid = ATTRIB_ALIASES[id];
        if (aid) {
            res[aid] = v;
        } else {
            convertAttrib(res, id, v);
        }
    }
    return res;
};

const convertAttrib = (res: any, id: string, v: any) => {
    switch (id) {
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
            res["dominant-baseline"] = BASE_LINE[v] || v;
            break;
        case "filter":
            // TODO needs to be translated into <filter> def first
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
            break;
        default:
            res[id] = v;
    }
};
