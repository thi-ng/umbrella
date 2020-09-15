import type { FnU4 } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const testRectRect: FnU4<ReadonlyVec, boolean> = (
    [ax, ay],
    [aw, ah],
    [bx, by],
    [bw, bh]
) => !(ax > bx + bw || bx > ax + aw || ay > by + bh || by > ay + ah);

export const testAabbAabb: FnU4<ReadonlyVec, boolean> = (
    [ax, ay, az],
    [aw, ah, ad],
    [bx, by, bz],
    [bw, bh, bd]
) =>
    !(
        ax > bx + bw ||
        bx > ax + aw ||
        ay > by + bh ||
        by > ay + ah ||
        az > bz + bd ||
        bz > az + ad
    );
