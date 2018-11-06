import { addNew, subNew, Vec } from "@thi.ng/vectors2/api";
import { ClipMode, VecPair } from "../api";
import { arcVertices } from "./arc";
import { normalL2 } from "./direction";
import { edges as _edges } from "./edges";
import { booleanOp } from "./greiner-hormann";
import { polygonArea } from "./polygon";

export const offset = (points: Vec[], dist: number, res = 8, closed = true) => {
    if (!closed && dist < 0) return;
    polygonArea(points) > 0 && (points = [...points].reverse());
    const contours = offsetEdges(_edges(points, closed), Math.abs(dist), res);
    if (contours.length > 0) {
        const a1 = Math.abs(polygonArea(contours[0]));
        const a2 = Math.abs(polygonArea(contours[1]));
        return contours[
            dist > 0 ?
                a1 > a2 ? 0 : 1 :
                a1 > a2 ? 1 : 0
        ];
    }
};

/**
 *
 * @param edges
 * @param dist
 * @param res
 */
export const offsetEdges = (edges: Iterable<VecPair>, dist: number, res: number) => {
    let result: Vec[][];
    for (let e of edges) {
        const seg = offsetLine(e, dist, res);
        result = result ?
            booleanOp(result, seg, ClipMode.UNION, false) :
            [seg];
    }
    return result;
};

export const offsetLine = ([ea, eb]: VecPair, dist: number, res: number) => {
    const verts: Vec[] = [];
    const r = [dist, dist];
    const n = normalL2(ea, eb, dist);
    const e1 = [addNew(ea, n), addNew(eb, n)];
    const e2 = [subNew(eb, n), subNew(ea, n)];
    arcVertices(ea, e2[1], e1[0], r, verts, true, res);
    return arcVertices(eb, e1[1], e2[0], r, verts, true, res);
};
