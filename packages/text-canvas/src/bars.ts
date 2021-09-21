import { fitClamped } from "@thi.ng/math/fit";
import { fract } from "@thi.ng/math/prec";
import { padLeft } from "@thi.ng/strings/pad-left";
import { padRight } from "@thi.ng/strings/pad-right";
import { repeat } from "@thi.ng/strings/repeat";
import { map } from "@thi.ng/transducers/map";
import { BARS_H, BARS_V } from "./api";

export const barChartHLines = (
    height: number,
    vals: Iterable<number>,
    min = 0,
    max = 1
) => {
    const bars = [...map((x) => barVertical(height, x, min, max, ""), vals)];
    const num = bars.length;
    const res: string[] = [];
    for (let i = 0; i < height; i++) {
        let line = "";
        for (let j = 0; j < num; j++) {
            line += bars[j][i];
        }
        res.push(line);
    }
    return res;
};

export const barChartHStr = (
    height: number,
    vals: Iterable<number>,
    min?: number,
    max?: number
) => barChartHLines(height, vals, min, max).join("\n");

export const barChartVLines = (
    width: number,
    vals: Iterable<number>,
    min = 0,
    max = 1
) => [...map((x) => barHorizontal(width, x, min, max), vals)];

export const barChartVStr = (
    width: number,
    vals: Iterable<number>,
    min?: number,
    max?: number
) => barChartVLines(width, vals, min, max).join("\n");

export const barHorizontal = (width: number, x: number, min = 0, max = 1) =>
    bar(BARS_H, width, false, x, min, max, "");

export const barVertical = (
    height: number,
    x: number,
    min = 0,
    max = 1,
    delim = "\n"
) => bar(BARS_V, height, true, x, min, max, delim);

const bar = (
    chars: string,
    size: number,
    left: boolean,
    x: number,
    min: number,
    max: number,
    delim: string
) => {
    x = fitClamped(x, min, max, 0, size);
    const f = (fract(x) * 9) | 0;
    const full = repeat(chars[8] + delim, x | 0);
    const partial = f > 0 ? chars[f] + delim : "";
    size += size * delim.length;
    return left
        ? padLeft(size, " ")(partial + full)
        : padRight(size, " ")(full + partial);
};
