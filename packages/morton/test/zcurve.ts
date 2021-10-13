import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { ZCurve } from "../src/index.js"

group("ZCurve", {
    ctor: () => {
        assert.throws(() => new ZCurve(<any>1, 8));
        assert.throws(() => new ZCurve(2, <any>0));
        assert.throws(() => new ZCurve(2, <any>33));
    },

    "range 2d (1)": () => {
        const z = new ZCurve(2, 8);
        assert.deepStrictEqual(
            [...z.range([2, 2], [3, 6])],
            [12n, 13n, 14n, 15n, 36n, 37n, 38n, 39n, 44n, 45n]
        );
        assert.deepStrictEqual(
            [...z.range([2, 2], [3, 6])].map((i) => z.decode(i)),
            [
                [2, 2],
                [3, 2],
                [2, 3],
                [3, 3],
                [2, 4],
                [3, 4],
                [2, 5],
                [3, 5],
                [2, 6],
                [3, 6],
            ]
        );
    },

    "range 2d (2)": () => {
        const z = new ZCurve(2, 8);
        assert.deepStrictEqual(
            [...z.range([3, 2], [4, 6])],
            [13n, 15n, 24n, 26n, 37n, 39n, 45n, 48n, 50n, 56n]
        );
        assert.deepStrictEqual(
            [...z.range([3, 2], [4, 6])].map((i) => z.decode(i)),
            [
                [3, 2],
                [3, 3],
                [4, 2],
                [4, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [4, 4],
                [4, 5],
                [4, 6],
            ]
        );
    },

    "range 3d (2)": () => {
        const z = new ZCurve(3, 8);
        assert.deepStrictEqual(
            [...z.range([3, 2, 0], [4, 6, 1])],
            [
                25n,
                27n,
                29n,
                31n,
                80n,
                82n,
                84n,
                86n,
                137n,
                139n,
                141n,
                143n,
                153n,
                157n,
                192n,
                194n,
                196n,
                198n,
                208n,
                212n,
            ]
        );
        assert.deepStrictEqual(
            [...z.range([3, 2, 0], [4, 6, 1])].map((i) => z.decode(i)),
            [
                [3, 2, 0],
                [3, 3, 0],
                [3, 2, 1],
                [3, 3, 1],
                [4, 2, 0],
                [4, 3, 0],
                [4, 2, 1],
                [4, 3, 1],
                [3, 4, 0],
                [3, 5, 0],
                [3, 4, 1],
                [3, 5, 1],
                [3, 6, 0],
                [3, 6, 1],
                [4, 4, 0],
                [4, 5, 0],
                [4, 4, 1],
                [4, 5, 1],
                [4, 6, 0],
                [4, 6, 1],
            ]
        );
    },
});
