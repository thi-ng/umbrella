import { ReadonlyVec, Vec } from "../api";

export const dot2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] + a[ia + sa] * b[ib + sb];

export const dot3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] +
    a[ia + sa] * b[ib + sb] +
    a[ia + 2 * sa] * b[ib + 2 * sb];

export const dot4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] +
    a[ia + sa] * b[ib + sb] +
    a[ia + 2 * sa] * b[ib + 2 * sb] +
    a[ia + 3 * sa] * b[ib + 3 * sb];

export const set3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = b[ib],
    a[ia + sa] = b[ib + sb],
    a[ia + 2 * sa] = b[ib + 2 * sb],
    a
);

export const setS3 = (a: Vec, x: number, y: number, z: number, ia = 0, sa = 1) =>
    (a[ia] = x, a[ia + sa] = y, a[ia + 2 * sa] = z, a);

export const setS4 = (a: Vec, x: number, y: number, z: number, w: number, ia = 0, sa = 1) => (
    a[ia] = x,
    a[ia + sa] = y,
    a[ia + 2 * sa] = z,
    a[ia + 3 * sa] = w,
    a
);

export const cross2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib + sb] - a[ia + sa] * b[ib];
