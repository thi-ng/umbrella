import type { Fn4, FnN3 } from "@thi.ng/api";
import type { MultiVecOpImpl, ReadonlyVec } from "@thi.ng/vectors";
import { vop } from "@thi.ng/vectors/vop";

export const testBoxSphere: MultiVecOpImpl<
    Fn4<ReadonlyVec, ReadonlyVec, ReadonlyVec, number, boolean>
> = vop(0);

/**
 * Returns true if given 2D rect defined by `boxMinPos` and `boxSize`
 * intersects circle.
 *
 * @param boxMinPos
 * @param boxSize
 * @param circlePos
 * @param r
 */
export const testRectCircle = testBoxSphere.add(
    2,
    (boxMinPos, boxSize, circlePos, r) =>
        axis(circlePos[0], boxMinPos[0], boxSize[0]) +
            axis(circlePos[1], boxMinPos[1], boxSize[1]) <=
        r * r
);

/**
 * Same as {@link testRectCircle}, but for 3D AABB and sphere.
 *
 * @param boxMinPos
 * @param boxSize
 * @param spherePos
 * @param r
 */
export const testAABBSphere = testBoxSphere.add(
    3,
    (boxMinPos, boxSize, spherePos, r) =>
        axis(spherePos[0], boxMinPos[0], boxSize[0]) +
            axis(spherePos[1], boxMinPos[1], boxSize[1]) +
            axis(spherePos[2], boxMinPos[2], boxSize[2]) <=
        r * r
);

testBoxSphere.default((boxPos, boxSize, spherePos, r) => {
    let sum = 0;
    for (let i = boxPos.length; i-- > 0; ) {
        sum += axis(spherePos[i], boxPos[i], boxSize[i]);
    }
    return sum <= r * r;
});

/**
 * Like {@link testCenteredAABBSphere}, but for arbitrary dimensions w/
 * optimized execution for 2D & 3D cases.
 *
 * @param boxCenter
 * @param boxExtent
 * @param spherePos
 * @param r
 */
export const testCenteredBoxSphere: MultiVecOpImpl<
    Fn4<ReadonlyVec, ReadonlyVec, ReadonlyVec, number, boolean>
> = vop(0);

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
    (boxPos, { 0: w, 1: h }, circlePos, r) =>
        axis(circlePos[0], boxPos[0] - w, w * 2) +
            axis(circlePos[1], boxPos[1] - h, h * 2) <=
        r * r
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
    (boxPos, { 0: w, 1: h, 2: d }, spherePos, r) =>
        axis(spherePos[0], boxPos[0] - w, w * 2) +
            axis(spherePos[1], boxPos[1] - h, h * 2) +
            axis(spherePos[2], boxPos[2] - d, d * 2) <=
        r * r
);

testCenteredBoxSphere.default((boxPos, boxExtent, spherePos, r) => {
    let sum = 0;
    for (let i = boxPos.length; i-- > 0; ) {
        sum += axis(spherePos[i], boxPos[i] - boxExtent[i], boxExtent[i] * 2);
    }
    return sum <= r * r;
});

const axis: FnN3 = (a, b, c) =>
    (a < b ? a - b : a > b + c ? a - b - c : 0) ** 2;
