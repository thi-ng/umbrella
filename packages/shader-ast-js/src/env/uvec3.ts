import {
    addNU3,
    addU3,
    bitAndU3,
    bitNotU3,
    bitOrU3,
    bitXorU3,
    divNU3,
    divU3,
    lshiftU3,
    mod3,
    modN3,
    mulNU3,
    mulU3,
    rshiftU3,
    subNU3,
    subU3
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC3 } from "./vec3";

export const UVEC3: JSBuiltinsIntVec = {
    ...VEC3,
    add: (a, b) => addU3([], a, b),
    addvn: (a, b) => addNU3([], a, b),
    addnv: (a, b) => addNU3([], b, a),
    div: (a, b) => divU3([], a, b),
    divvn: (a, b) => divNU3([], a, b),
    divnv: (a, b) => divU3(null, [a, a, a], b),
    modi: (a, b) => mod3([], a, b),
    modivn: (a, b) => modN3([], a, b),
    modinv: (a, b) => mod3(null, [a, a, a], b),
    mul: (a, b) => mulU3([], a, b),
    mulvn: (a, b) => mulNU3([], a, b),
    mulnv: (a, b) => mulNU3([], b, a),
    sub: (a, b) => subU3([], a, b),
    subvn: (a, b) => subNU3([], a, b),
    subnv: (a, b) => subU3(null, [a, a, a], b),
    bitand: (a, b) => bitAndU3([], a, b),
    lshift: (a, b) => lshiftU3([], a, b),
    bitnot1: (a) => bitNotU3([], a),
    bitor: (a, b) => bitOrU3([], a, b),
    rshift: (a, b) => rshiftU3([], a, b),
    bitxor: (a, b) => bitXorU3([], a, b)
};
