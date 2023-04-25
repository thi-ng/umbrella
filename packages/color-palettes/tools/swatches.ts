import { dotsH, lch } from "@thi.ng/color";
import { compareByKey, compareNumDesc } from "@thi.ng/compare";
import { serialize } from "@thi.ng/hiccup";
import { setPrecision, svg } from "@thi.ng/hiccup-svg";
import { table } from "@thi.ng/markdown-table";
import { Z4 } from "@thi.ng/strings";
import {
	assocObj,
	comp,
	groupByMap,
	iterator,
	mapcat,
	mapIndexed,
	minMax,
	partition,
	pluck,
	range,
	range2d,
	transduce,
	vals,
} from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { THEMES } from "./themes.js";

setPrecision(2);

const RECENT_ID = 209;

const BASE_URL =
	process.argv[2] !== "--local"
		? "https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes"
		: ".";

const R = 24;
const D = R * 2;
const GAP = 5;
const width = 6 * (D + GAP);
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

type ThemeStat = { id: number; sortKey: number; key: number; theme: string[] };

const themeStats = transduce(
	mapIndexed((id, theme) => {
		const lchTheme = theme.map((x) => lch(x));
		const [_, maxC] = transduce(pluck("c"), minMax(), lchTheme);
		// const meanC = transduce(pluck("c"), mean(), lchTheme);
		// const hue = transduce(pluck("h"), mean(), lchTheme);
		const median = <number>[...pluck("c", lchTheme)].sort()[3];
		const key = median < 0.22 ? 0 : median < 0.33 ? 1 : 2;
		return <any>[id, { id, key, sortKey: maxC, theme }];
	}),
	assocObj<ThemeStat>(),
	THEMES
);

const grouped: Map<number, ThemeStat[]> = groupByMap(
	{
		key: ({ key }: ThemeStat) => key,
	},
	vals(themeStats)
);

const sections: string[] = [];

for (let gid of [...grouped.keys()].sort(compareNumDesc)) {
	sections.push(`### ${["Soft", "Medium", "Strong"][gid]}`);
	const rows: string[][] = [];
	const curr: string[][] = [];
	const themes = grouped
		.get(gid)!
		.sort(compareByKey("sortKey", compareNumDesc));
	const cw = cellW + GAP;
	for (let { id, theme } of themes) {
		const doc = serialize(
			svg(
				{ __convert: true, width, height: yOff + cellW * 2 + GAP },
				dotsH(theme, R, GAP, { translate: [R, R] }),
				...mapIndexed(
					(i, [x, y]) => [
						"g",
						{
							translate: [cw * x, yOff + cw * y],
						},
						composition(theme, i),
					],
					range2d(3, 2)
				)
			)
		);
		writeFileSync(`export/${Z4(id)}.svg`, doc);
		curr.push([String(id), `![](${BASE_URL}/${Z4(id)}.svg)`]);
		if (curr.length == 3) {
			rows.push(curr.map((x) => x[1]));
			rows.push(curr.map((x) => x[0]));
			curr.length = 0;
		}
	}
	sections.push(table(["Palettes", "", ""], rows));
}

writeFileSync(`export/table.md`, sections.join("\n\n"));

const recentPalettes = iterator(
	comp(
		partition(3, true),
		mapcat((ids) => [
			ids.map((id) => `![](${BASE_URL}/${Z4(id)}.svg)`),
			ids,
		])
	),
	range(THEMES.length - 1, RECENT_ID - 1)
);

writeFileSync(
	`export/table-recents.md`,
	table(["Palettes", "", ""], recentPalettes)
);
