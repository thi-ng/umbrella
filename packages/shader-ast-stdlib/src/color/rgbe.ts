import {
    $w,
    $xyz,
    defn,
    exp2,
    float,
    gt,
    INT0,
    mul,
    ret,
    sub,
    ternary,
    vec3,
    VEC3_0,
} from "@thi.ng/shader-ast";

/**
 * RGBE (Radiance HDR) to linear float RGB conversion. The input vec is supposed
 * to contain unsigned byte values, with the last component being the exponent.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/RGBE_image_format
 *
 * Code based on:
 * https://github.com/box/hdrCompressor/blob/master/src/rgbe/rgbe.c
 *
 */
export const decodeRGBE = defn("vec3", "decodeRGBE", ["ivec4"], (col) => {
    return [
        ret(
            ternary(
                gt($w(col), INT0),
                mul(vec3($xyz(col)), exp2(float(sub($w(col), 136)))),
                VEC3_0
            )
        ),
    ];
});
