import { Vec, IVec } from "@thi.ng/vectors/api";
import { CollateOpts } from "../api";

export const remap = (buf: Vec, pts: IVec[], start: number, cstride: number, estride: number) => {
    for (let i = pts.length; --i >= 0;) {
        const p = pts[i];
        p.buf = buf;
        p.i = start + i * estride;
        p.s = cstride;
    }
    return buf;
};

export const collateWith = <T extends IVec>(
    fn: (buf: Vec, src: Iterable<Readonly<T>>, start, cstride, estride) => Vec,
    pts: T[],
    opts: Partial<CollateOpts>,
    stride: number) => {

    opts = {
        start: 0,
        cstride: 1,
        estride: stride,
        ...opts
    };
    const { start, cstride, estride } = opts;
    return remap(
        fn(
            opts.buf || new Array(start + pts.length * estride).fill(0),
            pts,
            start,
            cstride,
            estride
        ),
        pts, start, cstride, estride
    );
};
