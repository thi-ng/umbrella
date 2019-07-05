import {
    $x,
    $xy,
    $xyz,
    $y,
    defn,
    div,
    float,
    IntTerm,
    IVec2Term,
    modi,
    ret,
    Sampler2DSym,
    texture,
    vec2
} from "@thi.ng/shader-ast";

export const indexToUV = defn(
    "vec2",
    "indexToUV",
    [["int"], ["ivec2"]],
    (i, size) => [
        ret(
            vec2(
                div(float(modi(i, $x(size))), float($x(size))),
                div(float(div(i, $x(size))), float($y(size)))
            )
        )
    ]
);

/**
 * Inline function. Returns x component at index `i` in `tex`.
 *
 * @param tex
 * @param i
 * @param size
 */
export const readIndex1 = (tex: Sampler2DSym, i: IntTerm, size: IVec2Term) =>
    $x(texture(tex, indexToUV(i, size)));

/**
 * Inline function. Returns vec2 (x,y components) at index `i` in `tex`.
 *
 * @param tex
 * @param i
 * @param size
 */
export const readIndex2 = (tex: Sampler2DSym, i: IntTerm, size: IVec2Term) =>
    $xy(texture(tex, indexToUV(i, size)));

/**
 * Inline function. Returns vec3 (x,y,z components) at index `i` in `tex`.
 *
 * @param tex
 * @param i
 * @param size
 */
export const readIndex3 = (tex: Sampler2DSym, i: IntTerm, size: IVec2Term) =>
    $xyz(texture(tex, indexToUV(i, size)));

/**
 * Inline function. Returns vec4 at index `i` in `tex`.
 *
 * @param tex
 * @param i
 * @param size
 */
export const readIndex4 = (tex: Sampler2DSym, i: IntTerm, size: IVec2Term) =>
    texture(tex, indexToUV(i, size));
