import type { FnU3 } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";

export const cubicFromQuadratic: FnU3<Vec, Vec[]> = (a, b, c) => [
    set([], a),
    mixN([], a, b, 2 / 3),
    mixN([], c, b, 2 / 3),
    set([], c),
];
