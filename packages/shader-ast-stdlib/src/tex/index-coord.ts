import {
    $x,
    $y,
    div,
    madd,
    modi,
    UintTerm,
    uvec2,
    UVec2Term,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Similar to {@link indexToUV}, but returns uvec2 in pixel
 * coords. Not compatible with WebGL1.
 *
 * @param i -
 * @param width -
 */
export const indexToCoord = (i: UintTerm, width: UintTerm) =>
    uvec2(modi(i, width), div(i, width));

/**
 * Inline function. Reverse op to {@link indexToCoord}.  Not compatible with
 * WebGL1.
 *
 * @param coord -
 * @param width -
 */
export const coordToIndex = (coord: UVec2Term, width: UintTerm) =>
    madd($y(coord), width, $x(coord));
