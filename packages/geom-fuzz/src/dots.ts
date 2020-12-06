import { mergeDeepObj } from "@thi.ng/associative";
import { bounds, pointInside, points, unmapPoint } from "@thi.ng/geom";
import { range2d } from "@thi.ng/transducers";
import { div2, jitter, Vec } from "@thi.ng/vectors";
import type { DotFillOpts, FillFn } from "./api";

export const defDots = (opts: Partial<DotFillOpts> = {}): FillFn => {
    opts = mergeDeepObj(
        {
            space: 5,
            jitter: 0.5,
            attribs: {
                shape: "circle",
                stroke: "black",
                fill: "none",
            },
        },
        opts
    );
    return (shape) => {
        const box = bounds(shape)!;
        const [w, h] = box.size;
        const cols = ~~(w / opts.space!);
        const rows = ~~(h / opts.space!);
        const maxg = [cols - 1, rows - 1];
        const acc: Vec[] = [];
        for (let p of range2d(cols, rows)) {
            if (p[1] & 1) p[0] += 0.5;
            unmapPoint(box, div2(null, p, maxg), p);
            jitter(p, p, opts.jitter);
            if (pointInside(shape, p)) {
                acc.push(p);
            }
        }
        return points(acc, opts.attribs);
    };
};
