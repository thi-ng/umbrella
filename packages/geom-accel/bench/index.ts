import { benchmark } from "@thi.ng/bench";
import { repeatedly } from "@thi.ng/transducers";
import { randMinMax3, ReadonlyVec } from "@thi.ng/vectors";
import { KdTreeSet, NdQuadtreeSet } from "../src";

const MIN = [0, 0, 0];
const MAX = [100, 100, 100];
const CENTER = [50, 50, 50];

const generatePoints = (num = 1e5) => [
    ...repeatedly(() => randMinMax3([], MIN, MAX), num)
];

const buildKd = (pts: ReadonlyVec[]) => {
    const tree = new KdTreeSet(3);
    tree.into(pts);
    return tree;
};

const buildNd = (pts: ReadonlyVec[]) => {
    const tree = NdQuadtreeSet.fromMinMax(MIN, MAX);
    tree.into(pts);
    return tree;
};

const selectKd = (
    tree: KdTreeSet<any>,
    p: ReadonlyVec,
    r: number,
    max = Infinity
) => tree.queryKeys(p, r, max);

const selectNd = (
    tree: NdQuadtreeSet<any>,
    p: ReadonlyVec,
    r: number,
    max = Infinity
) => tree.queryKeys(p, r, max);

const pts = generatePoints(1e5);

let opts = { iter: 10, warmup: 3 };

// benchmark(() => buildNd(pts), { ...opts, title: "build Nd" });
// benchmark(() => buildKd(pts), { ...opts, title: "build Kd" });

opts = { iter: 100, warmup: 10 };

let nd = buildNd(pts);
// prettier-ignore
benchmark(() => selectNd(nd, CENTER, 1, 1), { ...opts, title: "select Nd r=1, max=1", iter: 1e5 });
// prettier-ignore
benchmark(() => selectNd(nd, CENTER, 5), { ...opts, title: "select Nd r=5", iter: 1e4 });
benchmark(() => selectNd(nd, CENTER, 50), { ...opts, title: "select Nd r=50" });
benchmark(() => selectNd(nd, CENTER, 72), { ...opts, title: "select Nd r=72" });

let kd = buildKd(pts);
// prettier-ignore
benchmark(() => selectKd(kd, CENTER, 1, 1), { ...opts, title: "select kd r=1, max=1", iter: 1e5 });
// prettier-ignore
benchmark(() => selectKd(kd, CENTER, 5), { ...opts, title: "select kd r=5", iter: 1e4 });
benchmark(() => selectKd(kd, CENTER, 50), { ...opts, title: "select kd r=50" });
benchmark(() => selectKd(kd, CENTER, 72), { ...opts, title: "select kd r=72" });
