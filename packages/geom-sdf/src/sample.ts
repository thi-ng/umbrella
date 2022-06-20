import type { NumericArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { assert } from "@thi.ng/errors/assert";
import type { Polygon } from "@thi.ng/geom";
import type { AABBLike } from "@thi.ng/geom-api";
import { isolines, setBorder } from "@thi.ng/geom-isoline";
import { polygon } from "@thi.ng/geom/polygon";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { add2, div2, ReadonlyVec } from "@thi.ng/vectors";
import type { SDFn } from "./api.js";

export const sample2d = (
    sdf: SDFn,
    { pos: [px, py], size: [width, height] }: AABBLike,
    [resX, resY]: ReadonlyVec,
    buf?: NumericArray
) => {
    if (buf) {
        assert(buf.length >= resX * resY, "insufficient buffer size");
    } else {
        buf = new Float32Array(resX * resY);
    }
    const dx = width / (resX - 1);
    const dy = height / (resY - 1);
    const p = [0, 0];
    for (let y = 0, i = 0; y < resY; y++) {
        p[1] = py + y * dy;
        for (let x = 0; x < resX; x++, i++) {
            p[0] = px + x * dx;
            buf[i] = sdf(p);
        }
    }
    return buf;
};

export const asPolygons = (
    sdf: NumericArray | SDFn,
    bounds: AABBLike,
    res: ReadonlyVec,
    isoLevels: Iterable<number> = [0]
) => {
    const $sdf = isFunction(sdf) ? sample2d(sdf, bounds, res) : sdf;
    const { pos, size } = bounds;
    const [resX, resY] = res;
    setBorder($sdf, resX, resY, 1e6);
    const scale = div2([], size, [resX - 1, resY - 1]);
    return transduce(
        comp(
            mapcat((iso) => isolines($sdf, resX, resY, iso, scale)),
            map((pts) => polygon(pts.map((p) => add2(null, p, pos))))
        ),
        push<Polygon>(),
        isoLevels
    );
};
