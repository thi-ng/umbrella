const tx = require("@thi.ng/transducers");
const b = require("@thi.ng/bench");
const arrayZipper = require("@thi.ng/zipper").arrayZipper;
const isNumber = require("@thi.ng/checks").isNumber;

const src = [...tx.repeat([...tx.repeat([...tx.range(10)], 10)], 10)];

const walk = (loc) => {
    let sum = 0;
    for (;;) {
        if (!loc) return sum;
        const n = loc.node;
        if (isNumber(n)) sum += n;
        loc = loc.next;
    }
};

const mul10 = (x) => x * 10;

const edit = (loc) => {
    for (;;) {
        if (isNumber(loc.node)) loc = loc.update(mul10);
        const lnext = loc.next;
        if (!lnext) return loc.root;
        loc = lnext;
    }
};

const benchmark = (fn, iter = 1e4) => {
    for (let i = 0; i < 3; i++) {
        b.bench(fn, iter, "warmup... ");
    }
    const [_, t] = b.benchResult(fn, iter);
    console.log(`total: ${t}ms, mean: ${t / iter}ms, runs: ${iter}`);
};

console.log("walk:");
benchmark(() => walk(arrayZipper(src)));

console.log("\nedit:");
benchmark(() => edit(arrayZipper(src)));
