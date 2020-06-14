import {
    add,
    defn,
    float,
    FLOAT1,
    mod,
    mul,
    Prim,
    ret,
} from "@thi.ng/shader-ast";

const __permute = <T extends Prim>(type: T, suffix = "") =>
    defn(type, `permute${suffix}`, [type], (v) => [
        ret(mod(mul(<any>v, add(mul(<any>v, float(34)), FLOAT1)), float(289))),
    ]);

export const permute = __permute("float");

export const permute2 = __permute("vec2", "2");

export const permute3 = __permute("vec3", "3");

export const permute4 = __permute("vec4", "4");
