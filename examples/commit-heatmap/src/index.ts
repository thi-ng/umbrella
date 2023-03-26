import type { IObjectOf } from "@thi.ng/api";
import { COSINE_GRADIENTS, cosineGradient } from "@thi.ng/color";
import { threadLast } from "@thi.ng/compose";
import { DAY, quarters } from "@thi.ng/date";
import { serialize } from "@thi.ng/hiccup";
import { defs, group, line, rect, svg, text } from "@thi.ng/hiccup-svg";
import { fit } from "@thi.ng/math";
import { Z2 } from "@thi.ng/strings";
import {
	add,
	comp,
	conj,
	count,
	filter,
	groupByObj,
	keep,
	map,
	mapIndexed,
	mapcat,
	max,
	partitionWhen,
	pluck,
	push,
	pushSort,
	sortedKeys,
	transduce,
} from "@thi.ng/transducers";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";

interface Commit {
	date?: string;
	name?: string;
	msg?: string;
	files?: string[];
	epoch: number;
	numFiles: number;
	pkgs: string[];
}

const BASE_DIR = "..";

const SEP = "~~";

// invalid / misspelled package names to exclude
const IGNORE = new Set(["all", "main", "make-example", "snowpack"]);

const BUILD = new Set([
	"yarn.lock",
	".gitignore",
	"scripts/make-package",
	"scripts/make-example",
]);

const ALIASES: IObjectOf<string> = {
	"adapt-api": "adapt-dpi",
	colors: "color",
	"color-profiles": "color-palettes",
	cso: "csp",
	download: "dl-asset",
	"download-asset": "dl-asset",
	example: "examples",
	exmples: "examples",
	geom2: "geom",
	geom3: "geom",
	"geom-clip": "geom-clip-poly",
	"geom-clip-convex": "geom-clip-poly",
	"geom-clostest-point": "geom-closest-point",
	"geom-tesselate": "geom-tessellate",
	"grid-iterator": "grid-iterators",
	hdom2020: "rdom",
	"hdom-cnavas": "hdom-canvas",
	heap: "heaps",
	"hiccup-dom": "hdom",
	"hiccup-dom-components": "hdom-components",
	iterator: "iterators",
	mine: "mime",
	module: "wasm-api-dom",
	shadertoy: "webgl-shadertoy",
	tranducers: "transducers",
	transducer: "transducers",
	unionfind: "adjacency",
	vector: "vectors",
	vectors2: "vectors",
	vectors3: "vectors",
	"wasm-alloc": "wasm-api",
	"wasm-bridge": "wasm-api",
	"wasm-api-docs": "wasm-api-dom",
	"wasm-api-time": "wasm-api-schedule",
	"wasm-api-timer": "wasm-api-schedule",
	zip: "zipper",
};

// heatmap gradient
const GRAD = <any[]>cosineGradient(32, COSINE_GRADIENTS["blue-magenta-orange"]);

const MIN_DATE = Date.parse("2018-01-01T00:00:00+00:00");
const MAX_DATE = Date.now();

/**
 * Retrieves raw git log from given repo path.
 *
 * @param repoPath -
 */
const gitLog2 = (repoPath: string) =>
	execSync(
		`git log --pretty=format:"%ad${SEP}%s" --date=iso-strict --name-only`,
		{
			cwd: resolve(repoPath),
			maxBuffer: 16 * 1024 * 1024,
		}
	)
		.toString()
		.trim();

/**
 * Transducer pipeline to process a single raw commit into an object
 * containing parsed metadata.
 */
const parseCommit = ([head, ...files]: string[]) => {
	const [date, msg] = head.split(SEP);
	if (/^(merge|publish)/i.test(msg)) return;
	const ids = transduce(
		comp(
			map((x) =>
				/\.md$/.test(x)
					? "docs"
					: /(package|tsconfig)\.json$/.test(x)
					? "build"
					: x.startsWith("packages")
					? /^packages\/([a-z0-9-]+)/.exec(x)![1]
					: x.startsWith("examples")
					? "examples"
					: x.startsWith("assets")
					? "assets"
					: x.startsWith("tools")
					? "tools"
					: BUILD.has(x)
					? "build"
					: null
			),
			keep(),
			filter((x) => !IGNORE.has(x)),
			map((x) => ALIASES[x] || x)
		),
		push<string>(),
		files
	);
	return <Commit>{
		epoch: Date.parse(date),
		numFiles: ids.length,
		pkgs: [...conj(ids)],
		date,
		msg,
		files,
	};
};

const rawLog = gitLog2(BASE_DIR).split("\n");

const commits = transduce(
	comp(
		partitionWhen((x) => !x),
		map((x) => (x[0].length ? x : (x.shift(), x))),
		map(parseCommit),
		keep()
	),
	push<Commit>(),
	rawLog
);

const commitsByPackage = transduce(
	mapcat((x) => map((name) => ({ name, ...x }), x.pkgs)),
	groupByObj<Commit, Commit[]>({
		group: pushSort((a, b) => a.epoch - b.epoch),
		key: (x) => x.name!,
	}),
	commits
);

const releases = transduce(
	comp(
		partitionWhen((x) => !x),
		map((x) => (x[0].length ? x : (x.shift(), x))),
		filter((x) => /\~\~publish/i.test(x[0]))
	),
	count(),
	rawLog
);

const totalCommits = commits.length;

const maxFiles = transduce(pluck("numFiles"), max(), commits);

const totalChanges = transduce(pluck("numFiles"), add(), commits);

console.log(
	`total commits:        ${totalCommits}
total file changes:   ${totalChanges}
max files per commit: ${maxFiles}
total releases:         ${releases}`
);

const NUM_PKG = Object.keys(commitsByPackage).length;
const PKG_WIDTH = 110;
const WIDTH = ((MAX_DATE - MIN_DATE) / DAY) * 1.5 + PKG_WIDTH;
const HEIGHT = NUM_PKG * 10 + 20;

/**
 * Computes X coord for given epoch (based on above config).
 *
 * @param epoch -
 */
const mapEpoch = (epoch: number) =>
	fit(epoch, MIN_DATE, MAX_DATE, PKG_WIDTH, WIDTH - 1);

/**
 * Returns log-mapped color from `GRAD` based on given `x` and `max` value.
 *
 * @param x -
 * @param max -
 */
const mapColor = (x: number, max: number) =>
	GRAD[fit(Math.log(x), 0, Math.log(max), 0, GRAD.length - 1) | 0];

/**
 * Returns iterator of quarterly timeline axis labels.
 */
const timeLineLabels = () =>
	map((t) => {
		const x = mapEpoch(t);
		const d = new Date(t);
		return group(
			{},
			line([x, 0], [x, NUM_PKG * 10 + 20], {
				stroke: "#999",
				"stroke-dasharray": 1,
			}),
			text([x + 5, 8], `${d.getFullYear()}-${Z2(d.getMonth() + 1)}`)
		);
	}, quarters(MIN_DATE, MAX_DATE));

/**
 * Main visualization. Returns SVG group of commits for given package
 * name and index. See usage below.
 *
 * @param i -
 * @param pkg -
 */
const packageCommits = (i: number, pkg: string) =>
	group(
		{
			transform: `translate(0, ${(i + 2) * 10})`,
			"stroke-width": 2,
		},
		text([0, 8], pkg, { stroke: "none" }),
		map((commit) => {
			const x = mapEpoch(commit.epoch);
			return line([x, 0], [x, 8], {
				stroke: mapColor(commit.numFiles, maxFiles),
			});
		}, commitsByPackage[pkg])
	);

/**
 * Assemble & output full SVG document using hiccup-svg primitives.
 *
 * See: https://docs.thi.ng/umbrella/compose/modules.html#threadLast
 */
threadLast(
	commitsByPackage,
	sortedKeys,
	[mapIndexed, packageCommits],
	[
		svg,
		{
			width: WIDTH,
			height: HEIGHT,
			viewBox: `-10 -10 ${WIDTH + 20} ${HEIGHT + 20}`,
			"font-family": "Inconsolata",
			"font-size": 9,
			fill: "white",
		},
		defs([
			"style",
			{ type: "text/css" },
			"<![CDATA[ @import url('https://fonts.googleapis.com/css?family=Inconsolata&display=swap'); ]]>",
		]),
		// background
		rect([-10, -10], WIDTH + 20, HEIGHT + 20, { fill: "black" }),
		timeLineLabels(),
	],
	serialize,
	[writeFileSync, "heatmap.svg"]
);
