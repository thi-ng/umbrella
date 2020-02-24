import type { ReadonlyVec } from "@thi.ng/vectors";

export const testRectRect = (
    [ax, ay]: ReadonlyVec,
    [aw, ah]: ReadonlyVec,
    [bx, by]: ReadonlyVec,
    [bw, bh]: ReadonlyVec
) => !(ax > bx + bw || bx > ax + aw || ay > by + bh || by > ay + ah);

export const testAabbAabb = (
    [ax, ay, az]: ReadonlyVec,
    [aw, ah, ad]: ReadonlyVec,
    [bx, by, bz]: ReadonlyVec,
    [bw, bh, bd]: ReadonlyVec
) =>
    !(
        ax > bx + bw ||
        bx > ax + aw ||
        ay > by + bh ||
        by > ay + ah ||
        az > bz + bd ||
        bz > az + ad
    );
