import {
    add44,
    addN44,
    div44,
    divN44,
    mul44,
    mulM44,
    mulN44,
    mulV44,
    mulVM44,
    sub44,
    subN44,
} from "@thi.ng/matrices";
import { neg, setS4, vecOf } from "@thi.ng/vectors";
import type { JSBuiltinsMat } from "../api";

export const MAT4: JSBuiltinsMat = {
    add: (a, b) => add44([], a, b),
    addnv: (a, b) => addN44([], b, a),
    addvn: (a, b) => addN44([], a, b),
    dec: (a) => subN44([], a, 1),
    div: (a, b) => div44([], a, b),
    divnv: (a, b) => div44(null, vecOf(16, a), b),
    divvn: (a, b) => divN44([], a, b),
    idx: (a, b) => setS4([], a, 0, b * 4),
    inc: (a) => addN44([], a, 1),
    mul: (a, b) => mul44([], a, b),
    mulm: (a, b) => mulM44([], a, b),
    mulmv: (a, b) => mulV44([], a, b),
    mulnv: (a, b) => mulN44([], b, a),
    mulvm: (a, b) => mulVM44([], a, b),
    mulvn: (a, b) => mulN44([], a, b),
    sub: (a, b) => sub44([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub44(null, vecOf(16, a), b),
    subvn: (a, b) => subN44([], a, b),
};
