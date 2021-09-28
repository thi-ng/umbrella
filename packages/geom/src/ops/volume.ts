import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { PI } from "@thi.ng/math/api";
import type { AABB } from "../api/aabb";
import type { Sphere } from "../api/sphere";
import { dispatch } from "../internal/dispatch";

/**
 * Returns the volume of given 3D shape. Returns 0 for all others.
 *
 * Currently only implemented for:
 *
 * - AABB
 * - Sphere
 */
export const volume: MultiFn1<IShape, number> = defmulti<any, number>(
    dispatch,
    {},
    {
        [DEFAULT]: () => 0,

        aabb: ({ size }: AABB) => size[0] * size[1] * size[2],

        sphere: ($: Sphere) => (4 / 3) * PI * $.r ** 3,
    }
);
