import {
    add22,
    addN22,
    div22,
    divN22,
    mul22,
    mulM22,
    mulN22,
    mulV22,
    mulVM22,
    sub22,
    subN22,
} from "@thi.ng/matrices";
import { neg } from "@thi.ng/vectors";
import type { JSBuiltinsMat } from "../api";

export const MAT2: JSBuiltinsMat = {
    add: (a, b) => add22([], a, b),
    addnv: (a, b) => addN22([], b, a),
    addvn: (a, b) => addN22([], a, b),
    dec: (a) => subN22([], a, 1),
    div: (a, b) => div22([], a, b),
    divnv: (a, b) => div22(null, [a, a, a, a], b),
    divvn: (a, b) => divN22([], a, b),
    idx: (a, b) => [a[b * 2], a[b * 2 + 1]],
    inc: (a) => addN22([], a, 1),
    mul: (a, b) => mul22([], a, b),
    mulm: (a, b) => mulM22([], a, b),
    mulmv: (a, b) => mulV22([], a, b),
    mulnv: (a, b) => mulN22([], b, a),
    mulvm: (a, b) => mulVM22([], a, b),
    mulvn: (a, b) => mulN22([], a, b),
    sub: (a, b) => sub22([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub22(null, [a, a, a, a], b),
    subvn: (a, b) => subN22([], a, b),
};
