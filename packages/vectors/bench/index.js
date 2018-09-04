const Benchmark = require("benchmark");
const vec = require("../index");

const setS2Lib = (buf, n) => {
    n *= 2;
    for (let i = 0; i < n; i += 2) {
        vec.setS2(buf, i, i + 1, i);
    }
    return buf;
};

const setS2Plain = (n) => {
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
        res[i] = [i, i + 1];
    }
    return res;
};

const op2Lib = (buf, n, op, v) =>
    vec.transformVectors1(op, setS2Lib(buf, n), v, n, 0, 0, 1, 1, 2);

const op2Plain = (n, op, v) => {
    const res = setS2Plain(n);
    for (let i = 0; i < n; i++) {
        op(res[i], v);
    }
    return res;
};

const add2 = (a, b) => (
    a[0] += b[0],
    a[1] += b[1],
    a
);

new Benchmark.Suite()
    .add({ name: "set2 1k (lib, array)", fn: () => setS2Lib(new Array(2 * 1024), 1024) })
    .add({ name: "set2 1k (vanilla)", fn: () => setS2Plain(1024) })
    .add({ name: "set2 4k (lib, array)", fn: () => setS2Lib(new Array(2 * 4 * 1024), 4 * 1024) })
    .add({ name: "set2 4k (vanilla)", fn: () => setS2Plain(4 * 1024) })
    .add({ name: "add2 1k (lib, array)", fn: () => op2Lib(new Array(2 * 1024), 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 1k (lib, f32)", fn: () => op2Lib(new Float32Array(2 * 1024), 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 1k (lib, f64)", fn: () => op2Lib(new Float64Array(2 * 1024), 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 1k (vanilla)", fn: () => op2Plain(1024, add2, [10, 20]) })
    .add({ name: "add2 4k (lib, array)", fn: () => op2Lib(new Array(2 * 4 * 1024), 4 * 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 4k (lib, f32)", fn: () => op2Lib(new Float32Array(2 * 4 * 1024), 4 * 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 4k (lib, f64)", fn: () => op2Lib(new Float64Array(2 * 4 * 1024), 4 * 1024, vec.add2, [10, 20]) })
    .add({ name: "add2 4k (vanilla)", fn: () => op2Plain(4 * 1024, add2, [10, 20]) })
    .on("cycle", (event) =>
        console.log(
            event.target.toString(),
            `mean: ${(event.target.stats.mean * 1e3).toFixed(5)}sec`
        )
    )
    .run({ "async": false });