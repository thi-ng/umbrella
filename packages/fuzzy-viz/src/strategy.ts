import type { DefuzzStrategy } from "@thi.ng/fuzzy";
import { fit } from "@thi.ng/math";
import { barChartHStr } from "@thi.ng/text-canvas";

export interface VisualizeStrategyOpts {
    samples: number;
    height: number;
}

export const instrumentStrategy = (
    strategy: DefuzzStrategy,
    opts: Partial<VisualizeStrategyOpts> = {}
): DefuzzStrategy => (fn, domain) => {
    const { samples, height } = { samples: 100, height: 16, ...opts };
    const res = strategy(fn, domain);
    const [min, max] = domain;
    const delta = (max - min) / samples;
    const vals: number[] = [];
    for (let i = min; i <= max; i += delta) {
        vals.push(fn(i));
    }
    const chart = barChartHStr(height, vals, 0, 1).replace(/ /g, ".");
    const index = Math.round(fit(res, min, max, 0, vals.length));
    const legend = new Array(Math.max(index - 1, 0)).fill(" ").join("") + "^";
    console.log(chart);
    console.log(legend);
    return res;
};
