import { Fn3 } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative";
import { line, polyline } from "@thi.ng/geom";
import { IHiccupShape } from "@thi.ng/geom-api";
import { resample } from "@thi.ng/geom-resample";
import { jitter, ReadonlyVec } from "@thi.ng/vectors";
import { FuzzyLineOpts, DEFAULT_LINE } from "./api";
import { jitterPoints } from "./points";

export const defLine = (
    opts: Partial<FuzzyLineOpts> = {}
): Fn3<ReadonlyVec, ReadonlyVec, boolean, IHiccupShape> => {
    opts = mergeDeepObj(DEFAULT_LINE, opts);
    return opts.resample! > 1
        ? (a, b, useAttr = true) =>
              polyline(
                  jitterPoints(
                      resample([a, b], { num: opts.resample, last: true }),
                      opts.jitter
                  ),
                  useAttr ? opts.attribs : undefined
              )
        : (a, b, useAttr = true) =>
              line(
                  jitter(null, a, opts.jitter),
                  jitter(null, b, opts.jitter),
                  useAttr ? opts.attribs : undefined
              );
};
