import { IVector } from "@thi.ng/vectors/api";
import { IBounds, IUnion } from "../api";

export const axisBounds =
    <T extends IVector<T>>
        (points: ReadonlyArray<T>, axis: number): [number, number] => {

        let min = Infinity;
        let max = -Infinity;
        for (let i = points.length; --i >= 0;) {
            const x = points[i][axis];
            x < min && (min = x);
            x > max && (max = x);
        }
        return [min, max];
    };

export const bounds =
    <T extends IVector<T>>
        (pts: ReadonlyArray<T>, vmin: T, vmax: T): [T, T] => {

        for (let i = pts.length; --i >= 0;) {
            const p = pts[i];
            vmin.min(p);
            vmax.max(p);
        }
        return [vmin, vmax];
    };

export const collBounds =
    <T extends IBounds<B>, B extends IBounds<B> & IUnion<B>>
        (shapes: T[]) => {

        let n = shapes.length - 1;
        let res: B = n > 0 ? shapes[n].bounds() : undefined;
        for (; --n >= 0;) {
            res = res.union(shapes[n].bounds());
        }
        return res;
    };
