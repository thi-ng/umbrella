import {
    add33,
    addN33,
    div33,
    divN33,
    mul33,
    mulM33,
    mulN33,
    mulV33,
    mulVM33,
    sub33,
    subN33
} from "@thi.ng/matrices";
import { neg, vecOf } from "@thi.ng/vectors";
import { JSBuiltinsMat } from "../api";

export const MAT3: JSBuiltinsMat = {
    add: (a, b) => add33([], a, b),
    addnv: (a, b) => addN33([], b, a),
    addvn: (a, b) => addN33([], a, b),
    dec: (a) => subN33([], a, 1),
    div: (a, b) => div33([], a, b),
    divnv: (a, b) => div33(null, vecOf(9, a), b),
    divvn: (a, b) => divN33([], a, b),
    inc: (a) => addN33([], a, 1),
    mul: (a, b) => mul33([], a, b),
    mulm: (a, b) => mulM33([], a, b),
    mulmv: (a, b) => mulV33([], a, b),
    mulnv: (a, b) => mulN33([], b, a),
    mulvm: (a, b) => mulVM33([], a, b),
    mulvn: (a, b) => mulN33([], a, b),
    sub: (a, b) => sub33([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub33(null, vecOf(9, a), b),
    subvn: (a, b) => subN33([], a, b)
};
