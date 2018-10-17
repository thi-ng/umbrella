import { EPS } from "@thi.ng/math/api";
import { IVector } from "@thi.ng/vectors/api";

export const containsDelta = <T extends IVector<T>>(pts: Iterable<T>, q: Readonly<T>, eps = EPS) => {
    for (let p of pts) {
        if (p.eqDelta(q, eps)) {
            return true;
        }
    }
    return false;
};
