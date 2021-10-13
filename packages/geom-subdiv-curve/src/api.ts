import type { FnU } from "@thi.ng/api";
import type { SubdivKernel } from "@thi.ng/geom-api";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { mixN } from "@thi.ng/vectors/mixn";
import { kernel3 } from "./kernels.js";

const MIDP = ([a, b]: ReadonlyVec[]) => [a, addmN([], a, b, 0.5)];
const THIRDS = ([a, b]: ReadonlyVec[]) => [
    a,
    mixN([], a, b, 1 / 3),
    mixN([], a, b, 2 / 3),
];

const wrap2 = (pts: ReadonlyVec[]) => wrapSides(pts, 0, 1);
const wrap3 = (pts: ReadonlyVec[]) => wrapSides(pts, 1, 1);

const subdivWith =
    (fn: FnU<ReadonlyVec[]>): SubdivKernel["fn"] =>
    (pts, i, n) =>
        i < n - 2 ? fn(pts) : [...fn(pts), pts[1]];

/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * open curves.
 */
export const SUBDIV_MID_OPEN: SubdivKernel = {
    fn: subdivWith(MIDP),
    size: 2,
};

/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * closed curves.
 */
export const SUBDIV_MID_CLOSED: SubdivKernel = {
    fn: MIDP,
    pre: wrap2,
    size: 2,
};

/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
export const SUBDIV_THIRDS_OPEN: SubdivKernel = {
    fn: subdivWith(THIRDS),
    size: 2,
};

/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
export const SUBDIV_THIRDS_CLOSED: SubdivKernel = {
    fn: THIRDS,
    pre: wrap2,
    size: 2,
};

const CHAIKIN_FIRST = kernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = kernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = kernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);

/**
 * Chaikin subdivision scheme for open curves.
 */
export const SUBDIV_CHAIKIN_OPEN: SubdivKernel = {
    fn: (pts, i, n) =>
        i == 0
            ? [pts[0], ...CHAIKIN_FIRST(pts)]
            : i === n - 3
            ? [...CHAIKIN_LAST(pts), pts[2]]
            : CHAIKIN_MAIN(pts),
    size: 3,
};

/**
 * Chaikin subdivision scheme for closed curves.
 */
export const SUBDIV_CHAIKIN_CLOSED: SubdivKernel = {
    fn: CHAIKIN_MAIN,
    pre: wrap3,
    size: 3,
};

const CUBIC_MAIN = kernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);

/**
 * Cubic bezier subdivision scheme for closed curves.
 */
export const SUBDIV_CUBIC_CLOSED: SubdivKernel = {
    fn: CUBIC_MAIN,
    pre: wrap3,
    size: 3,
};
