"use strict";

const Benchmark = require("benchmark");
const Type = require("@thi.ng/api").Type;
const bench = require("@thi.ng/bench").bench;
const tx = require("@thi.ng/transducers");
const m = require("../lib/index");

const pool = new m.MemPool({ buf: new ArrayBuffer(0x2000) });

const vals = [...tx.map((i) => [...tx.range(1 << i)], tx.range(6))];

const malloc_f64x4 = () => {
    let a = pool.mallocAs(Type.F64, 4);
    a.set(vals[2]);
    pool.freeAll();
};

const malloc6_f64 = () => {
    const a = pool.mallocAs(Type.F64, 8);
    a.set(vals[3]);
    const b = pool.mallocAs(Type.F64, 16);
    b.set(vals[4]);
    const c = pool.mallocAs(Type.F64, 1);
    c.set(vals[0]);
    const d = pool.mallocAs(Type.F64, 32);
    d.set(vals[5]);
    const e = pool.mallocAs(Type.F64, 2);
    e.set(vals[1]);
    const f = pool.mallocAs(Type.F64, 4);
    f.set(vals[2]);
    pool.freeAll();
};

const malloc_f32x1024 = () => {
    const a = pool.mallocAs(Type.F32, 1024);
    pool.freeAll();
};

const malloc_f64x4_vanilla = () => new Float64Array(vals[2]);

const malloc6_f64_vanilla = () => {
    let a = new Float64Array(vals[3]);
    let b = new Float64Array(vals[4]);
    let c = new Float64Array(vals[0]);
    let d = new Float64Array(vals[5]);
    let e = new Float64Array(vals[1]);
    let f = new Float64Array(vals[2]);
};

const malloc_f32x1024_vanilla = () => new Float32Array(1024);

new Benchmark.Suite()
    .add({ name: "malloc_f64x4", fn: malloc_f64x4 })
    .add({ name: "malloc_f64x4_vanilla", fn: malloc_f64x4_vanilla })
    .add({ name: "malloc6_f64", fn: malloc6_f64 })
    .add({ name: "malloc6_f64_vanilla", fn: malloc6_f64_vanilla })
    .add({ name: "malloc_f32x1024", fn: malloc_f32x1024 })
    .add({ name: "malloc_f32x1024_vanilla", fn: malloc_f32x1024_vanilla })
    .on("cycle", (event) =>
        console.log(
            event.target.toString(),
            `mean: ${(event.target.stats.mean * 1e3).toFixed(5)}ms`
        )
    )
    .on("complete", function() {
        console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .run({ async: false });

bench(malloc_f64x4);
bench(malloc_f64x4_vanilla);
bench(malloc6_f64);
bench(malloc6_f64_vanilla);
bench(malloc_f32x1024);
bench(malloc_f32x1024_vanilla);
