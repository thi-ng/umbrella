import { DEFAULT, defmulti, MultiFn1 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { PI } from "@thi.ng/math";
import { AABB, Sphere } from "../api";
import { dispatch } from "../internal/dispatch";

/**
 * Returns the volume of given 3D shape. Returns 0 for all others.
 *
 * Currently only implemented for:
 *
 * - AABB
 * - Sphere
 */
export const volume: MultiFn1<IShape, number> = defmulti(dispatch);
volume.add(DEFAULT, () => 0);

volume.addAll({
    [Type.AABB]: ({ size }: AABB) => size[0] * size[1] * size[2],

    [Type.SPHERE]: ($: Sphere) => (4 / 3) * PI * Math.pow($.r, 3)
});
