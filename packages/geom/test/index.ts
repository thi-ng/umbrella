import * as assert from "assert";
import { equiv } from "@thi.ng/equiv";
import { polygon2m } from "../src/index";

describe("polygon2", () => {

    it("area", () => {
        const a = polygon2m([0, 0, 100, 0, 100, 100, 0, 100], 4);
        assert.equal(a.area(), 100 * 100);
        a.length = 3;
        assert.equal(a.area(), 100 * 100 / 2);
    });

    it("circumference", () => {
        const a = polygon2m([0, 0, 100, 0, 100, 100, 0, 100], 4);
        assert.equal(a.circumference(), 400);
        a.length = 3;
        assert.equal(a.circumference(), 200 + Math.sqrt(2) * 100);
    });

    it("hiccup", () => {
        const a = polygon2m([0, 0, 100, 0, 100, 100, 0, 100], 4, { fill: "red" });
        assert(
            equiv(
                a.toHiccup(),
                ["polygon", { fill: "red" }, [[0, 0], [100, 0], [100, 100], [0, 100]]]
            )
        );
    });
});
