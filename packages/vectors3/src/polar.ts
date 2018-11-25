import { MultiVecOpV } from "./api";
import { vop } from "./vop";
import { mag } from "./mag";

const sqrt = Math.sqrt;
const asin = Math.asin;
const atan2 = Math.atan2;

export const polar: MultiVecOpV = vop(1);

export const polar2 = polar.add(2, (out, a) => {
    const x = a[0];
    out[0] = mag(a);
    out[1] = atan2(a[1], x);
    return out;
});

export const polar3 = polar.add(3, (out, a) => {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const r = sqrt(x * x + y * y + z * z);
    out[0] = r;
    out[1] = asin(z / r);
    out[2] = atan2(y, x);
    return out;
});
