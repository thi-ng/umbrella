import { VecOpV } from "./api";

export const perpendicularLeft2: VecOpV =
    (out, a) => {
        const x = a[0];
        out[0] = -a[1];
        out[1] = x;
        return out;
    };

export const perpendicularRight2: VecOpV =
    (out, a) => {
        const x = -a[0];
        out[0] = a[1];
        out[1] = x;
        return out;
    };
