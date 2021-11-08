import type { MultiBVecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Returns returns true if all vector components in `v` are truthy.
 *
 * @param v -
 */
export const every: MultiBVecOpRoV<boolean> = vop();

every.default((v) => {
    for (let i = v.length; i-- > 0; ) {
        if (!v[i]) return false;
    }
    return true;
});

export const every2 = every.add(2, (a) => a[0] && a[1]);
export const every3 = every.add(3, (a) => a[0] && a[1] && a[2]);
export const every4 = every.add(4, (a) => a[0] && a[1] && a[2] && a[3]);
