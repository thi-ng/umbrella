import { Fn4 } from "@thi.ng/api";
import { MultiVecOpImpl, ReadonlyVec, vop } from "@thi.ng/vectors";

/**
 * Returns true if given 2D rect defined by `rectMinPos` and `rectSize`
 * intersects circle.
 *
 * @param rectMinPos
 * @param rectSize
 * @param circlePos
 * @param r
 */
export const testRectCircle = (
    [rx, ry]: ReadonlyVec,
    [w, h]: ReadonlyVec,
    [cx, cy]: ReadonlyVec,
    r: number
) => axis(cx, rx, w) + axis(cy, ry, h) <= r * r;

/**
 * Same as {@link testRectCircle}, but for 3D AABB and sphere.
 *
 * @param boxMinPos
 * @param boxSize
 * @param spherePos
 * @param r
 */
export const testAABBSphere = (
    [rx, ry, rz]: ReadonlyVec,
    [w, h, d]: ReadonlyVec,
    [cx, cy, cz]: ReadonlyVec,
    r: number
) => axis(cx, rx, w) + axis(cy, ry, h) + axis(cz, rz, d) <= r * r;

/**
 * Like {@link testCenteredAABBSphere}, but for arbitrary dimensions w/
 * optimized execution for 2D & 3D cases.
 *
 * @param boxCenter
 * @param boxExtent
 * @param spherePos
 * @param r
 */
export const testCenteredBoxSphere: MultiVecOpImpl<Fn4<
    ReadonlyVec,
    ReadonlyVec,
    ReadonlyVec,
    number,
    boolean
>> = vop(0);

/**
 * Similar to {@link testRectCircle}, but for rects defined by centroid
 * and radius-like extent.
 *
 * @param rectPos
 * @param extent
 * @param circlePos
 * @param r
 */
export const testCenteredRectCircle = testCenteredBoxSphere.add(
    2,
    ([rx, ry], [w, h], [cx, cy], r) =>
        axis(cx, rx - w, w * 2) + axis(cy, ry - h, h * 2) <= r * r
);

/**
 * Similar to {@link testAABBSphere}, but for AABBs defined by centroid
 * and radius-like extent.
 *
 * @param boxCenter
 * @param boxExtent
 * @param spherePos
 * @param r
 */
export const testCenteredAABBSphere = testCenteredBoxSphere.add(
    3,
    ([rx, ry, rz], [w, h, d], [cx, cy, cz], r) =>
        axis(cx, rx - w, w * 2) +
            axis(cy, ry - h, h * 2) +
            axis(cz, rz - w, d * 2) <=
        r * r
);

testCenteredBoxSphere.default((boxPos, boxExtent, spherePos, r) => {
    let sum = 0;
    for (let i = boxPos.length; --i >= 0; ) {
        sum += axis(spherePos[i], boxPos[i] - boxExtent[i], boxExtent[i] * 2);
    }
    return sum <= r * r;
});

const axis = (a: number, b: number, c: number) =>
    (a < b ? a - b : a > b + c ? a - b - c : 0) ** 2;
