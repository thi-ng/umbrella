import { isNumber } from "@thi.ng/checks/is-number";
import { SYSTEM } from "@thi.ng/random/system";
import type { Vec } from "@thi.ng/vectors";
import { jitter as _jitter } from "@thi.ng/vectors/jitter";
import type { PoissonOpts } from "./api";

/**
 * Produces a number of Poisson-disk samples based on given
 * configuration.
 *
 * @param opts -
 */
export const samplePoisson = (_opts: PoissonOpts) => {
    const opts = {
        rnd: SYSTEM,
        iter: 1,
        jitter: 1,
        quality: 500,
        ..._opts,
    };
    const { points, index, rnd, jitter, quality, density: _d } = opts;
    const density = isNumber(_d) ? () => _d : _d;
    const iter = Math.max(opts.iter, 1);
    const samples: Vec[] = [];
    let failed = 0;
    let pos: Vec;
    let d: number;
    let i: number;

    outer: for (let num = opts.max; num > 0; ) {
        pos = points(rnd);
        d = density(pos);
        i = iter;
        while (i-- > 0) {
            if (!index.has(pos, d)) {
                index.add(pos, 0);
                samples.push(pos);
                failed = 0;
                num--;
                continue outer;
            }
            _jitter(null, pos, jitter, rnd);
        }
        if (++failed > quality) {
            break;
        }
    }

    return samples;
};
