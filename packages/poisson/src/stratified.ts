import { SYSTEM } from "@thi.ng/random";
import { mapcat, rangeNd, repeatedly } from "@thi.ng/transducers";
import { add, random } from "@thi.ng/vectors";
import type { StratifiedGridOpts } from "./api";

/**
 * Yields iterator of nD point samples of for given stratified grid
 * config.
 *
 * @remarks
 * All samples will be in `[[0,0,...] ...[dimx,dimy,...])` interval
 *
 * @param opts
 */
export const stratifiedGrid = (opts: StratifiedGridOpts) => {
    const { rnd, samples } = { samples: 1, rnd: SYSTEM, ...opts };
    const tmp = new Array<number>(opts.dim.length);
    return mapcat(
        (p) => repeatedly(() => add([], p, random(tmp, 0, 1, rnd)), samples),
        rangeNd(opts.dim)
    );
};
