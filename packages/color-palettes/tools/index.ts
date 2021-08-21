import { dotsH, lch } from "@thi.ng/color";
import { compareByKey } from "@thi.ng/compare";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { padRight, repeat } from "@thi.ng/strings";
import {
    assocObj,
    groupByMap,
    map,
    mapIndexed,
    minMax,
    pairs,
    pluck,
    range2d,
    transduce,
    vals,
} from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { THEMES } from "../src";

const BASE_URL =
    "https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes";
// const BASE_URL = ".";

const R = 24;
const D = R * 2;
const GAP = 5;
const width = 6 * (D + 5);
const cellW = (width - 2 * GAP) / 3;
const yOff = D + GAP;

const DOTS = [
    [0.3, 0.25, 0.2],
    [0.6, 0.45, 0.3],
    [0.35, 0.7, 0.25],
    [0.7, 0.7, 0.2],
    [0.6, 0.5, 0.125],
];

const col = (theme: string[], i: number) => theme[i % theme.length];

const composition = (theme: string[], i: number) => [
    ["rect", { fill: theme[i] }, [0, 0], cellW, cellW],
    ...DOTS.map(([x, y, r], j) => [
        "circle",
        { fill: col(theme, i + j + 1) },
        [x * cellW, y * cellW],
        r * cellW,
    ]),
];

const makeTable = (rows: string[][]) => {
    const [w1, w2] = rows.reduce(
        (acc, [a, b]) => [
            Math.max(acc[0], a.length),
            Math.max(acc[1], b.length),
        ],
        [0, 0]
    );

    const p1 = padRight(w1);
    const p2 = padRight(w2);
    const table = rows.map(([a, b]) => `| ${p1(a)} | ${p2(b)} |`);
    table.splice(1, 0, `|${repeat("-", w1 + 2)}|${repeat("-", w2 + 2)}|`);
    return table.join("\n");
};

type ThemeStat = { id: string; sortKey: number; key: number; theme: string[] };

const themeStats = transduce(
    map(([id, theme]) => {
        const lchTheme = THEMES[<keyof typeof THEMES>id].map((x) => lch(x));
        const [minC, maxC] = transduce(pluck("c"), minMax(), lchTheme);
        // const meanC = transduce(pluck("c"), mean(), lchTheme);
        // const hue = transduce(pluck("h"), mean(), lchTheme);
        const median = <number>[...pluck("c", lchTheme)].sort()[3];
        const key = median < 0.22 ? 0 : median < 0.33 ? 1 : 2;
        return <any>[id, { id, key, sortKey: maxC, theme }];
    }),
    assocObj<ThemeStat>(),
    pairs(THEMES)
);

const grouped: Map<number, ThemeStat[]> = groupByMap(
    {
        key: ({ key }: ThemeStat) => key,
    },
    vals(themeStats)
);

const sections: string[] = [];

for (let gid of [...grouped.keys()].sort()) {
    sections.push(`## ${["Soft", "Medium", "Strong"][gid]}`);
    const rows = [["Preset", "Swatches", "Stats"]];
    const themes = grouped.get(gid)!.sort(compareByKey("sortKey"));
    for (let { id, theme, sortKey } of themes) {
        console.log(id);
        const doc = serialize(
            svg(
                { convert: true, width, height: yOff + cellW * 2 + GAP },
                dotsH(theme, R, GAP, { translate: [R, R] }),
                ...mapIndexed(
                    (i, [x, y]) => [
                        "g",
                        {
                            translate: [
                                (cellW + GAP) * x,
                                yOff + (cellW + GAP) * y,
                            ],
                        },
                        composition(theme, i),
                    ],
                    range2d(3, 2)
                )
            )
        );
        writeFileSync(`export/${id}.svg`, doc);

        rows.push([`\`${id}\``, `![](${BASE_URL}/${id}.svg)`]);
    }
    sections.push(makeTable(rows));
}

writeFileSync(`export/table.md`, sections.join("\n\n"));
