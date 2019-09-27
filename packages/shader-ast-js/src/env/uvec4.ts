import {
    addNU4,
    addU4,
    bitAndU4,
    bitNotU4,
    bitOrU4,
    bitXorU4,
    divNU4,
    divU4,
    lshiftU4,
    mod4,
    modN4,
    mulNU4,
    mulU4,
    rshiftU4,
    subNU4,
    subU4
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC4 } from "./vec4";

export const UVEC4: JSBuiltinsIntVec = {
    ...VEC4,
    add: (a, b) => addU4([], a, b),
    addvn: (a, b) => addNU4([], a, b),
    addnv: (a, b) => addNU4([], b, a),
    div: (a, b) => divU4([], a, b),
    divvn: (a, b) => divNU4([], a, b),
    divnv: (a, b) => divU4(null, [a, a, a, a], b),
    modi: (a, b) => mod4([], a, b),
    modivn: (a, b) => modN4([], a, b),
    modinv: (a, b) => mod4(null, [a, a, a, a], b),
    mul: (a, b) => mulU4([], a, b),
    mulvn: (a, b) => mulNU4([], a, b),
    mulnv: (a, b) => mulNU4([], b, a),
    sub: (a, b) => subU4([], a, b),
    subvn: (a, b) => subNU4([], a, b),
    subnv: (a, b) => subU4(null, [a, a, a, a], b),
    bitand: (a, b) => bitAndU4([], a, b),
    lshift: (a, b) => lshiftU4([], a, b),
    bitnot1: (a) => bitNotU4([], a),
    bitor: (a, b) => bitOrU4([], a, b),
    rshift: (a, b) => rshiftU4([], a, b),
    bitxor: (a, b) => bitXorU4([], a, b)
};
