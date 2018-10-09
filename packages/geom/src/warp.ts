import { IPointMap } from "./api";
import { IVector } from "@thi.ng/vectors/api";

export const warpPoints =
    <V extends IVector<V>, V2 extends IVector<V2>, A extends IPointMap<V, V2>, B extends IPointMap<V, V2>>
        (dest: B, src: ReadonlyArray<V>, srcBounds: A) => {
        const res: V[] = [];
        for (let n = src.length, i = 0; i < n; i++) {
            res.push(dest.unmapPoint(srcBounds.mapPoint(src[i])));
        }
        return res;
    };
