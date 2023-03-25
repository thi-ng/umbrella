import { lch } from "@thi.ng/color";
import { asSvg, group, polyline, rect, svgDoc } from "@thi.ng/geom";
import {
	columns2d,
	diagonal2d,
	diagonalSlopeX,
	diagonalSlopeY,
	GridIterator2D,
	hilbert2d,
	interleaveColumns2d,
	interleaveRows2d,
	random2d,
	rows2d,
	spiral2d,
	zcurve2d,
	zigzagColumns2d,
	zigzagDiagonal2d,
	zigzagRows2d,
} from "@thi.ng/grid-iterators";
import { Z3 } from "@thi.ng/strings";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";

try {
	mkdirSync("export");
} catch (e) {}

const iterators: [GridIterator2D, any?][] = [
	[columns2d],
	[rows2d],
	[diagonal2d],
	[spiral2d],
	///
	[<any>diagonalSlopeX, { step: 4 }],
	[<any>diagonalSlopeY, { step: 4 }],
	[interleaveColumns2d, { step: 4 }],
	[interleaveRows2d, { step: 4 }],
	///
	[random2d],
	[hilbert2d],
	[zcurve2d],
	[zigzagDiagonal2d],
	////
	[zigzagColumns2d],
	[zigzagRows2d],
];

const all = iterators.map(([fn, opts]) => {
	const pts = [...fn({ cols: 16, ...opts })];
	const name = fn.name.toLowerCase();
	return { name, pts };
});

const frame = (
	{ pts }: { name: string; pts: ReadonlyVec[] },
	frameID: number,
	translate: ReadonlyVec
) =>
	group({ translate }, [
		group(
			{},
			pts.slice(0, frameID * 2 - 1).map((p, j) =>
				rect(p, 1, {
					fill: lch(0.8, 0.6, j / 256, 0.5),
				})
			)
		),
		polyline(
			pts.slice(0, frameID * 2).map(([x, y]) => [x + 0.5, y + 0.5]),
			{ stroke: "black", "stroke-width": 0.1 }
		),
		rect(pts[frameID * 2 - 1], 1, {
			fill: "black",
		}),
	]);

for (let i = 1; i <= 128; i++) {
	writeFileSync(
		`export/all-${Z3(i)}.svg`,
		asSvg(
			svgDoc(
				{
					width: 600,
					height: 600,
					viewBox: "-1 -1 69 69",
					stroke: "none",
				},
				...all.map((x, j) => frame(x, i, [(j % 4) * 17, (j >> 2) * 17]))
			)
		)
	);
}

console.log(`\tconverting to PNG...`);
execSync(`../../scripts/svg2png export/all-*.svg`);
console.log(`\tremoving SVG files...`);
execSync(`rm export/all-*.svg`);
console.log(`\tbuilding GIFs...`);
execSync(`gm convert -delay 6 export/all-*.png export/all.gif`);
execSync(
	`gm convert -delay 6 -resize 600x600 export/all-*.png export/all-600.gif`
);
console.log(`\tbuilding MP4...`);
execSync(
	`ffmpeg -r 30 -i export/all-%03d.png -c:v libx264 -pix_fmt yuv420p -y export/all.mp4`
);
