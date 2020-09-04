import { range } from "@thi.ng/transducers";
import * as assert from "assert";
import {
    cartesianAxisX,
    cartesianAxisY,
    linearAxis,
    linTickMarks,
    uniformDomain,
} from "../src";

describe("viz", () => {
    it("uniformDomain", () => {
        assert.deepEqual(uniformDomain([100, 200], range(5)), [
            [100, 0],
            [125, 1],
            [150, 2],
            [175, 3],
            [200, 4],
        ]);
    });

    it("svgCartesianAxisX", () => {
        const axis = cartesianAxisX(
            linearAxis({
                domain: [0, 4],
                range: [50, 250],
                pos: 100,
                major: { ticks: linTickMarks() },
                minor: { ticks: linTickMarks() },
            })
        );
        assert.deepEqual(axis, [
            "g",
            { stroke: "#000" },
            [
                "path",
                {},
                [
                    ["M", [50, 100]],
                    ["L", [250, 100]],
                ],
            ],
            [
                "path",
                {},
                [
                    ["M", [50, 100]],
                    ["v", 10],
                    ["M", [100, 100]],
                    ["v", 10],
                    ["M", [150, 100]],
                    ["v", 10],
                    ["M", [200, 100]],
                    ["v", 10],
                    ["M", [250, 100]],
                    ["v", 10],
                ],
            ],
            ["path", {}, []],
            [
                "g",
                {
                    stroke: "none",
                    fill: "#000",
                },
                ["text", {}, [50, 100], "0.00"],
                ["text", {}, [100, 100], "1.00"],
                ["text", {}, [150, 100], "2.00"],
                ["text", {}, [200, 100], "3.00"],
                ["text", {}, [250, 100], "4.00"],
            ],
        ]);
    });

    it("svgCartesianAxisY", () => {
        const axis = cartesianAxisY(
            linearAxis({
                domain: [0, 4],
                range: [100, 0],
                pos: 100,
                labelAttribs: { "text-anchor": "end" },
                labelOffset: [-15, 5],
                major: { ticks: linTickMarks(), size: -10 },
                minor: { ticks: linTickMarks() },
            })
        );
        assert.deepEqual(axis, [
            "g",
            { stroke: "#000" },
            [
                "path",
                {},
                [
                    ["M", [100, 100]],
                    ["L", [100, 0]],
                ],
            ],
            [
                "path",
                {},
                [
                    ["M", [100, 100]],
                    ["h", -10],
                    ["M", [100, 75]],
                    ["h", -10],
                    ["M", [100, 50]],
                    ["h", -10],
                    ["M", [100, 25]],
                    ["h", -10],
                    ["M", [100, 0]],
                    ["h", -10],
                ],
            ],
            ["path", {}, []],
            [
                "g",
                {
                    fill: "#000",
                    stroke: "none",
                    "text-anchor": "end",
                },
                ["text", {}, [85, 105], "0.00"],
                ["text", {}, [85, 80], "1.00"],
                ["text", {}, [85, 55], "2.00"],
                ["text", {}, [85, 30], "3.00"],
                ["text", {}, [85, 5], "4.00"],
            ],
        ]);
    });

    it("linechart", () => {
        // const vals = [
        //     [0, 2],
        //     [1, 0.5],
        //     [2, 1],
        //     [3, 0.75],
        //     [4, 0.25],
        // ];
    });
});
