"use strict";

const Benchmark = require("benchmark");
const tx = require("@thi.ng/transducers");
const m = require("../index");

const pool = new m.MemPool(new ArrayBuffer(1024));
const Type = m.Type;

const vals = [...tx.map((i) => [...tx.range(1 << i)], tx.range(6))];

const malloc4 = () => {
    let a = pool.mallocAs(Type.F64, 4);
    a.set(vals[2]);
    pool.free(a);
};

const malloc6 = () => {
    let a = pool.mallocAs(Type.F64, 8); a.set(vals[3]);
    let b = pool.mallocAs(Type.F64, 16); b.set(vals[4]);
    let c = pool.mallocAs(Type.F64, 1); c.set(vals[0]);
    let d = pool.mallocAs(Type.F64, 32); d.set(vals[5]);
    let e = pool.mallocAs(Type.F64, 2); e.set(vals[1]);
    let f = pool.mallocAs(Type.F64, 4); f.set(vals[2]);
    pool.free(a);
    pool.free(b);
    pool.free(c);
    pool.free(d);
    pool.free(e);
    pool.free(f);
};

const malloc4vanilla = () => new Float64Array(vals[2]);

const malloc6vanilla = () => {
    let a = new Float64Array(vals[3]);
    let b = new Float64Array(vals[4]);
    let c = new Float64Array(vals[0]);
    let d = new Float64Array(vals[5]);
    let e = new Float64Array(vals[1]);
    let f = new Float64Array(vals[2]);
};

new Benchmark.Suite()
    .add({ name: "1x f64x4 malloc", fn: malloc4 })
    .add({ name: "1x f64x4 vanilla", fn: malloc4vanilla })
    .add({ name: "6x f64 malloc", fn: malloc6 })
    .add({ name: "6x f64 vanilla", fn: malloc6vanilla })
    .on("cycle", (event) =>
        console.log(
            event.target.toString(),
            `mean: ${(event.target.stats.mean * 1e3).toFixed(5)}ms`
        )
    )
    .on("complete", function () {
        console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .run({ "async": false });
