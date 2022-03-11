import { SYSTEM } from "@thi.ng/random/system";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { rangeNd } from "@thi.ng/transducers/range-nd";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import { add } from "@thi.ng/vectors/add";
import { random } from "@thi.ng/vectors/random";
import type { StratifiedGridOpts } from "./api.js";

/**
 * Yields iterator of nD point samples of for given stratified grid
 * config.
 *
 * @remarks
 * All samples will be in `[[0,0,...] ...[dimx,dimy,...])` interval
 *
 * @param opts - 
 */
export const stratifiedGrid = (opts: StratifiedGridOpts) => {
    const { rnd, samples } = { samples: 1, rnd: SYSTEM, ...opts };
    const tmp = new Array<number>(opts.dim.length);
    return mapcat(
        (p) => repeatedly(() => add([], p, random(tmp, 0, 1, rnd)), samples),
        rangeNd(opts.dim)
    );
};
