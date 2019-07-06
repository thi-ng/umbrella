import {
    float,
    FloatTerm,
    pow,
    Prim,
    Term,
    vec2,
    vec3,
    vec4
} from "@thi.ng/shader-ast";

const GAMMA = float(2.2);
const INV_GAMMA = float(1 / 2.2);

const $ = <T extends Prim>(t: Term<T>, x: FloatTerm): Term<T> => <any>{
        float: x,
        vec2: vec2(x),
        vec3: vec3(x),
        vec4: vec4(x, x, x, 1)
    }[t.type];

export const toLinear = <T extends Prim>(x: Term<T>) => pow(x, $(x, GAMMA));

export const toSRGB = <T extends Prim>(x: Term<T>) => pow(x, $(x, INV_GAMMA));
