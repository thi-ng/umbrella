import type { StridedVec, Vec } from "@thi.ng/vectors";

export interface CollateOpts {
    buf: Vec;
    start: number;
    cstride: number;
    estride: number;
}

export const remap = (
    buf: Vec,
    pts: StridedVec[],
    start: number,
    cstride: number,
    estride: number
) => {
    for (let i = pts.length; --i >= 0; ) {
        const p = pts[i];
        p.buf = buf;
        p.offset = start + i * estride;
        p.stride = cstride;
    }
    return buf;
};

export const collateWith = (
    fn: (
        buf: Vec,
        src: Iterable<Readonly<StridedVec>>,
        start: number,
        cstride: number,
        estride: number
    ) => Vec,
    pts: StridedVec[],
    opts: Partial<CollateOpts>,
    stride: number
) => {
    opts = {
        start: 0,
        cstride: 1,
        estride: stride,
        ...opts,
    };
    const { start, cstride, estride } = opts;
    return remap(
        fn(
            opts.buf || new Array(start! + pts.length * estride!).fill(0),
            pts,
            start!,
            cstride!,
            estride!
        ),
        pts,
        start!,
        cstride!,
        estride!
    );
};
