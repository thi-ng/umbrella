import { benchmark } from "@thi.ng/bench";
import { isNumber } from "@thi.ng/checks";
import { range, repeat } from "@thi.ng/transducers";
import { arrayZipper, Location } from "@thi.ng/zipper";

const src = [...repeat([...repeat([...range(10)], 10)], 10)];

const walk = (loc: Location<any>) => {
	let sum = 0;
	for (;;) {
		if (!loc) return sum;
		const n = loc.node;
		if (isNumber(n)) sum += n;
		loc = loc.next!;
	}
};

const mul10 = (x: number) => x * 10;

const edit = (loc: Location<any>) => {
	for (;;) {
		if (isNumber(loc.node)) loc = loc.update(mul10);
		const lnext = loc.next;
		if (!lnext) return loc.root;
		loc = lnext;
	}
};

// const benchmark = (fn, iter = 1e4) => {
// 	for (let i = 0; i < 3; i++) {
// 		bench(fn, iter, "warmup... ");
// 	}
// 	const [_, t] = benchResult(fn, iter);
// 	console.log(`total: ${t}ms, mean: ${t / iter}ms, runs: ${iter}`);
// };

benchmark(() => walk(arrayZipper(src)), {
	title: "walk",
	iter: 1e4,
	warmup: 1e4,
});

benchmark(() => edit(arrayZipper(src)), {
	title: "edit",
	iter: 1e4,
	warmup: 1e4,
});
