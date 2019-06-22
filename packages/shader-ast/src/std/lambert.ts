import { FloatSym } from "../api";
import {
    add,
    defn,
    mul,
    ret,
    sym,
    ternary
} from "../ast";
import { dot } from "../builtins";
import { fit1101 } from "./math";

/**
 * Computes Lambert term, optionally using Half-Lambertian,
 * if `half` is true.
 *
 * https://developer.valvesoftware.com/wiki/Half_Lambert
 *
 * @param surfNormal vec3
 * @param lightDir vec3
 * @param half bool
 */
export const lambert = defn(
    "float",
    "lambert",
    [["vec3"], ["vec3"], ["bool"]],
    (n, ldir, bidir) => {
        let d: FloatSym;
        return [(d = sym(dot(n, ldir))), ret(ternary(bidir, fit1101(d), d))];
    }
);

/**
 * @param lambertian float
 * @param diffuseCol vec3
 * @param lightCol vec3
 * @param ambientCol vec3
 */
export const diffuseLighting = defn(
    "vec3",
    "diffuseLighting",
    [["float"], ["vec3"], ["vec3"], ["vec3"]],
    (lambertian, diffuse, light, ambient) => [
        ret(mul(diffuse, add(mul(light, lambertian), ambient)))
    ]
);
