import { binarySearch } from "@thi.ng/arrays";
import { benchmark, benchResult } from "@thi.ng/bench";
import { SYSTEM } from "@thi.ng/random";
import { map, normRange } from "@thi.ng/transducers";

const generateValues = (num = 10) => [
	...map((i) => [i, SYSTEM.float()], normRange(num)),
];

const findScan = (vals: number[][]) => {
	const t = SYSTEM.float();
	for (let i = vals.length; --i >= 0; ) {
		if (t > vals[i][0]) return i;
	}
	return -1;
};

const findSearch = (vals: number[][]) =>
	binarySearch<number[], number>(vals, [SYSTEM.float()], (x) => x[0]);

let opts = { iter: 1000, warmup: 100 };

for (let n of [64, 128, 192, 256, 384, 512, 1024]) {
	const vals = generateValues(n);
	benchmark(() => benchResult(() => findScan(vals), 1e3), {
		...opts,
		title: `scan(${n})`,
	});
	benchmark(() => benchResult(() => findSearch(vals), 1e3), {
		...opts,
		title: `search(${n})`,
	});
}
