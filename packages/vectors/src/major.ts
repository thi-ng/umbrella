import { max2id, max3id, max4id } from "@thi.ng/math";
import type { MultiVecOpRoV } from "./api";
import { vop } from "./internal/vop";

const abs = Math.abs;

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is
 * the largest.
 *
 * @param v -
 */
export const major: MultiVecOpRoV<number> = vop();

major.default((a) => {
    let id = -1;
    let max = -Infinity;
    for (let i = a.length; --i >= 0; ) {
        const x = abs(a[i]);
        if (x > max) {
            max = x;
            id = i;
        }
    }
    return id;
});

export const major2 = major.add(2, (a) => max2id(abs(a[0]), abs(a[1])));
export const major3 = major.add(3, (a) =>
    max3id(abs(a[0]), abs(a[1]), abs(a[2]))
);
export const major4 = major.add(4, (a) =>
    max4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]))
);
