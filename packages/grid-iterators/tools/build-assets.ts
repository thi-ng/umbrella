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
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";

try {
	mkdirSync("export");
} catch (e) {}

const iterators: [GridIterator2D, any?][] = [
	[columns2d],
	[rows2d],
	[diagonal2d],
	[<any>diagonalSlopeX, { step: 4 }],
	[<any>diagonalSlopeY, { step: 4 }],
	[hilbert2d],
	[interleaveColumns2d, { step: 4 }],
	[interleaveRows2d, { step: 4 }],
	[random2d],
	[spiral2d],
	[zcurve2d],
	[zigzagColumns2d],
	[zigzagDiagonal2d],
	[zigzagRows2d],
];

iterators.forEach(([fn, opts]) => {
	console.log(`generating ${fn.name}...`);
	const pts = [...fn({ cols: 16, ...opts })];
	const base = `export/${fn.name.toLowerCase()}`;
	for (let i = 1; i <= 128; i++) {
		writeFileSync(
			`${base}-${Z3(i)}.svg`,
			asSvg(
				svgDoc(
					{
						width: 600,
						height: 600,
						viewBox: "-1 -1 18 18",
						stroke: "none",
					},
					group(
						{},
						pts.slice(0, i * 2 - 1).map((p, j) =>
							rect(p, 1, {
								fill: lch(0.8, 0.6, j / 256, 0.5),
							})
						)
					),
					polyline(
						pts.slice(0, i * 2).map(([x, y]) => [x + 0.5, y + 0.5]),
						{ stroke: "black", "stroke-width": 0.1 }
					),
					rect(pts[i * 2 - 1], 1, {
						fill: "black",
					})
				)
			)
		);
	}
	console.log(`\tconverting to PNG...`);
	execSync(`../../scripts/svg2png ${base}*.svg`);
	console.log(`\tremoving SVG files...`);
	execSync(`rm ${base}*.svg`);
	console.log(`\tbuilding GIFs...`);
	execSync(`gm convert -delay 6 ${base}*.png ${base}.gif`);
	execSync(
		`gm convert -delay 6 -resize 200x200 ${base}*.png ${base}-small.gif`
	);
	console.log(`\tbuilding MP4...`);
	execSync(
		`ffmpeg -r 30 -i ${base}-%03d.png -c:v libx264 -pix_fmt yuv420p -y ${base}.mp4`
	);
});
