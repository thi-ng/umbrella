import type { FnU3 } from "@thi.ng/api";
import { mixN, set, Vec } from "@thi.ng/vectors";

export const cubicFromQuadratic: FnU3<Vec, Vec[]> = (a, b, c) => [
    set([], a),
    mixN([], a, b, 2 / 3),
    mixN([], c, b, 2 / 3),
    set([], c),
];
