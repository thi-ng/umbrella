import { add } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { max } from "@thi.ng/vectors3/max";
import { min } from "@thi.ng/vectors3/min";
import { sub } from "@thi.ng/vectors3/sub";
import { bounds as _bounds, IShape, union } from "../api";

export const bounds =
    (pts: ReadonlyArray<Vec>, vmin: Vec, vmax: Vec): [Vec, Vec] => {

        for (let i = pts.length; --i >= 0;) {
            const p = pts[i];
            min(null, vmin, p);
            max(null, vmax, p);
        }
        return [vmin, vmax];
    };

export const collBounds =
    (shapes: IShape[]) => {

        let n = shapes.length - 1;
        let res: IShape = n >= 0 ? _bounds(shapes[n]) : undefined;
        for (; --n >= 0;) {
            res = union(res, _bounds(shapes[n]))[0];
        }
        return res;
    };

export const unionBounds =
    (pos1: ReadonlyVec, size1: ReadonlyVec, pos2: ReadonlyVec, size2: ReadonlyVec): [Vec, Vec] => {
        const p = add([], pos1, size1);
        const q = add([], pos2, size2);
        const pos = min([], pos1, pos2);
        return [pos, sub(null, max(null, p, q), pos)];
    };
