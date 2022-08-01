import { benchmark } from "@thi.ng/bench";
import { SYSTEM } from "@thi.ng/random";
import { repeatedly } from "@thi.ng/transducers";
import { DHeap, Heap, PairingHeap } from "../src";

const generateValues = (num = 1e5) => [...repeatedly(() => SYSTEM.int(), num)];

const buildHeap = (vals: number[]) => new Heap(vals);

const buildDHeap = (vals: number[], d = 4) => new DHeap(vals, { d });

const buildPHeap = (vals: number[]) => new PairingHeap(vals);

const drainHeap = (vals: number[]) => {
	const h = buildHeap(vals);
	while (h.length) {
		h.pop();
	}
};

const drainDHeap = (vals: number[], d = 4) => {
	const h = buildDHeap(vals, d);
	while (h.length) {
		h.pop();
	}
};

const drainPHeap = (vals: number[]) => {
	const h = buildPHeap(vals);
	while (h.length) {
		h.pop();
	}
};

const vals = generateValues(1e3);

let opts = { iter: 1000, warmup: 100 };

benchmark(() => buildHeap(vals), { ...opts, title: "build heap" });
benchmark(() => buildDHeap(vals), { ...opts, title: "build dheap(4)" });
benchmark(() => buildPHeap(vals), { ...opts, title: "build pheap" });

benchmark(() => drainHeap(vals), { ...opts, title: "drain heap" });
benchmark(() => drainDHeap(vals), { ...opts, title: "drain dheap(4)" });
benchmark(() => drainPHeap(vals), { ...opts, title: "drain pheap" });
