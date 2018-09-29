import { equiv } from "@thi.ng/equiv";
import { Vec2 } from "@thi.ng/vectors/vec2";
import * as assert from "assert";
import { polygon2 } from "../src/index";

describe("polygon2", () => {

    it("area", () => {
        const a = polygon2(Vec2.mapBuffer([0, 0, 100, 0, 100, 100, 0, 100], 4));
        assert.equal(a.area(), 100 * 100);
        a.points.pop()
        assert.equal(a.area(), 100 * 100 / 2);
    });

    it("circumference", () => {
        const a = polygon2(Vec2.mapBuffer([0, 0, 100, 0, 100, 100, 0, 100], 4));
        assert.equal(a.arcLength(), 400);
        a.points.pop()
        assert.equal(a.arcLength(), 200 + Math.sqrt(2) * 100);
    });

    it("hiccup", () => {
        const a = polygon2(Vec2.mapBuffer([0, 0, 100, 0, 100, 100, 0, 100], 4), { fill: "red" });
        assert(
            equiv(
                a.toHiccup(),
                ["polygon", { fill: "red" }, [[0, 0], [100, 0], [100, 100], [0, 100]]]
            )
        );
    });
});
