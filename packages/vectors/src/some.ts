import type { MultiBVecOpRoV } from "./api";
import { vop } from "./internal/vop";

/**
 * Returns returns true if at least one vector component in `v` is
 * truthy.
 *
 * @param v -
 */
export const some: MultiBVecOpRoV<boolean> = vop();

some.default((v) => {
    for (let i = v.length; --i >= 0; ) {
        if (v[i]) return true;
    }
    return false;
});

export const some2 = some.add(2, (a) => a[0] || a[1]);
export const some3 = some.add(3, (a) => a[0] || a[1] || a[2]);
export const some4 = some.add(4, (a) => a[0] || a[1] || a[2] || a[3]);
