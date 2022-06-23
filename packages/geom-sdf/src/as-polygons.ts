import type { NumericArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { Polygon } from "@thi.ng/geom";
import type { AABBLike } from "@thi.ng/geom-api";
import { isolines, setBorder } from "@thi.ng/geom-isoline";
import { simplify } from "@thi.ng/geom-resample/simplify";
import { polygon } from "@thi.ng/geom/polygon";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { div2 } from "@thi.ng/vectors/div";
import type { SDFn } from "./api.js";
import { sample2d } from "./sample.js";

/**
 * Extract contour polygons from given SDF at specified `distances`. The SDF can
 * be either given as distance function or as pre-discretized image (e.g. as
 * result of {@link sample2d}). The SDF will be sampled in the given bounding
 * rect and resolution (if SDF was given as image, resolution MUST be the
 * same!).
 *
 * @remarks
 * If `distances` are not given, only the original boundary (i.e. distance=0)
 * will be extracted. By default all resulting polygons will be simplified using
 * Douglas-Peucker with a threshold of `eps`. By default this will only remove
 * co-linear vertices, but more agressive settings are possible/recommended.
 *
 * @param sdf
 * @param bounds
 * @param res
 * @param distances
 * @param eps
 */
export const asPolygons = (
    sdf: NumericArray | SDFn,
    bounds: AABBLike,
    res: ReadonlyVec,
    distances: Iterable<number> = [0],
    eps = 1e-6
) => {
    const $sdf = isFunction(sdf) ? sample2d(sdf, bounds, res) : sdf;
    const { pos, size } = bounds;
    const [resX, resY] = res;
    setBorder($sdf, resX, resY, 1e6);
    const scale = div2([], size, [resX - 1, resY - 1]);
    return transduce(
        comp(
            mapcat((iso) => isolines($sdf, resX, resY, iso, scale)),
            map((pts) => pts.map((p) => add2(null, p, pos))),
            map((pts) => polygon(eps >= 0 ? simplify(pts, eps, true) : pts))
        ),
        push<Polygon>(),
        distances
    );
};
