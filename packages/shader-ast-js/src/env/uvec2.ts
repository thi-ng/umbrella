import {
    addNU2,
    addU2,
    bitAndU2,
    bitNotU2,
    bitOrU2,
    bitXorU2,
    divNU2,
    divU2,
    lshiftU2,
    mod2,
    modN2,
    mulNU2,
    mulU2,
    rshiftU2,
    subNU2,
    subU2
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC2 } from "./vec2";

export const UVEC2: JSBuiltinsIntVec = {
    ...VEC2,
    add: (a, b) => addU2([], a, b),
    addvn: (a, b) => addNU2([], a, b),
    addnv: (a, b) => addNU2([], b, a),
    div: (a, b) => divU2([], a, b),
    divvn: (a, b) => divNU2([], a, b),
    divnv: (a, b) => divU2(null, [a, a], b),
    modi: (a, b) => mod2([], a, b),
    modivn: (a, b) => modN2([], a, b),
    modinv: (a, b) => mod2(null, [a, a], b),
    mul: (a, b) => mulU2([], a, b),
    mulvn: (a, b) => mulNU2([], a, b),
    mulnv: (a, b) => mulNU2([], b, a),
    sub: (a, b) => subU2([], a, b),
    subvn: (a, b) => subNU2([], a, b),
    subnv: (a, b) => subU2(null, [a, a], b),
    bitand: (a, b) => bitAndU2([], a, b),
    lshift: (a, b) => lshiftU2([], a, b),
    bitnot1: (a) => bitNotU2([], a),
    bitor: (a, b) => bitOrU2([], a, b),
    rshift: (a, b) => rshiftU2([], a, b),
    bitxor: (a, b) => bitXorU2([], a, b)
};
