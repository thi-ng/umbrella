import {
    dot,
    FLOAT0,
    FloatTerm,
    madd,
    max,
    mul,
    Vec3Term,
} from "@thi.ng/shader-ast";
import { fit1101 } from "../math/fit";

/**
 * Inline function. Computes Lambert term, i.e. `max(dot(n, l), 0)`.
 * Both vectors must be pre-normalized.
 *
 * @param surfNormal - vec3
 * @param lightDir - vec3
 */
export const lambert = (n: Vec3Term, ldir: Vec3Term) =>
    max(dot(n, ldir), FLOAT0);

/**
 * Inline function. Computes Half-Lambertian term. Both vectors must be
 * pre-normalized.
 *
 * {@link https://developer.valvesoftware.com/wiki/Half_Lambert}
 *
 * @param n -
 * @param ldir -
 */
export const halfLambert = (n: Vec3Term, ldir: Vec3Term) =>
    fit1101(dot(n, ldir));

/**
 * Inline function. Computes:
 *
 * col = lambert * lightCol * diffuseCol + ambientCol
 *
 * @param lambertian - float
 * @param diffuseCol - vec3
 * @param lightCol - vec3
 * @param ambientCol - vec3
 */
export const diffuseLighting = (
    lambertian: FloatTerm,
    diffuse: Vec3Term,
    light: Vec3Term,
    ambient: Vec3Term
) => madd(mul(light, lambertian), diffuse, ambient);
