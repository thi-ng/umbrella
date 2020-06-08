import { mixN, set, Vec } from "@thi.ng/vectors";

export const cubicFromQuadratic = (a: Vec, b: Vec, c: Vec) => [
    set([], a),
    mixN([], a, b, 2 / 3),
    mixN([], c, b, 2 / 3),
    set([], c),
];
