import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    cartesianToTree,
    mortonToTree,
    treeToCartesian,
    treeToMorton,
} from "../src/index.js"

group(
    "morton",
    {
        "tree <> cartesian3 fuzz": () => {
            const M = 1 << 11;
            const $ = () => (1 + Math.random() * M) | 0;
            for (let i = 0; i < 1e5; i++) {
                const p = [$(), $(), $()];
                const tree = cartesianToTree(p);
                const morton = treeToMorton(tree, 3);
                assert.deepStrictEqual(mortonToTree(morton, 3), tree, "m2t");
                assert.deepStrictEqual(treeToCartesian(tree, 3), p, "t2c");
            }
        },
    },
    {
        timeOut: 10000,
    }
);
